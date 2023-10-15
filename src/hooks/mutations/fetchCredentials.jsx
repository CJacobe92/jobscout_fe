import { API } from '@services/axiosInstance'
import { useMutation } from '@tanstack/react-query'

const fetchCredentials = () => {

  const postData = async(variables) => {
    try {

      const res = await API.post('/auth/credentials', {auth: variables.input})

      if (res.status == 200 || res.status == 204) {
        
        const data = {
          role:  res.headers.role,
          username: res.data.account,
          token: res.headers.authorization
        }

        return data
      }
    }catch(error){
      throw error?.response.data.error
    }
  }

  return useMutation({
    mutationKey: ['credentials'],
    mutationFn: postData,
    onMutate: variables => variables
  })
}

export default fetchCredentials