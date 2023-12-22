'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import Input from '@/components/inputs/Input'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { AiOutlineGoogle } from 'react-icons/ai'

const LoginForm = () => {
    const router = useRouter()

    const [isloading, setIsloading] = useState(false)

    const { handleSubmit, register, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)
        signIn('credentials', {
            ...data,
            redirect: false
        })
        .then((cb) => {
            setIsloading(false)
            if(cb?.ok){
                router.push('/cart')
                router.refresh()
                toast.success('Logged In')
            }
            if(cb?.error){
                toast.error(cb.error)
            }
        })
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