'use client'
import React from 'react'
import { IconType } from 'react-icons'

interface ButtonProps {
    label: string,
    disabled?: boolean,
    outline?: boolean,
    small?: boolean,
    custom?: string,
    icon?: IconType,
    onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ label, disabled, onClick, outline, small, custom, icon: Icon }) => {
  return (
    <button className={`disabled:opacity-70 disabled:cursor-not-allowed rounded-md hover:opacity-80 transition w-full border-slate-700 flex items-center justify-center gap-2 ${outline ? 'bg-white text-slate-700': 'bg-slate-700 text-white'} ${small ? 'text-sm py-1 px-2 font-light' : 'text-md py-3 px-4 font-semibold'} ${custom ? custom : ''}`}>
        {Icon && <Icon size={24}/>}
        {label}
    </button>
  )
}

export default Button