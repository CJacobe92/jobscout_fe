import { Separator } from '@components/ui/separator';
import fetchClientsDetails from '@hooks/queries/fetchClientsDetails';
import HeaderWrapper from '@pages/common/HeaderWrapper'
import React from 'react'
import { useParams } from 'react-router-dom'

const ClientDetails = () => {

  const { clientId } = useParams();

  const {data, isLoading} = fetchClientsDetails(clientId)

  console.log(data)
  
  return isLoading ? <div>Loading...</div> : (
    <div className='h-[90vh] w-full'>
      <h1 className='container py-2 text-xl font-semibold text-gray-700'>{data?.company}</h1>
      <div className='container'>
        <div className='flex flex-row gap-20 p-2 text-xs'>
          <div className='space-y-2'>        
            <div>
              <b className='text-gray-700'>Contact:</b>
              <p>{data?.contact}</p>
            </div>
            <div>
              <b className='text-gray-700'>Designation:</b>
              <p>{data?.designation}</p>
            </div>
            <div>
              <b className='text-gray-700'>Email:</b>
              <p>{data?.email}</p>
            </div>
          </div>
          <div className='space-y-2'>        
            <div>
              <b className='text-gray-700'>Address:</b>
              <p>{data?.address}</p>
            </div>
            <div>
              <b className='text-gray-700'>Phone:</b>
              <p>{data?.phone}</p>
            </div>
          </div>
        </div>
        <Separator className='mt-6'/>
      </div>
    
    </div>
  )
}

export default HeaderWrapper(ClientDetails, 'Client Details')