import { API } from '@services/axiosInstance';
import { auth, tenant, user, userType, verified } from '@services/storage';
import { useQuery } from '@tanstack/react-query';
import React from 'react'

const fetchUserData = () => {

  const authorization = auth?.get();
  const uid = verified?.get()

  const getData = async () => {
    try{

      const role = userType?.get();
      const url = `/${role}s/${uid}`

      const response = await API.get(url)

      if (response.status == 200 || response.status == 204) {
        
        const data = {
          $id: response?.data.id,
          firstname: response?.data.firstname,
          lastname: response?.data.lastname,
          email: response?.data.email,
        }

        user.set(data)
        tenant.set(response?.data.tenant_id)

        return data
      }
    } catch (error) {
      throw error?.response.data.error
    }
  }

  return useQuery({
    queryKey: ['userData'],
    queryFn: getData,
    enabled: !!authorization
  })
}

export default fetchUserData