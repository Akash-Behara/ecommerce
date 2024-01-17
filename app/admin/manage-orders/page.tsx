import React from 'react'
import Container from '@/components/Container'
import getOrders from '@/actions/getOrders'
import { getCurrentUser } from '@/actions/getCurrentUser'
import NullData from '@/components/NullData'

const MagaeOrdersPage = async () => {

  const products = await getOrders()
  const currentUser = await getCurrentUser()

  if(!currentUser || currentUser.role!== 'ADMIN') {
    return <NullData title='You are not authorized to view this page.' />
  }

  return (
    <div className='pt-8'>
      <Container>
        <div>orders</div>
      </Container>
    </div>
  )
}

export default MagaeOrdersPage