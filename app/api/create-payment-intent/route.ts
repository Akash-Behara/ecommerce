import Stripe from 'stripe'
import prisma from '@/libs/prismaDB'
import { NextResponse } from 'next/server'
import { CartProduct } from '@/components/products/ProductDetails';
import { getCurrentUser } from '@/actions/getCurrentUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2023-10-16"
});

const calculateOrderAmount = (items: CartProduct[]) => {
    const totalPrice = items.reduce((acc, item) => {
        return acc + item.price * item.quantity;
    }, 0);

    return totalPrice;
}

export async function POST(req: Request) {
    const currentUser = await getCurrentUser();

    if(!currentUser){
        return NextResponse.json({error: 'Unauthorized'}, {status: 401});
    }

    const body = await req.json();

    const {items, payment_intent_id} = body;
    const total = calculateOrderAmount(items) * 100;
    const orderData = {
        user: {connect: {id: currentUser.id}},
        amount: total,
        currency: 'usd',
        status: 'pending',
        deliveryStatus: 'pending',
        paymentIntentId: payment_intent_id,
        products: items
    }

    if(payment_intent_id){

        const current_intent = await stripe.paymentIntents.retrieve(payment_intent_id);

        if(current_intent){
            const updated_intent = await stripe.paymentIntents.update(payment_intent_id, {
                amount: total,
            })
            
            const [ existing_order, update_order ] = await Promise.all([
                prisma.order.findFirst({
                    where: { paymentIntentId: payment_intent_id }
                }),
                prisma.order.update({
                    where: { paymentIntentId: payment_intent_id },
                    data: {
                        amount: total,
                        products: items
                    }
                })
            ])
    
            if(!existing_order){
                return NextResponse.json({ error: 'Order not found, Invalid Payment_intent' }, { status: 400 })
            }
    
            return NextResponse.json({ paymentIntent:  updated_intent})
        }

    } else {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: total,
            currency: 'usd',
            automatic_payment_methods: {enabled: true},
        });

        orderData.paymentIntentId = paymentIntent.id;

        await prisma.order.create({
            data: orderData
        })

        return NextResponse.json({ paymentIntent })
    }

}