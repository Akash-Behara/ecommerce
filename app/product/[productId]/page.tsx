import Container from '@/components/Container'
import ListRating from '@/components/products/ListRating'
import ProductDetails from '@/components/products/ProductDetails'
import { products } from '@/utils/products'
import React from 'react'

interface IParams {
    productId?: string
}

const ProductDetail = ({ params }: { params: IParams }) => {

  const product = products.find((item) => item.id === params.productId)
  
  return (
    <div className='p-8'>
      <Container>
        <ProductDetails product={product}/>
        <div className='flex flex-col mt-20 gap-4'>
          <div>Add Rating</div>
          <div>
            <ListRating product={product}/>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default ProductDetail