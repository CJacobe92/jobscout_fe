import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@components/ui/form';
import { Input } from '@components/ui/input';
import { useDataContext } from '@context/DataContextProvider';
import { plan } from '@services/storage'
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'
import { Button } from '@components/ui/button';
import PlanSelect from '@components/select/PlanSelect';
import { useToast } from '@components/ui/use-toast';
import { useEffect, useState } from 'react';
import { ToastAction } from '@components/ui/toast';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Link, useNavigate } from 'react-router-dom';
import fetchTenantSignup from '@hooks/mutations/fetchTenantSignup';


const formSchema = z.object({
  firstname: z.string().min(2).max(50),
  lastname: z.string().min(2).max(20),
  email: z.string().email(),
  phone: z.string().min(2).max(15),
  subscription: z.string(),
})

const formItems = [
  { name: 'firstname', label: 'Firstname' },
  { name: 'lastname', label: 'Lastname' },
  { name: 'email', label: 'Email' },
  { name: 'phone', label: 'Phone'}
]

const Step2 = () => {

    const { updateAction, state } = useDataContext();
    const { mutate } = fetchTenantSignup()
    const { toast } = useToast();
    const navigate = useNavigate();
  
    const form = useForm({
      resolver: zodResolver(formSchema),
      defaultValues: state
    })
  
    const error = Object.values(form.formState.errors).map((data) => (data))
  
    const onSubmit = (value) => {
  
      updateAction({ ...state, ...value });
      mutate({state}, {
        onSuccess: () => {
          navigate('/step3')
        }
      })
    };
  
    useEffect(() => {
      const showError = () => {
        if (error.length > 0) {
          toast({
            description: (
              <div className='flex flex-row items-center justify-center gap-2'>
                <ExclamationTriangleIcon className='mt-1'/>
                <span>Did not meet field requirements.</span>
              </div>
          ),
            action: <ToastAction altText="Try again" onClick={() => form.clearErrors()}>Try again</ToastAction>,
          });
        }
      }
      showError();
    }, [form.formState.errors]);
  
  return (
    <div className='flex flex-col items-center justify-center w-full min-h-screen'>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex flex-col gap-2 p-4 border border-gray-300 rounded-lg shadow-md w-96'>
          <div className='mt-2 mb-1 space-y-2'>
            <Link to={'/'} className='text-xl font-bold text-indigo-700'>JobScout</Link>
            <p className='text-sm font-semibold text-gray-500'>Create a Tenant Account</p>
            <span className='text-xs font-semibold text-slate-700'>Already have an account? <Link to='/signin' className='underline'>Sign in.</Link></span>
          </div>
          <FormField name='subscription' control={form.control} render={({field}) => (<PlanSelect field={field}/>)} />
          {formItems.map((data, index) => (
            <FormField 
              key={index}
              name={data.name}
              control={form.control}
              render={({field}) => (
                <FormItem>
                  <FormLabel className='text-xs text-gray-600'>{data.label}</FormLabel>
                  <FormControl><Input {...field} className='border border-gray-400'/></FormControl>
                </FormItem>
              )}
            />
          ))}
          <Button type='submit' className='my-2'>Submit</Button>    
          <span className='text-xs text-gray-600'>By registering, you affirm that all the information provided is accurate to the best of your knowledge. Any instances of fraudulent agencies and POEA licenses will be promptly reported to the appropriate authorities.</span>
        </form>
      </Form>
    </div>
  )
}

export default Step2