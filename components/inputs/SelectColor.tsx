'use client'

import { ImageType } from '@/app/admin/add-products/AddProductForm'
import React, { useCallback, useEffect, useState } from 'react'
import SelectImage from './SelectImage'
import Button from '../Button'
interface SelectColorProps {
    item: ImageType
    addImageToState: (item: ImageType) => void
    removeImageFromState: (item: ImageType) => void
    isProductCreated: boolean
}


const SelectColor: React.FC<SelectColorProps> = ({ item, addImageToState, removeImageFromState, isProductCreated }) => {
  
    const [isSelected, setIsSelected] = useState(false)
    const [file, setFile] = useState<null | File>(null)

    useEffect(() => {
        if (isProductCreated) {
            setIsSelected(false)
            setFile(null)
        }
    }, [isProductCreated])

    const handleFileChange = useCallback((value: File) => {
        setFile(value)
        addImageToState({...item, image: value})
    }, [])

    const handleCheck = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setIsSelected(e.target.checked)
        if(!e.target.checked){
            setFile(null)
            removeImageFromState(item)
        }
    }, [])

    return (
    <div className='grid grid-cols-1 md:grid-cols-2 overflow-y-auto border-[1.2px] border-slate-200 items-center p-2'>
        <div className='flex flex-row gap-2 items-center h-[60px]'>
            <input id={item.color} type='checkbox' className='w-4 h-4 cursor-pointer' checked={isSelected} onChange={handleCheck}/>
            <label htmlFor={item.color} className='font-medium cursor-pointer'>{item.color}</label>
        </div>
        <>
            {isSelected && !file && (
                <div className='col-span-2 text-center'>
                    <SelectImage item={item} handleFileChange={handleFileChange} />
                </div>
            )}

            {file && (
                <div className="flex flex-row gap-2 text-sm col-span-2 justify-between items-center">
                    <p>{file?.name}</p>
                    <div className='w-[70px]'>
                        <Button label='Remove' small outline onClick={() => {setFile(null); removeImageFromState(item)}} />
                    </div>
                </div>
            )}
        </>
    </div>
  )
}

export default SelectColor