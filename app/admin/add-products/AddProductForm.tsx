'use client'

import Heading from '@/components/Heading'
import CategoryInput from '@/components/inputs/CategoryInput'
import CustomCheckbox from '@/components/inputs/CustomCheckbox'
import Input from '@/components/inputs/Input'
import TextArea from '@/components/inputs/TextArea'
import { categories } from '@/utils/categories'
import React, { useState } from 'react'
import { FieldValues, useForm } from 'react-hook-form'

const AddProductForm = () => {
    const [isloading, setIsLoading] = useState(false)
    const { register, handleSubmit, setValue, watch, reset, formState:errors } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            description: '',
            brand: '',
            category: '',
            inStock: false,
            images: [],
            price: ''
        }
    })

    const category = watch('category')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

  return (
    <>
        <Heading title='Add Product' center/>
        <Input id='name' label='Name' type='text' disabled={isloading} register={register} errors={errors} required/>
        <Input id='price' label='Price' type='number' disabled={isloading} register={register} errors={errors} required/>
        <Input id='brand' label='Brand' type='text' disabled={isloading} register={register} errors={errors} required/>
        <TextArea id='description' label='Description' disabled={isloading} register={register} errors={errors} required/>
        <CustomCheckbox id='inStock' label='This product is in Stock' disabled={isloading} register={register} />
        <div className='w-full font-medium'>
            <div className='mb-2 font-bold'>Select a Category</div>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 max-h-[50vh] overflow-y-auto'>
                {categories.map((item) => {
                    if(item.label === 'All') {
                        return null
                    }
                    return (
                        <div key={item.label} className='col-span'>
                            <CategoryInput onClick={(category) => {setCustomValue('category', category)}} selected={category === item.label} label={item.label} icon={item.icon} />
                        </div>
                    )
                })}
            </div>
        </div>
    </>
  )
}

export default AddProductForm