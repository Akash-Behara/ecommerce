import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import prisma from '@/libs/prismaDB'

export async function getSession(){
    const res = await getServerSession(authOptions)
    console.log('res', res)

    return res
}

export async function getCurrentUser(){
    try {
        const session = await getSession()

        if(session == null) { return null }

        if(!session?.user?.email) { return null }

        const currentUser = await prisma.user.findUnique({where: {email: session.user.email}})

        if(!currentUser) { return null }

        return {
            ...currentUser,
            createdAt: currentUser.createdAt?.toISOString(),
            updatedAt: currentUser.updatedAt?.toISOString(),
            emailVerified: currentUser.emailVerified?.toISOString() || null
        }

    } catch (error) {
        console.log('Error getting user', error)
    }
}