'use client'

import { Product } from '@prisma/client'
import React from 'react'
import { DataGrid, GridColDef} from '@mui/x-data-grid'
import { formatPrice } from '@/utils/formatPrice'

interface ManageProductsClientProps {
    products: Product[]
}

const ManageProductsClient: React.FC<ManageProductsClientProps> = ({ products }) => {

    let rows: any = []

    if(products){
        rows = products.map((product: Product) => {
            return {
                id: product.id,
                name: product.name,
                price: formatPrice(product.price),
                description: product.description,
                image: product.images,
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
        {field: 'inStock', headerName: 'In Stock', width: 100, renderCell: (params) => {return <div className=''>{params.row.inStock ? 'In Stock' : 'Out of Stock'}</div>}},
        {field: 'action', headerName: 'Actions', width: 100, renderCell: (params) => {return <div className='font-bold text-slate-800'>actions</div>}},
    ]

  return (
    <div>
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
        />
    </div>
  )
}

export default ManageProductsClient