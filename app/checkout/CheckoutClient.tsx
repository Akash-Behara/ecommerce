'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { StripeElementsOptions, loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import CheckoutForm from './CheckoutForm'
import Button from '@/components/Button'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string)

const CheckoutClient = () => {
    const { cartProducts, paymentIntent, handleSetPaymentIntent } = useCart()
    const router = useRouter()

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(false)
    const [clientSecret, setClientSecret] = useState('')

    const [paymentSuccess, setPaymentSucess] = useState(false)

    useEffect(() => { 
        if(cartProducts){
            setIsLoading(true)
            setError(false)

            fetch('/api/create-payment-intent',{
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    items: cartProducts,
                    payment_intent_id: paymentIntent 
                })
            })
            .then((res) => {
                setIsLoading(false)
                if(res.status === 401){
                    return router.push('/login')
                }

                return res.json()
            })
            .then((data) => {
                setClientSecret(data.paymentIntent.client_secret)
                handleSetPaymentIntent(data.paymentIntent.id)
            })
            .catch((err) => {
                setIsLoading(false)
                setError(true)
                console.log('error', err)
                toast.error('Error creating payment')
            })
        }
    }, [cartProducts, paymentIntent])

    const options: StripeElementsOptions = {
        clientSecret,
        appearance: {
            theme: "stripe",
            labels: "floating"
        }
    }

    const handlePaymentSuccess = useCallback((val: boolean) => {
        setPaymentSucess(val)
    }, [])

  return (
    <div className='w-full'>
        {clientSecret && cartProducts &&(
            <Elements options={options} stripe={stripePromise}>
                <CheckoutForm
                    clientSecret={clientSecret}
                    handlePaymentSuccess={handlePaymentSuccess}
                />
            </Elements>
        )}
        {isLoading && <div className='text-center'>Loading Checkout...</div>}
        {error && <div className='text-center text-rose-500'>Something went wrong...</div>}
        {paymentSuccess && (
            <div className='flex items-center justify-center flex-col gap-4'>
                <div className=' text-center text-teal-500'>
                    Payment Success
                </div>
                <div className='max-w-[220px] w-full'>
                    <Button label='View Your Order' onClick={() => router.push('/orders')} />
                </div>
            </div>
        )}
    </div>
  )
}

export default CheckoutClient