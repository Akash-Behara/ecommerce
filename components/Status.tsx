import React from 'react'
import { IconType } from 'react-icons'

interface StatusProps {
    text: string
    icon: IconType
    bg: string
    color: string
}

const Status: React.FC<StatusProps> = ({ text, icon: Icon, bg, color }) => {
  return (
    <div className={`${bg} ${color} px-[5px] py-[6px] rounded flex items-center gap-1`}>
        {text} <Icon size={15} className='-translate-y-[1px]'/>
    </div>
  )
}

export default Status