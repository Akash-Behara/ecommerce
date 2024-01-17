'use client'

import { Order, User } from '@prisma/client'
import React, { useCallback } from 'react'
import { DataGrid, GridColDef} from '@mui/x-data-grid'
import { formatPrice } from '@/utils/formatPrice'
import Heading from '@/components/Heading'
import Status from '@/components/Status'
import { MdAccessTimeFilled, MdDeliveryDining, MdDone, MdRemove, MdRemoveRedEye } from 'react-icons/md'
import ActionBtn from '@/components/ActionBtn'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import moment from 'moment'

interface ManageOrdersClientProps {
    orders: ExtendedOrder[]
}

type ExtendedOrder = Order & {
    user: User
}

const ManageOrdersClient: React.FC<ManageOrdersClientProps> = ({ orders }) => {
    const router = useRouter()
    let rows: any = []

    if(orders){
        rows = orders.map((order: ExtendedOrder) => {
            return {
                id: order.id,
                customer: order.user.name,
                amount: formatPrice(order.amount / 100),
                paymentStatus: order.status,
                date: moment(order.createDate).fromNow(),
                deliveryStatus: order.deliveryStatus,
            }
        })
    }

    const columns: GridColDef[] = [
        {field: 'id', headerName: 'ID', width: 220},
        {field: 'customer', headerName: 'Customer Name', width: 140},
        {field: 'amount', headerName: 'Amount', width: 100, renderCell: (params) => {return <div className='font-bold text-slate-800'>{params.row.amount}</div>}},
        {field: 'paymentStatus', headerName: 'Payment Status', width: 120, renderCell: (params) => {
            return <div>
                {params.row.paymentStatus === 'pending' ? <Status text='pending' icon={MdAccessTimeFilled} bg='bg-slate-200' color='text-slate-700'/> 
                    : params.row.paymentStatus === 'complete' ? <Status text='completed' icon={MdDone} bg='bg-green-200' color='text-green-700'/>
                    : <></>
                }
            </div>
        }},
        {field: 'deliveryStatus', headerName: 'Delivery Status', width: 120, renderCell: (params) => {
            return <div>
                {params.row.deliveryStatus === 'pending' ? <Status text='pending' icon={MdAccessTimeFilled} bg='bg-slate-200' color='text-slate-700'/> 
                    : params.row.deliveryStatus === 'dispatched' ? <Status text='dispatched' icon={MdDeliveryDining} bg='bg-purple-200' color='text-purple-700'/> 
                    : params.row.deliveryStatus === 'delivered' ? <Status text='delivered' icon={MdDone} bg='bg-green-200' color='text-green-700'/> : <></>
                }
            </div>
        }},
        {field: 'date', headerName: 'Date', width: 100, renderCell: (params) => {return <div className='font-bold text-slate-800'>{params.row.date}</div>}},
        {field: 'action', headerName: 'Actions', width: 160, renderCell: (params) => {
            return <div className='flex justify-between w-full'>
                <ActionBtn icon={MdDeliveryDining} onClick={() => {handleDispatch(params.row.id)}}/>
                <ActionBtn icon={MdDone} onClick={() => {handleDeliver(params.row.id)}}/>
                <ActionBtn icon={MdRemoveRedEye} onClick={() => {router.push(`/product/${params.row.id}`)}}/>
            </div>
        }},
    ]

    const handleDispatch = useCallback((id: string) => {
        fetch('/api/order', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id,
                deliveryStatus: 'dispatched',
            })
        }).then((res) => {
            toast.success('Order Dispatched')
            router.refresh()
        }).catch((err) => toast.error('Something went wrong'))
    }, [])

    const handleDeliver = useCallback(async (id: string) => {
        fetch('/api/order', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
            },
            body: JSON.stringify({
                id,
                deliveryStatus: 'delivered',
            })
        }).then((res) => {
            toast.success('Order Delivered')
            router.refresh()
        }).catch((err) => toast.error('Something went wrong'))
    }, [])

  return (
    <div className='mx-w-[1150px] m-auto text-xl'>
        <div className='mb-4 mt-8'>
            <Heading title='Manage Orders' center/>
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

export default ManageOrdersClient