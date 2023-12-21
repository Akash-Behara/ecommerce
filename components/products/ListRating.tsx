'use client'
import React from 'react'
import Heading from '../Heading'
import moment from 'moment'
import { Rating } from '@mui/material'
import Avatar from '../Avatar'

interface ListRatingProps {
    product: any
}

const ListRating:React.FC<ListRatingProps> = ({ product }) => {
  return (
    <div>
        <Heading title='Product Review'/>
        <div className='text-sm mt-2'>
            {product.reviews && product.reviews.map((review) => {
                return (
                    <div key={review.id} className='max-w-[300px]'>
                        <div className='flex gap-2 items-center'>
                            <div><Avatar src={review.user.image}/></div>
                            <div className='font-semibold'>{review.user.name}</div>
                            <div className='font-light'>{moment(review.createdDate).fromNow()}</div>
                        </div>
                        <div className='mt-2'>
                            <Rating value={review.rating} readOnly/>
                            <div>{review.comment}</div>
                        </div>
                        <hr className='my-4'/>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default ListRating