import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import React from 'react'

const CredentialsInfoInput = () => {
  return (
    <>
      <p>Credentials:</p>
      <p>You can update here your credentials below </p>
      <div className='grid gap-4'>
          <div className='grid gap-2'>
            <div className='grid items-center grid-cols-4 gap-2'>
              <Label htmlFor='password'>Username</Label>
              <Input 
                id='username'
                className='col-span-3'
              />
            </div>
          </div>
          <div className='grid gap-2'>
            <div className='grid items-center grid-cols-4 gap-2'>
              <Label htmlFor='password'>Password</Label>
              <Input 
                id='password'
                className='col-span-3'
              />
            </div>
          </div>
        <div className='grid gap-2'>
          <div className='grid items-center grid-cols-4 gap-2'>
            <Label htmlFor='password_confirmation'>Confirm Password</Label>
            <Input 
              id='password_confirmation'
              className='col-span-3'
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default CredentialsInfoInput