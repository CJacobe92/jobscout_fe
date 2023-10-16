import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import fetchCredentials from '@hooks/mutations/fetchCredentials'
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from '@components/ui/toast';
import { ExclamationTriangleIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod'
import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { toast } from '@components/ui/use-toast';


const usernamePattern = /^[A-Za-z0-9_.]+$/; // Regex pattern for usernames without spaces

const usernameSchema = z.string().min(4).max(20).regex(usernamePattern);

const emailSchema = z.string().email()

const formSchema = z.object({
  credentials: z.string().refine((value) => {
    if (value.includes('@')) {
      return emailSchema.safeParse(value).success;
    } else {
      return usernameSchema.safeParse(value).success;
    }
  }, {message: 'Invalid format or field is empty.'}),
});

const Signin = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {credentials: ''}
  })

  const error = Object.values(form.formState.errors).map((data) => (data))
  
  const { mutate } = fetchCredentials();
  const navigate = useNavigate();

  const onSubmit = (input) => {
    mutate({input}, {
      onSuccess: (data) => {
        const username = data.username
        const type = data.role
        const token = data.token
        navigate(`/password?type=${type}&username=${username}&token=${token}`)
      }
    })
  }

  useEffect(() => {
    const showError = () => {
      if (error.length > 0) {
        toast({
          description: (
            <div className='flex flex-row items-center justify-center gap-2'>
              <ExclamationTriangleIcon className='mt-1'/>
              <span>Invalid format or field is empty.</span>
            </div>
        ),
          action: <ToastAction altText="Try again" onClick={() => form.reset()}>Try again</ToastAction>,
        });
      }
    }
    showError();
  }, [form.formState.errors]);
  
  return (
    <div className='container flex flex-col items-center justify-center w-full min-h-screen mx-auto'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 p-6 border border-gray-300 rounded-lg shadow-md w-96'>
          <div className='my-2 space-y-2'>
            <h1 className='text-xl font-bold text-indigo-700'>JobScout</h1>
            <p className='text-sm font-semibold text-gray-500'>Account Sign in</p>
            <span className='text-xs font-semibold text-gray-600'>Don't have an account? Sign up.</span>
          </div>
          <FormField 
            control={form.control}
            name='credentials'
            render={({field}) => (
              <FormItem>
                <FormLabel className='text-xs text-gray-600'>Username or email</FormLabel>
                <FormControl>
                  <div className='flex flex-row items-center justify-center gap-2 border border-black'>
                    <LockClosedIcon className='ml-2'/>
                    <Input {...field} className='border-l border-gray-300 rounded-none focus-visible:ring-transparent focus:ring-transparent' />
                  </div>
                </FormControl>
              </FormItem>
            )}
          />
          <Button type='submit' className='my-2'>Next</Button>
          <p className='text-xs text-center text-gray-600 '>By signing in, you acknowledge and agree to our privacy terms and policies.</p>
        </form>
      </Form>
    </div>
  )
}

export default Signin