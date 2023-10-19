import PaginationBtn from '@components/buttons/PaginationBtn';
import assignedColumns from '@components/tables/assignedColumns';
import { DataTable } from '@components/tables/data-table';
import jobsColumns from '@components/tables/unassignedColumns';
import { useSearchContext } from '@context/SearchContextProvider';
import fetchTenantJobsData from '@hooks/queries/fetchTenantJobsData';
import HeaderWrapper from '@pages/common/HeaderWrapper'
import { verified } from '@services/storage'
import React from 'react'

const Assigned = () => {

  const { pageParams, searchParams } = useSearchContext();
  const assignment = verified.get();

  console.log(assignment)
  const page =  pageParams.get('page') || 1
  const query =  searchParams.get('query') || ''
  const location = searchParams.get('location') || ''

  const { data, isLoading } = fetchTenantJobsData(assignment, page, query, location)

  return isLoading ? <div>Loading... </div> : (
    <div className='container py-4 mx-auto overflow-y-auto'>  
      <DataTable columns={assignedColumns} data={data.data} query={query} location={location}/>
      <div className='container mx-auto py-4 overflow-y-auto h-[90vh] flex flex-col justify-between'>
        <PaginationBtn data={data} page={page} query={query} location={location} assignment={assignment} />
      </div>
    </div>
  )
}

export default HeaderWrapper(Assigned, 'Assigned')