import { API } from '@services/axiosInstance'
import { useMutation } from '@tanstack/react-query'

const fetchPassword = () => {

  const postData = async(variables) => {
    try {

      const res = await API.post(`/auth/password?token=${variables.token}`, {auth: variables.input})

      if (res.status == 200 || res.status == 204) {

        const data = {
          uid: res?.headers.uid,
          accessToken: res?.headers.authorization,
          enabled: res?.headers.enabled,
          otp_enabled: res?.headers.otp_enabled,
          otp_required: res?.headers.otp_required,
          role: res?.headers.role,
          tenant_id: res?.headers.tenant_id
        }
   
        return data
      }
    }catch(error){
      throw error?.response.data.error
    }
  }

  return useMutation({
    mutationKey: ['password'],
    mutationFn: postData,
    onMutate: variables => variables
  })
}

export default fetchPassword