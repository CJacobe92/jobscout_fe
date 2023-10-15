import Plan from '@components/cards/Plan'
import React from 'react'
import { Link } from 'react-router-dom'

const Landing = () => {
  return (
    <div className='container mx-auto min-h-screen w-full flex flex-col items-center justify-center gap-4'>
      <Link to={'/signin'} className='btn btn-primary btn-sm'>Sign In</Link>
      <Plan />
    </div>
  )
}

export default Landing