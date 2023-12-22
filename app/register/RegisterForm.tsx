'use client'

import React, { useState } from 'react'
import { FieldValues, useForm, SubmitHandler } from 'react-hook-form'
import Input from '@/components/inputs/Input'
import Heading from '@/components/Heading'
import Button from '@/components/Button'
import Link from 'next/link'
import { AiOutlineGoogle } from 'react-icons/ai'
import { signIn } from 'next-auth/react'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const RegisterForm = () => {

    const router = useRouter()

    const [isloading, setIsloading] = useState(false)
    const { handleSubmit, register, formState: {errors} } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsloading(true)
        fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify({data})
        })
        .then((res) => {
            if(res.ok){
                toast.success('Account Created')
                signIn('credentials', {
                    email: data.email,
                    password: data.password,
                    redirect: false
                })
                .then((cb) => {
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
        })
        .catch((err) => toast.error(err))
        .finally(() => { setIsloading(false) })
    }
        
    return (
        <>
            <Heading title='Sign Up for E~SHOP'/>
            <Button onClick={() => {}} outline label='Sign up with Google' icon={AiOutlineGoogle}/>
            <hr className='bg-slate-300 w-full h-px'/>
            <Input id='name' label='Name' disabled={isloading} register={register} errors={errors} required/>
            <Input id='email' label='Email' type='email' disabled={isloading} register={register} errors={errors} required/>
            <Input id='password' label='Password' type='password' disabled={isloading} register={register} errors={errors} required/>
            <Button label= {isloading ? "Loading..." : "Sign Up"} onClick={handleSubmit(onSubmit)}/>
            <p className='text-sm text-slate-500'>Already have an Account? <Link href="/login" className='underline'>Log In</Link></p>
        </>
    )
}

export default RegisterForm