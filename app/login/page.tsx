import Container from '@/components/Container'
import FormWrap from '@/components/FormWrap'
import React from 'react'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <Container>
        <FormWrap>
            <LoginForm />
        </FormWrap>
    </Container>
  )
}

export default Login