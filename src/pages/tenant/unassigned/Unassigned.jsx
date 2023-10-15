import { DataTable } from '@components/tables/data-table';
import jobsColumns from '@components/tables/jobsColumns';
import { useSearchContext } from '@context/SearchContextProvider'
import fetchTenantJobsData from '@hooks/queries/fetchTenantJobsData';
import HeaderWrapper from '@pages/common/HeaderWrapper'
import React from 'react'

const Unassigned = () => {

  const { pageParams, searchParams } = useSearchContext();
  
  const page =  pageParams.get('page') || 1
  const query =  searchParams.get('query') || ''
  const location = searchParams.get('location') || ''
 
  const { data, isLoading } = fetchTenantJobsData('unassigned', page, query, location)

  return isLoading ? <div>Loading... </div> : (
    <div className='container mx-auto py-4 overflow-y-auto h-[90vh]'>
      <DataTable columns={jobsColumns} data={data.data}/>
    </div>
  )
}

export default HeaderWrapper(Unassigned, 'Unassigned')