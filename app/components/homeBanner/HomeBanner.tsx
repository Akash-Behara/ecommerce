import Image from 'next/image'
import React from 'react'

const HomeBanner = () => {
  return (
    <div className='relative bg-gradient-to-tr from-sky-500 to-sky-700 mg-8 rounded-md shadow-md'>
        <div className='mx-auto px-8 py-12 flex flex-col gap-2 md:flex-row items-center justify-evenly'>
            <div className='mb-8 md:mb-0 text-center'>
                <h1 className='text-4xl md:text-6xl font-bold text-white mb-4'>Summer Sale!</h1>
                <p className='text-lg md:text-xl text-white mb-2'>Enjoy discounts on selected items</p>
                <h3 className='text-2xl md:text-5xl text-yellow-500 font-bold'>GET 50% OFF</h3>
            </div>
            <div className='w-1/3 relative aspect-video'>
                <Image 
                    src='https://github.com/chaoocharles/e-shop-assets/blob/main/banner-image.png?raw=true'
                    alt='banner'
                    className='object-contain'
                    width={500}
                    height={200}
                />
            </div>
        </div>
    </div>
  )
}

export default HomeBanner