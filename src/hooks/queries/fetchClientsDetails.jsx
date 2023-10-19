import { API } from '@services/axiosInstance'
import { tenant } from '@services/storage'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const fetchClientsDetails = (clientId) => {

  const getData = async () => {
    try{
      // const encodedQueryString = encodeURIComponent(query);
      // const tenantId = tenant.get();
      const response = await API.get(`/employers/${clientId}`)

      if (response.status == 200 || response.status == 204) {
        return response?.data
      }
    } catch(err){
      throw err?.response.data.error
    }
  }
  return useQuery({
    queryKey: ['clientDetails', clientId],
    queryFn: getData,
  })
}

export default fetchClientsDetails