import Container from '@/components/Container'
import FormWrap from '@/components/FormWrap'
import React from 'react'
import RegisterForm from './RegisterForm'

const Register = () => {
  return (
    <Container>
        <FormWrap>
            <RegisterForm />
        </FormWrap>
    </Container>
  )
}

export default Register