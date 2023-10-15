import bstandard from '@assets/bstandard.webp'
import bpremium from '@assets/bpremium.webp'
import enterprise from '@assets/enterprise.webp'

import { useNavigate } from 'react-router-dom'
import { plan } from '@services/storage'

const Plan = () => {

  const planItems = [
    {  
      title: 'Business Standard',
      image: bstandard,
      price: '$3 user/month',
      description: 'For agencies with 50 employees and below.',
      value: 'bstndard',
      button: 'Get Started'
    },
    { 
      title: 'Business Premium',
      image: bpremium,
      price: '$5 user/month',
      description: 'For agencies with 100 employees and below.',
      value: 'bpremium',
      button: 'Get Started'
    },
    { 
      title: 'Enterprise',
      image: enterprise,
      price: 'Get a quote',
      description: 'For agencies with more than 100 employees.',
      value: 'enterprise',
      button: 'Get Started'
    },
  ]

  const navigate = useNavigate();
  
  const handleGetStarted = (e) => {
    const value = e.target.value
    plan.set(value)
    navigate('/step1')
  }
  
  return (
    <div className='flex flex-row gap-6'>
      {planItems.map((data, index) =>(
        <div className='border rounded-sm shadow-xl h-96 border-opacity-30 border-primary w-60 card bg-base-200'>
          <figure>
            <img src={data.image} alt="business premium" loading="lazy" width="600" height="600" style={{width:"100%", height:"auto"}}/>
          </figure>
          <div className='flex flex-col items-center gap-4 text-center card-body'>
            <h2 className='card-title text-primary'>{data.title}</h2>
            <p className='text-xl font-bold text-gray-600'>{data.price}</p>
            <p className='text-xs'>{data.description}</p>
            <div className='card-actions'>
              <button onClick={handleGetStarted} className='btn btn-sm btn-primary' value={data.value}>Get Started</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Plan