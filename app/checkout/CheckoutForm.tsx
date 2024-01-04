'use client'

import React, { useEffect, useState } from 'react'
import { useCart } from '@/hooks/useCart'
import { AddressElement, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { formatPrice } from '@/utils/formatPrice'
import toast from 'react-hot-toast'
import Heading from '@/components/Heading'
import Button from '@/components/Button'

interface CheckoutFormProps {
    clientSecret: string
    handlePaymentSuccess: (value: boolean) => void
}

const CheckoutForm: React.FC<CheckoutFormProps> = ({clientSecret, handlePaymentSuccess}) => {
    const { cartTotalAmount, handleClearCart, handleSetPaymentIntent } = useCart()

    const stripe = useStripe();
    const elements = useElements();
    const [isLoading, setIsLoading] = useState(false)
    const formattedPrice = formatPrice(cartTotalAmount)

    useEffect(() => {
        if(!stripe) { return }
        if(!clientSecret) { return }
        handlePaymentSuccess(false)
    }, [stripe])
    
    const handlePaymentSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if(!stripe ||!elements) { return }
        setIsLoading(true)

        stripe.confirmPayment({
            elements, redirect: 'if_required'
        })
        .then((res) => {
            console.log('res', res)
            if(!res.error){
                toast('Payment success')
                handleClearCart()
                handlePaymentSuccess(true)
                handleSetPaymentIntent(null)
            }
            setIsLoading(false)
        })
    }



  return (
    <form onSubmit={handlePaymentSubmit} id='payment-form'>
        <div className='mb-6'>
            <Heading title='Enter your details to complete checkout'/>
        </div>
        <h2 className='font-semibold mt-4 mb-2'>Address Information</h2>
        <AddressElement options={{mode: 'shipping'}}/>
        <h2 className='font-semibold mt-4 mb-2'>Payment Information</h2>
        <PaymentElement id='payment-element' options={{layout: 'tabs'}}/>
        <div className='py-4 text-center text-slate-600 text-lg font-bolf'>
            Total: {formattedPrice}
        </div>
        <Button onClick={() => {}} label={isLoading ? "Processing..." : "Pay Now"} disabled={isLoading || !stripe}/>
    </form>
  )
}

export default CheckoutForm