'use client'

import { Product } from '@prisma/client'
import React, { useCallback } from 'react'
import { DataGrid, GridColDef} from '@mui/x-data-grid'
import { formatPrice } from '@/utils/formatPrice'
import Heading from '@/components/Heading'
import Status from '@/components/Status'
import { MdCached, MdClose, MdDelete, MdDone, MdRemove } from 'react-icons/md'
import ActionBtn from '@/components/ActionBtn'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { deleteObject, getStorage, ref } from 'firebase/storage'
import firebaseApp from '@/libs/firebase'

interface ManageProductsClientProps {
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {
    const router = useRouter()
    const storage = getStorage(firebaseApp)
    let rows: any = []

    if(products){
        rows = products.map((product: Product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                description: product.description,
                images: product.images,
                brand: product.brand,
                inStock: product.inStock,
                category: product.category,
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'name', headerName: 'Name', width: 140},
        {field: 'description', headerName: 'Description', width: 220},
        {field: 'brand', headerName: 'Brand', width: 100},
        {field: 'category', headerName: 'Category', width: 100},
        {field: 'price', headerName: 'Price', width: 100, renderCell: (params) => {return <div className='font-bold text-slate-800'>{params.row.price}</div>}},
        {field: 'inStock', headerName: 'In Stock', width: 120, renderCell: (params) => {return <div className=''>{params.row.inStock ? <Status text='In Stock' icon={MdDone} bg='bg-teal-200' color='text-teal-700'/> : <Status text='Out of Stock' icon={MdClose} bg='bg-rose-200' color='text-rose-500'/>}</div>}},
        {field: 'action', headerName: 'Actions', width: 160, renderCell: (params) => {
            return <div className='flex justify-between w-full'>
                <ActionBtn icon={MdCached} onClick={() => {handleToggleStock(params.row.id, params.row.inStock)}}/>
                <ActionBtn icon={MdDelete} onClick={() => {handleDeleteProduct(params, params.row.id, params.row.images)}}/>
                <ActionBtn icon={MdRemove} onClick={() => {router.push(`/product/${params.row.id}`)}}/>
            </div>
        }},
    ]

    const handleToggleStock = useCallback((id: string, inStock: boolean) => {
        fetch('/api/product', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id,
                inStock: !inStock,
            })
        }).then((res) => {
            toast.success('Stock updated successfully')
            router.refresh()
        }).catch((err) => toast.error('Something went wrong'))
    }, [])

    const handleDeleteProduct = useCallback(async (params: any, id: string, images: any[]) => {
        toast('Deleting Product, Please wait...')

        const handleDeleteImages = async () => {
            try {
                for(const item of images){
                    if(item.image){
                        const imgRef = ref(storage, item.image)
                        await deleteObject(imgRef)
                    }
                }
            } catch (error) {
                console.log("err deleting images", error)
            }
        }

        await handleDeleteImages()

        fetch(`/api/product/${id}`, {
            method: 'DELETE',
        }).then((res) => {
            toast.success('Product deleted successfully')
            router.refresh()
        }).catch((err) => toast.error('Something went wrong'))

    }, [])

  return (
    <div className='mx-w-[1150px] m-auto text-xl'>
        <div className='mb-4 mt-8'>
            <Heading title='Manage Products' center/>
        </div>
        <div style={{height: 500, width: '100%'}}>
            <DataGrid
                rows={rows}
                columns={columns}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                pageSizeOptions={[5, 10]}
                checkboxSelection
                disableRowSelectionOnClick
            />
        </div>
    </div>
  )
}

export default ManageProductsClient