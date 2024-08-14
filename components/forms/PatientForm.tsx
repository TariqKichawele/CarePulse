'use client';

import { z } from 'zod'
import React from 'react'
import { UserFormValidation } from '@/lib/validation';
import { useForm } from'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Form } from '../ui/form';
import CustomFormField, { FormFieldType } from '../CustomFormField';
import "react-phone-number-input/style.css";
import SubmitButton from '../SubmitButton';

const PatientForm = () => {

    const form = useForm<z.infer<typeof UserFormValidation>>({
        resolver: zodResolver(UserFormValidation),
        defaultValues: {
            name: '',
            email: '',
            phone: '',
        }
    });

    const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {

    }
  return (
    <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex-1 space-y-6'>
            <section className='mb-12 space-y-4'>
                <h1 className='header'>Hi There 👋</h1>
                <p className='text-dark-700'>Get Started with appointmenets.</p>
            </section>

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="name"
                label="Full Name"
                placeholder="John Doe"
                iconSrc="/assets/icons/user.svg"
                iconAlt="user"
            />

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.INPUT}
                name="email"
                label="Email"
                placeholder="john.doe@example.com"
                iconSrc="/assets/icons/email.svg"
                iconAlt="email"
            />

            <CustomFormField 
                control={form.control}
                fieldType={FormFieldType.PHONE_INPUT}
                name="phone"
                label="Phone Number"
                placeholder="+1 (123) 456-7890"
            />

            <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>

        </form>
    </Form>
  )
}

export default PatientForm