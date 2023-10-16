import { API } from '@services/axiosInstance'
import { tenant } from '@services/storage'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const fetchClientsData = (page, query) => {

  const getData = async () => {
    try{
      const encodedQueryString = encodeURIComponent(query);
      const tenantId = tenant.get();
      const response = await API.get(`/employers?tenant_id=${tenantId}&page=${page}&query=${encodedQueryString}`)

      if (response.status == 200 || response.status == 204) {
        return response?.data
      }
    } catch(err){
      throw err?.response.data.error
    }
  }
  return useQuery({
    queryKey: ['clientData', page, query],
    queryFn: getData,
  })
}

export default fetchClientsData