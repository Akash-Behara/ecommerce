import React from 'react'
import Container from '../Container'
import Link from 'next/link'

import { Redressed } from 'next/font/google'

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] })

const NavBar = () => {
  return (
    <nav className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
        <div className='px-4 border-b-[1px]'>
            <Container>
                <div className='flex item-center justify-between gap-3 md:gap-0'>
                    <Link href="/" className={`${redressed.className} font-bold text-2xl`}>E-SHOP</Link>
                    <div className='hidden md:block'>Search</div>
                    <div className='flex items-center gap-5 md:gap-12'>
                        <div>Cart</div>
                        <div>User Menu</div>
                    </div>
                </div>
            </Container>
        </div>
    </nav>
  )
}

export default NavBar