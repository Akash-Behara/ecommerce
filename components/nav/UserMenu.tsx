'use client'

import React, { useCallback, useEffect, useState } from 'react'
import Avatar from '../Avatar'
import Link from 'next/link'
import MenuItem from './MenuItem'
import { signOut } from 'next-auth/react'
import BackDrop from './BackDrop'
import { SafeUser } from '@/types'

interface UserMenuProps{
    currentUser: any
}

const UserMenu: React.FC<UserMenuProps> = ({ currentUser }) => {

    const [isOpen, setIsOpen] = useState(false)
    const [user, setUser] = useState(null)

    useEffect(() => {
        currentUser.then((res: any) => {setUser(res)})
    }, [currentUser])

    const toggleOpen = useCallback(() => {
        setIsOpen(prev => !prev)
    }, [])

  return (
    <>
        <div className='relative z-30'>
            <div onClick={toggleOpen} className='p-2 border-[1px] border-slate-400 flex items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700'>
                <Avatar />
            </div>
            {isOpen && (
                <div className='absolute rounded-md shadow-md min-w-[180px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer'>
                    {user
                        ?   <div>
                                <Link href="/orders">
                                    <MenuItem onClick={toggleOpen}>Your Orders</MenuItem>
                                </Link>
                                <Link href="/admin">
                                    <MenuItem onClick={toggleOpen}>Admin Dashboard</MenuItem>
                                </Link>
                                <hr className='px-2 max-w-[85%] translate-x-3'/>
                                <MenuItem onClick={() => { toggleOpen; signOut() }}>Log Out</MenuItem>
                            </div>
                        
                        :  <div>
                                <Link href="/login">
                                    <MenuItem onClick={toggleOpen}>Login</MenuItem>
                                </Link>
                                <Link href="/register">
                                    <MenuItem onClick={toggleOpen}>Register</MenuItem>
                                </Link>
                            </div>
                        
                    }
                </div>
            )}
        </div>
        {isOpen ? <BackDrop onClick={toggleOpen} /> : null}
    </>
  )
}

export default UserMenu