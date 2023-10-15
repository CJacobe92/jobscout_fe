import axios from "axios";
import { auth, userType } from "./storage";

const BASE_URL = import.meta.env.VITE_API_URL

export const API = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json'},
  withCredentials: true
})

API.interceptors.request.use(
  config => {
    const token = auth.get();

    if(!config.headers.Authorization && auth) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config;
  }
)

let refresh;

API.interceptors.response.use(
  config => config,
  async (error) => {
    const prevRequest = error?.config

    if (error?.response.status == 403 || error?.response.status == 401 && !refresh) {

       refresh = true

       const response = await API.get('/auth/refresh')

       if (response.status == 200 || response.status == 204) {
         
         const token = response.headers.authorization
         const role = response.headers.role

         auth.set(token)
         userType.set(role)

         API.defaults.headers.common.Authorization = `Bearer ${token}`
         return API(prevRequest)
         
       } else if (response.status == 500) {
        auth.remove();
        userType.remove();
        window.location.assign('/credentials')
       }
    }
    refresh = false
    return Promise.reject(error)
  }
)
