import React from 'react'
import AddProductForm from './AddProductForm'
import Container from '@/components/Container'
import FormWrap from '@/components/FormWrap'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'

const AddProductsPage = async () => {
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role!== 'ADMIN') {
    return <NullData title='You are not authorized to view this page.' />
  }

  return (
    <div className='p-8'>
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  )
}

export default AddProductsPage