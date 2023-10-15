import fetchCredentials from '@hooks/mutations/FetchCredentials'
import { LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Signin = () => {
  
  const schema = {
    credentials: ''
  }

  const [input, setInput ] = useState(schema)

  const navigate = useNavigate();
  const { mutate } = fetchCredentials();

  const handleChange = (e) => {
    const {name, value} = e.target
    setInput({...input, [name]: value})
  }

  const handleNext = (e) => {
    e.preventDefault();

    mutate({input}, {
      onSuccess: (data) => {
        const username = data.username
        const type = data.role
        const token = data.token
        navigate(`/password?type=${type}&username=${username}&token=${token}`)
      }
    })
  }

  return (
   <div className='container mx-auto flex flex-col items-center justify-center min-h-screen'>
    <form className='w-72 flex flex-col items-center space-y-2 gap-2' onSubmit={handleNext}>
      <div className='text-center space-y-2'>
        <h1 className='text-2xl font-bold text-indigo-600'>JobScout</h1>
        <p className='font-semibold text-xl text-gray-500'>Sign Into Your Account</p>
        <p className='text-sm font-semibold text-gray-600'>Don't have an account? Sign up.</p>
      </div>
      <div className='w-full space-y-2'>
        <label className='text-xs font-semibold text-gray-700'>Email or Username</label>
        <div className='flex flex-row items-center justify-between border border-gray-700'>
          <LockClosedIcon className='m-1'/>
          <input 
            className='block input-ghost input-sm w-full outline-none'
            placeholder='Enter your credentials'
            type={input.credentials.includes('@') ? 'email' : 'text'} 
            name="credentials" 
            value={input.credentials} 
          onChange={handleChange}/>
        </div>
      </div>
      <button type='submit' className='btn btn-primary text-white rounded-sm btn-sm w-full '>Next</button>
      <p className='text-xs text-center text-gray-600 '>By signing in, you acknowledge and agree to our privacy terms and policies.</p>
    </form>
   </div>
  )
}

export default Signin