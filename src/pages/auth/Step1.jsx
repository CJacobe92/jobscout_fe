import { useDataContext } from '@context/DataContextProvider';
import { plan } from '@services/storage'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Step1 = () => { 
  
  const planItems = [
    {name: 'Business Standard', value: 'bstandard'},
    {name: 'Business Premium', value: 'bpremium'},    
    {name: 'Enterprise', value: 'enterprise'}
  ]

  const { updateAction, state } = useDataContext();
  
  const navigate = useNavigate();

  const handleChange = (e) => {
    const {name, value} = e.target
    updateAction({...state, [name]: value})
  }

  const handleNext = (e) => {
    e.preventDefault();
    
    if(state && state.company_name && state.company_address && state.company_email && state.license) {
      navigate('/step2')
      console.log(state)
    }
  }
  
  return (
    <div className='min-h-screen w-full flex items-center justify-center'>
      <form className='w-80 flex flex-col items-center gap-4' onSubmit={handleNext}>
        <div className='text-center space-y-2'>
          <h1 className='text-2xl font-bold text-indigo-600'>JobScout</h1>
          <p className='font-semibold text-xl text-gray-500'>Create a Tenant Account</p>
          <p className='text-sm font-semibold text-gray-600'>Already have an account? Sign in.</p>
        </div>
        <div className='flex justify-end itemes-center w-full text-sm'>
          <select className='w-max-xs' onChange={(e) => { plan.set(e.target.value); handleChange(e)}} name='subscription' defaultValue={state.subscription} >
            {planItems.map((data, index) => (
              <option key={index} value={data.value}>{data.name}</option>
            ))}
          </select>
        </div>
        <div className='flex flex-col gap-2 w-full'>
          
          <div className='w-full'>
            <label className='text-xs font-semibold'>Company Name</label>
            <input 
              className='block w-full border border-primary p-1 outline-none' 
              onChange={handleChange} 
              value={state.company_name}
              type="text" 
              name="company_name" 
            />
          </div>
          <div className='w-full'>
            <label className='text-xs font-semibold'>Company Address</label>
            <input 
              className='block w-full border border-primary p-1 outline-none'
              value={state.company_address}
              onChange={handleChange} 
              name="company_address" 
              type="text" 
            />
          </div>
          <div className='w-full'>
            <label className='text-xs font-semibold'>Company Email</label>
            <input 
              className='block w-full border border-primary p-1 outline-none'
              onChange={handleChange} 
              value={state.company_email}
              name="company_email" 
              type="email" 
            />
          </div>
          <div className='w-full'>
            <label className='text-xs font-semibold'>POEA License</label>
            <input 
              className='block w-full border border-primary p-1 outline-none' 
              onChange={handleChange} 
              value={state.license}
              name="license" 
              type="text" 
            />
          </div>
        </div>
        <button type='submit' className='btn btn-sm btn-primary w-full'>Next</button>
        <div className='text-xs text-center text-gray-500'>
          <p>By registering, you affirm that all the information provided is accurate to the best of your knowledge. Any instances of fraudulent agencies and POEA licenses will be promptly reported to the appropriate authorities.</p>
        </div>
      </form>
    </div>
  )
}

export default Step1