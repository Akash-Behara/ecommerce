import prisma from '@/libs/prismaDB'

export default async function getProviders(){
    try {
        const orders = await prisma.order.findMany({
            include: {
                user: true
            },
            orderBy: {
                createDate: 'desc'
            }
        })

        return orders
    } catch (error: any) {
        throw new Error(error)
    }
}