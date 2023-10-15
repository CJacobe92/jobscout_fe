import { auth } from '@services/storage'
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {

  const isAuthenticated = auth.get()

  return isAuthenticated ? (  
    <div className='flex flex-row min-h-screen w-full'>
      <Sidebar />
      <Outlet />
    </div> 

  ) : (<Navigate to='signin' />)
}

export default Layout