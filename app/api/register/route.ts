import bcrypt from 'bcrypt'
import prisma from '@/libs/prismaDB'
import { NextResponse } from 'next/server'

export async function POST(req: Request){
    const body = await req.json();

    const {name, email, password} = body.data;

    if(!name || !email || !password) {
        return NextResponse.error()
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
        data: {
            name, email, hashPassword
        }
    })

    return NextResponse.json(user)
}