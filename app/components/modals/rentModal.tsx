"use client";

// React Module
import { useMemo, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
// Hooks
import useRentModal from '@/app/hooks/useRentModal'
// Components
import Modal from './modal';
import Heading from '../Heading';
import CategoryInput from '../inputs/categoryInput';
import CountrySelect from '../inputs/countrySelect';
import Counter from '../inputs/counter';
import ImageUpload from '../inputs/imageUpload';
import Input from '../inputs/input';
// Categories Data
import { categories } from '../navbar/categories';
// Next Module
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
// Axios
import axios from 'axios';

enum STEPS {
    CATEGORY = 0,
    LOCATION = 1,
    INFO = 2,
    IMAGES = 3,
    DESCRIPTION = 4,
    PRICE = 5
}

const RentModal = () => {

    // Control Modal
    const rentModal = useRentModal();

    const [step, setStep] = useState(STEPS.CATEGORY);

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: {
            errors,
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            category: '',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: ''
        }
    });

    // Apply on "selected" / "value"
    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const Map = useMemo(() => dynamic(() => import('../Map'), {
        ssr: false
    }), [])

    // Apply on "onClick" / "onChange"
    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onSubmit:SubmitHandler<FieldValues> = (data) => {
        if(step !== STEPS.PRICE){
            return onNext();
        }

        setIsLoading(true);

        axios.post('/api/listings', data)
        .then(() => {
            toast.success('Listing Created!');
            router.refresh();
            reset();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        })
        .catch(() => {
            toast.error('Something went wrong!')
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    // Previous step
    const onBack = () => {
        setStep((value) => value - 1)
    }

    // Next step
    const onNext = () => {
        setStep((value) => value + 1)
    }

    // If last step, show 'Create' else 'Next'
    const actionLabel = useMemo(() => {
        if(step === STEPS.PRICE){
            return 'Create';
        }

        return 'Next';
    }, [step])

    // If first step, remain 'Next' else 'Back'
    const secondaryActionLabel = useMemo(() => {
        if(step === STEPS.CATEGORY){
            return undefined
        }

        return 'Back';
    }, [step])

    // Categories (STEP.CATEGORY)
    let bodyContent = (
        <div className='flex flex-col gap-8'>
            <Heading 
                title='Which of these best describes your place?'
                subtitle='Pick a category'
            />

            <div className='
                grid
                grid-cols-1
                md:grid-cols-2
                gap-3
                max-h-[50vh]
                overflow-y-auto
                '
            >
                {categories.map((item) => (
                    <div key={item.label} className='col-span-1'>
                        <CategoryInput 
                            onClick={(category) => setCustomValue('category', category)}
                            selected={category === item.label}
                            label={item.label}
                            icon={item.icon}
                        />
                    </div>
                ))}
            </div>
        </div>
    )

    // Locations
    if(step === STEPS.LOCATION){
        bodyContent = (
            <div className='
                flex
                flex-col
                gap-8
                '
            >
                <Heading 
                    title='Where is your place located?'
                    subtitle='Help guests find you!'
                />

                <CountrySelect 
                    onChange={(value) => setCustomValue('location', value)}
                    value={location}
                />

                <Map 
                    center={location?.latlng}
                />
                
            </div>
        )
    }

    // Counter For (Guests / Rooms / Bathrooms)
    if(step === STEPS.INFO){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Share some basics about your places'
                    subtitle='What amenities do you have?'
                />

                <Counter 
                    title='Guests'
                    subtitle='How many guests do you allow?'
                    value={guestCount}
                    onChange={(value) => setCustomValue('guestCount', value)}
                />

            <hr />

                <Counter 
                    title='Rooms'
                    subtitle='How many rooms do you have?'
                    value={roomCount}
                    onChange={(value) => setCustomValue('roomCount', value)}
                />

            <hr />

                <Counter 
                    title='Bathrooms'
                    subtitle='How many bathrooms do you have?'
                    value={bathroomCount}
                    onChange={(value) => setCustomValue('bathroomCount', value)}
                />
            </div>
        )
    }

    // Upload Images
    if(step === STEPS.IMAGES){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Add a photo of your place'
                    subtitle='Show guests what your place looks like!'
                />

                <ImageUpload 
                    value={imageSrc}
                    onChange={(value) => setCustomValue('imageSrc', value)}
                />
            </div> 
        )
    }

    // Description
    if(step === STEPS.DESCRIPTION){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='How would you describe your place?'
                    subtitle='Short and sweet works best!'
                />

                <Input 
                    id="title"
                    label="Title"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />

                <hr />

                <Input 
                    id="description"
                    label="Description"
                    disabled={isLoading}
                    register={register}
                    errors={errors}
                />

            </div>
        )
    }

    // Price
    if(step === STEPS.PRICE){
        bodyContent = (
            <div className='flex flex-col gap-8'>
                <Heading 
                    title='Now, set your price'
                    subtitle='How much do you charge per night?'
                />

                <Input 
                    id='price'
                    label="Price"
                    formatPrice
                    type='number'
                    disabled={isLoading}
                    errors={errors}
                    register={register}
                    required
                />

            </div>
        )
    }



  return (
    <Modal
        title="Airbnb Your Home"
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        body={bodyContent}
    />
  )
}

export default RentModal