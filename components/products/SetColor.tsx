'use client'
import React from 'react'
import { CartProduct, SelectedImgType } from './ProductDetails'

interface SetColorProps {
    images: SelectedImgType[],
    cartProduct: CartProduct,
    handleColorSelect: (value: SelectedImgType) => void
}

const SetColor: React.FC<SetColorProps> = ({ images, cartProduct, handleColorSelect }) => {
  return (
    <div>
        <div className='flex items-center gap-4'>
            <span className='font-semibold'>COLOR:</span>
            <div className='flex gap-1'>{images.map((img) => {
                return (
                    <div onClick={() => handleColorSelect(img)} className={`h-7 w-7 rounded-full border-teal-300 flex items-center justify-center ${cartProduct.selectedImg.color === img.color ? 'border-[1.5px]' : 'border-none'}`} key={img.image}>
                        <div style={{background: img.colorCode}} className='h-5 w-5 rounded-full border-[1.2px] border-slate-300 cursor-pointer'></div>
                    </div>
                )
            })}</div>
        </div>
    </div>
  )
}

export default SetColor