import { API } from '@services/axiosInstance'
import { userType, verified } from '@services/storage'
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'
import React from 'react'

const fetchUpdateUserData = () => {

  const queryClient = useQueryClient()

  const patchData = async (variables) => {
    try {
      const role = userType.get();
      const userId = verified.get();
      const url = `/${role + 's'}/${userId}`;
  
      const payloadItem = () => {
        switch (role) {
          case 'owner':
            return { owner: variables.input };
          default:
            return {};
        }
      }

      const payload = payloadItem();
  
      const res = await API.patch(url, payload);
  
      if (res.status === 200 || res.status === 204) {
        return res.data;
      }

    } catch (err) {
      throw err.response.data.error;
    }
  }
      
  return useMutation({
    mutationKey: ['updateUserData'],
    mutationFn: patchData,
    onMutate: variables => variables,
    onSuccess: async() => {
      await queryClient.invalidateQueries(['userData'])
    }
  })
}

export default fetchUpdateUserData