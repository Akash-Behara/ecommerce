'use client'

import React from 'react'
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form'

interface TextAreaProps {
    id: string,
    label: string,
    disabled?: boolean,
    required?: boolean,
    register: UseFormRegister<FieldValues>,
    errors: FieldValues
}

const TextArea: React.FC<TextAreaProps> = ({ id, label, disabled, register, required, errors }) => {
  return (
    <div className='w-full relative'>
        <textarea {...register(id, {required})} placeholder='' autoComplete='off' disabled={disabled} id={id} className={`peer w-full p-4 pt-6 max-h-[150px] min-h-[150px] outline-none bg-white font-light border-2 rounded-md transition disabled:opacity-70 disabled:cursor-not-allowed ${errors[id] ? 'border-rose-400 focus:border-rose-400' : 'border-slate-300 focus:border-slate-300'}`}/>
        <label htmlFor={id} className={`absolute cursor-text text-md duration-200 -translate-y-3 top-5 z-10 origin-[0] left-4 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-4 ${errors[id] ? 'text-rose-500' : 'text-slate-400'}`}>{label}</label>
    </div>
  )
}

export default TextArea