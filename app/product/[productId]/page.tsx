import Container from '@/components/Container'
import ProductDetails from '@/components/products/ProductDetails'
import { product } from '@/utils/product'
import React from 'react'

interface IParams {
    productId?: string
}

const ProductDetail = ({ params }: { params: IParams }) => {
  
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product}/>
      </Container>
    </div>
  )
}

export default ProductDetail