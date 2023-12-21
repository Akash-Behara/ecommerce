import React from 'react'
import Link from 'next/link'

import { Redressed } from 'next/font/google'
import CartCount from './CartCount'

const redressed = Redressed({ subsets: ['latin'], weight: ['400'] })

const NavBar = () => {
  return (
    <nav className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm h-14'>
        <div className='px-4 border-b-[1px] h-full flex items-center w-full'>
                <div className='flex items-center justify-between gap-3 md:gap-0 h-full w-full'>
                    <Link href="/" className={`${redressed.className} font-bold text-2xl`}>E-SHOP</Link>
                    <div className='hidden md:block'>Search</div>
                    <div className='flex items-center gap-5 md:gap-12'>
                        <div><CartCount /></div>
                        <div>User Menu</div>
                    </div>
                </div>
        </div>
    </nav>
  )
}

export default NavBar