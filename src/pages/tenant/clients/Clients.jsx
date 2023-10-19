import PaginationBtn from '@components/buttons/PaginationBtn';
import clientColumns from '@components/tables/clientColumns';
import { DataTable } from '@components/tables/data-table';
import { useSearchContext } from '@context/SearchContextProvider';
import fetchClientsData from '@hooks/queries/fetchClientsData';
import HeaderWrapper from '@pages/common/HeaderWrapper'
import React from 'react'

const Clients = () => {

  const { pageParams, searchParams } = useSearchContext();

  const page =  pageParams.get('page') || 1
  const query =  searchParams.get('query') || ''

  const { data, isLoading } = fetchClientsData(page, query)

  return isLoading ? <div>Loading... </div> : (
    <div className='container mx-auto py-4 overflow-y-auto h-[90vh] flex flex-col justify-between'>
      <DataTable columns={clientColumns} data={data.data} query={query} location={location}/>
      <PaginationBtn data={data} page={page} query={query} location={location} assignment={'unassigned'} />
    </div>
  )
}

export default HeaderWrapper(Clients, 'Clients')