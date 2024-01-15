'use client'

import Button from '@/components/Button'
import Heading from '@/components/Heading'
import CategoryInput from '@/components/inputs/CategoryInput'
import CustomCheckbox from '@/components/inputs/CustomCheckbox'
import Input from '@/components/inputs/Input'
import SelectColor from '@/components/inputs/SelectColor'
import TextArea from '@/components/inputs/TextArea'
import firebaseApp from '@/libs/firebase'
import { categories } from '@/utils/categories'
import { colors } from '@/utils/colors'
import React, { useCallback, useEffect, useState } from 'react'
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { useRouter } from 'next/navigation'

export type ImageType = {
    color: string
    colorCode: string
    image: File | null
}

export type UploadedImageType = {
    color: string
    colorCode: string
    image: string
}

const AddProductForm = () => {
    const router = useRouter()

    const [isloading, setIsLoading] = useState(false)
    const [images, setImages] = useState<ImageType[] | null>()
    const [isProductCreated, setIsProductCreated] = useState(false)

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

    useEffect(() => {
        setCustomValue('images', images)
    }, [images])

    useEffect(() => {
        if(isProductCreated) {
            // setTimeout(() => {
                reset()
                setImages(null)
                setIsProductCreated(false)
            // }, 2000)
        }
    }, [isProductCreated])

    const category = watch('category')

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldValidate: true,
            shouldDirty: true,
            shouldTouch: true
        })
    }

    const addImageToState = useCallback((value: ImageType) => {
       setImages((prevState) => {
            if(!prevState) {
                return [value]
            } else {
                return [...prevState, value]
            }
       })
    }, [])

    const removeImageFromState = useCallback((value: ImageType) => {
        setImages((prevState) => {
            if(prevState) {
                return prevState.filter((image) => image.color !== value.color)
            }
            
            return prevState
        })
    }, [])

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        setIsLoading(true)

        //upload to Firebase
        let UploadedImages: UploadedImageType[] = []
        if(!data.category){
            setIsLoading(false)
            return toast.error('Category not selected')
        }

        if(!data.images || data.images.length === 0){
            setIsLoading(false)
            return toast.error('Atleast one image is required')
        }

        const handleImageUploads = async () => {
            toast("Creating product, please wait...")
            try {
                for(const item of data.images) {
                    if(item.image) {
                        const fileName = new Date().getTime() + '-' + item.image.name
                        const storage = getStorage(firebaseApp)
                        const storageRef = ref(storage, `products/${fileName}`)
                        const uploadTask = uploadBytesResumable(storageRef, item.image)

                        await new Promise<void>((resolve, reject) => {
                            uploadTask.on('state_changed', (snapshot) => {
                                const progress = Math.round(
                                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                                )
                                toast.success(`Uploading ${fileName}... ${progress}%`)
                            }, (error) => {
                                toast.error(error.message)
                                reject(error)
                            }, () => {
                                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                                    UploadedImages.push({
                                        ...item,
                                        image: downloadURL
                                    })
                                    toast.success('Uploaded')
                                    resolve()
                                }).catch((error) => {
                                    reject(error)
                                    toast.error(error.message)
                                })
                            })
                        });
                    }
                }
            } catch (error) {
                setIsLoading(false)
                console.log('Error uploading images', error)
                return toast.error('Error uploading images')
            }
        };
        await handleImageUploads();

        const productData = {...data, images: UploadedImages}
        //save to mongodb
        fetch('/api/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({productData})
        }).then((res) => {
            setIsProductCreated(true)
            toast.success('Product created successfully')
            router.refresh()
        }).catch((err) => {
            toast.error(err.message)
        }).finally(() => {
            setIsLoading(false)
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
        <div className='w-full flex flex-col flex-wrap gap-4'>
            <div>
                <div className='font-bold'>
                    Select the available product colors and upload thier images.
                </div>
                <div className='text-sm'>
                    You must upload an image for each of the color selected otherwise your color selection will be ignored.
                </div>
            </div>
            <div className='grid grid-cols-2 gap-3'>
                {colors.map((item, idx) => {
                    return <SelectColor key={idx} item={item} addImageToState={addImageToState} isProductCreated={isProductCreated} removeImageFromState={removeImageFromState}/>
                })}
            </div>
        </div>
        <Button label={isloading ? 'Loading...' : 'Add Product'} onClick={handleSubmit(onSubmit)} />
    </>
  )
}

export default AddProductForm