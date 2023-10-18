import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';
import { ExclamationTriangleIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import * as z from 'zod'
import React, { useEffect } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import fetchCredentials from '@hooks/mutations/fetchCredentials';
import { toast } from '@components/ui/use-toast';
import { ToastAction } from '@components/ui/toast';

const Signin = () => {

  const REGEX = /^[A-Za-z0-9_.]+$/;
  const message = {
    minAllowed: 'Username or email cannot be less than 4 characters in length',
    maxAllowed: 'Username or email cannot be more than 15 characters in length',
    invalid: 'Invalid characters'
  }

  const emailSchema = z.string().min(4, {
    message: message.minAllowed 
  }).max(15, {
    message: message.maxAllowed
  }).email()
  
  const formSchema = z.object({
    credentials: z.string().regex(REGEX, {message: 'Invalid format'}).superRefine((val, ctx) => {
      if (val.length < 4) {
        ctx.addIssue({
          code: z.ZodIssueCode.too_small,
          type: 'too_small',
          inclusive: true,
          message: 'Username or email cannot be less than 4 characters in length'
        })
      } 
      else if(val.includes('@')) {
        return emailSchema.parse(val)
      }
    })
  })

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {credentials: ''}
  })
  
  const { mutate } = fetchCredentials();
  const navigate = useNavigate();

  const onSubmit = (input) => {
    mutate({input}, {
      onSuccess: (data) => {
        const username = data.username
        const type = data.role
        const token = data.token
        navigate(`/password?type=${type}&username=${username}&token=${token}`)
      },
      onError:(error) => {
        toast({
          description: (
            <p className='flex flex-row items-center justify-center gap-2'>
              <ExclamationTriangleIcon className='mt-1'/>
              <span>{error}</span>
            </p>
        ),
          action: <ToastAction altText="Try again" onClick={() => form.reset()}>Try again</ToastAction>,
        });
      }
    })
  }

  useEffect(() => {
    const showError = async () => {
      const credsFormState = Object.values(form?.formState.errors)
      const error = (credsFormState[0])
      if (error && error.message) {
        toast({
          description: (
            <p className='flex flex-row items-center justify-center gap-2'>
              <ExclamationTriangleIcon className='mt-1'/>
              <span>{error.message}</span>
            </p>
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
            <Link to={'/'} className='text-xl font-bold text-indigo-700'>JobScout</Link>
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