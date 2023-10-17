import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { zodResolver } from '@hookform/resolvers/zod';
import { ToastAction } from '@components/ui/toast';
import { ExclamationTriangleIcon, LockClosedIcon } from '@radix-ui/react-icons';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as z from 'zod'
import React, { useEffect, useState } from 'react'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { toast } from '@components/ui/use-toast';
import fetchPassword from '@hooks/mutations/fetchPassword';
import SwitchSelect from '@components/select/SwitchSelect';
import { auth, userType, verified } from '@services/storage';

const formSchema = z.object({
  password: z.string().min(8, {message: 'Minimum password length is 8 characters'}).max(20, {message: 'Exceeded allowed password length'})
})

const Password = () => {

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {password: ''}
  })

  const error = Object.values(form.formState.errors).map((data) => (data))

  const location = useLocation();
  const params =  new URLSearchParams(location.search)
  const type = params.get('type')
  const token = params.get('token')
  const username = params.get('username')

  const navigate = useNavigate();
  const {mutate} = fetchPassword();


  const onSubmit = (input) => {

    mutate({input, token}, {
      onSuccess: (data) => {
        const role = data?.role
        const token = data?.accessToken
        const uid = data?.uid

        userType.set(role)
        auth.set(token)
        verified.set(uid)
        
        if (role == 'applicant' || role == 'owner')
        navigate('/t/dashboard')
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

  useEffect(() => {
    const disableBackAndForward = () => {
      window.history.pushState(null, null, window.location.href);
      window.onpopstate = function () {
        window.history.pushState(null, null, window.location.href);
      };
    };

    disableBackAndForward();

  }, []);

  return (
    <div className='container flex flex-col items-center justify-center w-full min-h-screen mx-auto'>
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 p-6 border border-gray-300 rounded-lg shadow-md w-96'>
        <div className='my-2 space-y-2'>
          <Link className='text-xl font-bold text-indigo-700'>JobScout</Link>
          <p className='text-sm font-semibold text-gray-500'>Signing in as {type?.charAt(0).toUpperCase() + type?.slice(1)}</p>
          <span className='text-xs font-semibold text-gray-600'>Don't have an account? Sign up.</span>
        </div>
        <SwitchSelect username={username}/>
        <FormField 
          control={form.control}
          name='password'
          render={({field}) => (
            <FormItem>
              <FormLabel className='text-xs text-gray-600'>Password</FormLabel>
              <FormControl>
                <div className='flex flex-row items-center justify-center gap-2 border border-black'>
                  <LockClosedIcon className='ml-2'/>
                  <Input {...field} type='password' className='border-l border-gray-300 rounded-none focus-visible:ring-transparent focus:ring-transparent' />
                </div>
              </FormControl>
            </FormItem>
          )}
        />
        <Button type='submit' className='my-2'>Sign in</Button>
        <p className='text-xs text-center text-gray-600 '>By signing in, you acknowledge and agree to our privacy terms and policies.</p>
      </form>
    </Form>
  </div>
  )
}

export default Password