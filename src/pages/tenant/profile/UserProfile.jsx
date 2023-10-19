import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@components/ui/tabs"
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from '@components/ui/form'
import React, { useEffect, useState } from 'react'
import fetchUserData from '@hooks/queries/fetchUserData'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from '@components/ui/use-toast'
import { CheckIcon, ExclamationTriangleIcon, ReloadIcon } from '@radix-ui/react-icons'
import { ToastAction } from '@components/ui/toast'
import fetchUpdateUserData from '@hooks/mutations/fetchUpdateUserData'
import loading from '@assets/loading.svg'
import { Input } from "@components/ui/input"
import HeaderWrapper from '@pages/common/HeaderWrapper'
import { Button } from "@components/ui/button"
import { Checkbox } from "@components/ui/checkbox"
import { useNavigate } from "react-router-dom"

const UserProfile = () => {

  const {data, isLoading: dataIsLoading} = fetchUserData();
  const { mutate, isLoading, isSuccess} = fetchUpdateUserData();
  const [showPassword, setShowPassword] = useState(false)

  const navigate = useNavigate();

  const accountchema = z.object({
    firstname: z.union([
      z.string().length(0, {message: 'Firstname cannot be less than 4 characters in length'}),
      z.string().min(4)
    ]).optional()
      .transform(e => e === '' ? data?.firstname : e),
    lastname: z.union([
      z.string().length(0, {message: 'Lastname cannot be less than 4 characters in length'}),
      z.string().min(4)
    ]).optional()
      .transform(e => e === '' ? data?.lastname : e),
    email: z.union([
      z.string().length(0, {message: 'Email cannot be less than 4 characters in length'}),
      z.string().min(4).email()
    ]).optional()
      .transform(e => e === '' ? data?.email : e),
    username: z.union([
      z.string().length(0, {message: 'Username cannot be less than 4 characters in length'}),
      z.string().min(4)
    ]).optional()
      .transform(e => e === '' ? data?.username : e),
  });

 const passwordSchema = z.object({
  password: z
    .string()
    .min(8, { message: 'Minimum password length is 8 characters' }),
  password_confirmation: z
    .string()
    .min(8, { message: 'Minimum password length is 8 characters' })
  }).superRefine((val, ctx) => {
     
    if(val.password !== val.password_confirmation) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['password_confirmation'],
        inclusive: true
      })
    }
  })

  const accountForm = useForm({
    resolver: zodResolver(accountchema),
    defaultValues: {
      firstname: data?.firstname || '' ,
      lastname: data?.lastname || '' ,
      email: data?.email || ''  ,
      username: data?.username || '' ,
    },
    mode: 'onChange'
  })

  const passwordForm = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
      password: '',
      password_confirmation: ''
    },
    mode: 'onChange'
  })

  const formItems = [
    {label: 'Firstname', name: 'firstname', defaultValue: data?.firstname},
    {label: 'Lastname', name: 'lastname', defaultValue: data?.lastname},
    {label: 'Email', name: 'email', defaultValue: data?.email},
    {label: 'Username', name: 'username', defaultValue: data?.username},
    {label: 'New Password', name: 'password', defaultValue: ''},
    {label: 'Confirm Password', name: 'password_confirmation', defaultValue: ''},
  ]

  const onSubmitAccountForm = (input) => {
    mutate({input})
  }

  const onSubmitPasswordForm = (input) => {
    mutate({input}, {
      onSuccess: () => {
        navigate('/signin')
      }
    })
  }

  useEffect(() => {
    const showAccountFormErrors = async () => {

      const inputName = await accountForm.formState.name
      const error = await accountForm?.formState.errors[inputName]
      
      if (accountForm?.formState.errors[inputName]?.type == 'too_big') {
        
        toast({
          description: (
            <p className='flex flex-row items-center justify-center gap-2'>
              <ExclamationTriangleIcon className='mt-1'/>
              <span>{error.message}</span>
            </p>
        ),
          action: <ToastAction altText="Try again" onClick={() => accountForm.clearErrors()}>Try again</ToastAction>,
        });
      }
    }

    const showPasswordFormErrors = async () => {

      const inputName = await passwordForm.formState.name
      const error = await passwordForm?.formState.errors[inputName]
      
      if (error?.type == 'too_small') {    
          toast({
            description: (
              <p className='flex flex-row items-center justify-center gap-2'>
                <ExclamationTriangleIcon className='mt-1'/>
                <span>{error.message}</span>
              </p>
          ),
            action: <ToastAction altText="Try again" onClick={() => passwordForm.clearErrors()}>Try again</ToastAction>,
          });
      } else if (error?.type == 'custom') {
        toast({
          description: (
            <p className='flex flex-row items-center justify-center gap-2'>
              <ExclamationTriangleIcon className='mt-1'/>
              <span>{error.message}</span>
            </p>
        ),
          action: <ToastAction altText="Try again" onClick={() => passwordForm.clearErrors()}>Try again</ToastAction>,
        });
      }
    }

    showPasswordFormErrors();
    showAccountFormErrors();
  }, [accountForm.formState.errors, passwordForm.formState.errors])
  

  return dataIsLoading ? <p>Loading...</p> : (
    <> 
      <h1 className='p-4 text-xl font-semibold text-gray-700 '>Edit Profile Settings</h1>
      <div className='flex flex-col items-center justify-start w-full p-4'>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList className="grid justify-center w-full grid-cols-2"> {/* Center the TabsList */}
            <TabsTrigger onClick={() => passwordForm.reset()} value="account" className='data-[state=active]:border border-gray-300'>Account</TabsTrigger>
            <TabsTrigger value="password"  className='data-[state=active]:border border-gray-300'>Password</TabsTrigger>
          </TabsList>
          <TabsContent value="account" className='shadow-xl'>
                
            <Form {...accountForm}>
                <form onSubmit={accountForm.handleSubmit(onSubmitAccountForm)}>
              <Card>
                <CardHeader>
                  <CardTitle>Account</CardTitle>
                  <CardDescription>
                    Make changes to your account here. Click save when you're done.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                    {formItems
                      .filter((data) => 
                      !data.name.includes('password') &&
                      !data.name.includes('password_confirmation'))
                      .map((data, index) => (
                      <FormField 
                        key={index}
                        name={data.name}
                        control={accountForm.control}
                        render={({field}) => (
                          <FormItem>
                            <FormLabel className='text-xs text-gray-600'>{data.label}</FormLabel>
                            <FormControl>
                              <Input 
                                {...field} 
                                className='border border-gray-400 rounded-none'
                                placeholder={data.defaultValue}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />))}
                  </CardContent>
                  <CardFooter>
                    {isLoading ? 
                      <Button disabled className='flex flex-row items-center justify-center p-0 pl-4'>
                        <p>Please wait</p>
                          <span className='w-8 h-8'>
                          <img src={loading} alt="Loading..." loading="lazy" width="600" height="600" style={{width:"100%", height:"auto"}}/>
                        </span>
                      </Button> 
                      : <Button type='submit'>Save changes</Button>
                    }
                  </CardFooter>
                </Card>
                </form>
              </Form> 
              </TabsContent>
              <TabsContent value="password" className='shadow-xl'>
                <Form {...passwordForm}>
                  <form onSubmit={passwordForm.handleSubmit(onSubmitPasswordForm)}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Password</CardTitle>
                        <CardDescription>
                          Change your password here. After saving, you'll be logged out.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-2">
                        {formItems
                          .filter((data) => 
                          data.name.includes('password') || 
                          data.name.includes('password_confirmation'))
                          .map((data, index) => (
                          <FormField 
                            key={index}
                            name={data.name}
                            control={passwordForm.control}
                            render={({field}) => (
                              <FormItem>
                                <FormLabel className='text-xs text-gray-600'>{data.label}</FormLabel>
                                <FormControl>
                                  <Input 
                                    {...field} 
                                    // autoComplete='off'
                                    type={showPassword ? 'text' : 'password'}
                                    className='border border-gray-400 rounded-none'
                                    disabled={isLoading? true : false}
                                    />
                                </FormControl>
                              </FormItem>
                            )}
                          />))}   
                             
                       </CardContent>
                    <CardFooter className='flex flex-row justify-between'>
                      {isLoading ? 
                        <Button disabled className='flex flex-row items-center justify-center p-0 pl-4'>
                          <p>Please wait</p>
                            <span className='w-8 h-8'>
                            <img src={loading} alt="Loading..." loading="lazy" width="600" height="600" style={{width:"100%", height:"auto"}}/>
                          </span>
                        </Button> 
                        : <Button type='submit'>Save password</Button>
                      }
                      <div className="flex flex-row items-center gap-2 text-sm">
                        <Checkbox onClick={()=> setShowPassword(!showPassword)} value={showPassword}/> 
                        <p>Show password</p>
                      </div>  
                    </CardFooter>
                  </Card>
                </form>
              </Form>
            </TabsContent>
          </Tabs>  
      </div>
    </>
  )
}

export default HeaderWrapper(UserProfile, 'Profile')