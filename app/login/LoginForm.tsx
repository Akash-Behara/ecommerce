'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import Link from 'next/link'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import { AiOutlineGoogle } from 'react-icons/ai'

const LoginForm = () => {
    const [isloading, setIsloading] = useState(false)

    const { handleSubmit, register, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)
        console.log('data', data)
    }
        
    return (
        <>
            <Heading title='Sign In to E~SHOP'/> 
            <Button onClick={() => {}} outline label='Sign In with Google' icon={AiOutlineGoogle}/>
            <hr className='bg-slate-300 w-full h-px'/>
            <Input id='email' label='Email' type='email' disabled={isloading} register={register} errors={errors} required/>
            <Input id='password' label='Password' type='password' disabled={isloading} register={register} errors={errors} required/>
            <Button label= {isloading ? "Loading..." : "Log In"} onClick={handleSubmit(onSubmit)}/>
            <p className='text-sm text-slate-500'>Do not have an Account? <Link href="/register" className='underline'>Register</Link></p>
        </>
    )
}

export default LoginForm