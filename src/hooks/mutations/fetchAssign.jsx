import { API } from '@services/axiosInstance'
import { verified } from '@services/storage';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query'

const fetchAssign = () => {

  const queryClient = useQueryClient();

  const postData = async (variables) => {
    try{
      const assignment = verified.get();
      const url = `/jobs/${variables.jobId}`
      const payload = {assignment: assignment}
      const response = await API.patch(url, payload)

      if (response.status == 200 || response.status == 204) {
          console.log(response?.data)
          return response?.data
      }
    }catch(err){
      throw err?.response.data.error
    }
  }

  return useMutation({
    mutationKey: ['assignJob'],
    mutationFn: postData,
    onMutate: variables => variables,
    onSuccess: () => {
      queryClient.invalidateQueries(['tenantJobsData'])
    }
  })
}

export default fetchAssign