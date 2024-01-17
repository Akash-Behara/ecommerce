import React from 'react'
import ManageProductsClient from './ManageProductsClient'
import Container from '@/components/Container'
import getProducts from '@/actions/getProducts'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'

const ManageProductsPage = async () => {
  const products = await getProducts({ category: null })
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role!== 'ADMIN') {
    return <NullData title='You are not authorized to view this page.' />
  }

  return (
    <div className='pt-8'>
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  )
}

export default ManageProductsPage