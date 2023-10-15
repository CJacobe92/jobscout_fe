import { API } from '@services/axiosInstance'
import { useMutation } from '@tanstack/react-query'

const fetchTenantSignup = () => {

  const postData = async(variables) => {
    try {

      const res = await API.post('/tenants', {tenant: variables.state})

      if (res.status == 200 || res.status == 204) {
        return res?.data
      }
    }catch(error){
      throw error?.response.data.error
    }
  }

  return useMutation({
    mutationKey: ['tenantSignup'],
    mutationFn: postData,
    onMutate: variables => variables
  })
}

export default fetchTenantSignup