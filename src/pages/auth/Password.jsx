import fetchPassword from '@hooks/mutations/FetchPassword'
import { DotsHorizontalIcon, LockClosedIcon, PersonIcon } from '@radix-ui/react-icons'
import { auth, userType, verified } from '@services/storage'
import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const Password = () => {
  
  const schema = {
    password: ''
  }

  const [input, setInput ] = useState(schema)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const location = useLocation();
  const params =  new URLSearchParams(location.search)
  const type = params.get('type')
  const token = params.get('token')
  const username = params.get('username')

  const dialogRef = useRef(null);

  const navigate = useNavigate();
  const {mutate} = fetchPassword();

  const handleOpenDialog = () => {
    setIsDialogOpen(!isDialogOpen)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }


  const handleChange = (e) => {
    const {name, value} = e.target
    setInput({...input, [name]: value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();

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
    const handleClickOutside = (event) => {
      if (dialogRef.current && !dialogRef.current.contains(event.target)) {
        handleCloseDialog();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
   <div className='container mx-auto flex flex-col items-center justify-center min-h-screen'>
    <form className='w-72 flex flex-col items-center rounded-md gap-2 space-y-2' onSubmit={handleSubmit}>
      <div className='text-center space-y-2'>
        <h1 className='text-2xl font-bold text-indigo-600'>JobScout</h1>
        <p className='font-semibold text-xl text-gray-500'>Signing in as {type?.charAt(0).toUpperCase() + type?.slice(1)}</p>
        <p className='text-sm font-semibold text-gray-600'>Don't have an account? Sign up.</p>
      </div>
      <div className='text-xs flex flex-row items-end justify-between w-full'>
        <div className='flex flex-row gap-1'>
          <PersonIcon />
          <p className='underline font-semibold text-gray-600'>{username}</p>
        </div>
        <div className='flex flex-col relative' ref={dialogRef}>
          <button onClick={handleOpenDialog} type='button'><DotsHorizontalIcon /></button>
          <span className={`${isDialogOpen ? 'inline-block' : 'hidden z-20 '} top-5 right-0 absolute bg-base-200 border border-gray-300 rounded-sm w-24 py-1 text-center`}>
            <Link to={'/signin'} className='hover:underline font-semibold'>Switch account</Link>
          </span>
        </div>
      </div>
      <div className='w-full space-y-1'>
        <label className='text-xs font-semibold text-gray-700'>Password</label>
        <div className='flex flex-row items-center justify-between border border-gray-700'>
          <LockClosedIcon className='m-1'/>
          <input 
            className='block input-ghost input-sm w-full outline-none'
            placeholder='Enter your password'
            type='password' 
            name="password" 
            value={input.password} 
          onChange={handleChange}/>
        </div>
      </div>
      <button type='submit' className='btn btn-primary text-white rounded-sm btn-sm w-full '>Sign In</button>
      <p className='text-xs text-center text-gray-600 '>By signing in, you acknowledge and agree to our privacy terms and policies.</p>
    </form>
   </div>
  )
}

export default Password