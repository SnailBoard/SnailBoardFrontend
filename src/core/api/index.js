import axios from 'axios'

export const setAuthorizationToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

axios.defaults.baseURL = '/api'

axios.interceptors.response.use(
  (response) => {
    console.log('Response from axios interceptor', response)
    return response
  },
  (error) => Promise.reject(error.response),
)

export default axios
