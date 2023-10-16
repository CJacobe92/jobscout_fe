import { API } from '@services/axiosInstance';
import { auth, tenant } from '@services/storage'
import { useQuery } from '@tanstack/react-query'

const fetchTenantJobsData = (assignment, page, query, location) => {

  const authorization = auth.get();
  const tenantId = tenant.get();
  
  const getData = async () => {
    try{

      const url = `/jobs?tenant_id=${tenantId}&assignment=${assignment}&page=${page}&query=${query}&location=${location}`

      const response = await API.get(url)
      if (response.status == 200 || response.status == 204) {
        return response?.data
      }
      
    } catch(err){
      throw err?.response?.data.error
    }
  }

  return useQuery({
    queryKey: ['tenantJobsData', page, query, location, assignment],
    queryFn: getData,
    staleTime: 60000,
    enabled: !!authorization
  })
}

export default fetchTenantJobsData