'use client'

import { formatPrice } from '@/utils/formatPrice'
import { truncateText } from '@/utils/truncateText'
import { Rating } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

interface ProductCardProps {
    product: any
}

const ProductCard = ({ product }: ProductCardProps) => {

    const router = useRouter();

    const productRating = product.reviews.reduce((acc: number, item: any) => {
        return item.rating + acc
    }, 0) / product.reviews.length;

    return (
        <div onClick={() => router.push(`product/${product.id}`)} className='col-span-1 cursor-pointer border-[1px] border-slate-200 bg-slate-200 rounded-md p-2 shadow-md transition hover:scale-105 text-center text-sm'>
            <div className='flex flex-col items-center w-full gap-1'>
                <div className='aspect-square overflow-hidden relative w-full'>
                    <Image
                        src={product.images[0].image}
                        alt={product.name}
                        fill
                        className='w-full h-full object-contain mix-blend-multiply'
                    />
                </div>
                <div className='mt-4'>{truncateText(product.name)}</div>
                <div><Rating value={productRating} readOnly/></div>
                <div>{product.reviews.length} reviews</div>
                <div className='font-semibold'>{formatPrice(product.price)}</div>
            </div>
        </div>
    )
}

export default ProductCard