import axios from 'axios'
import history from '../../setupHistory'

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
  (error) => {
    // eslint-disable-next-line default-case
    switch (error.response.status) {
      case 401:
        history.push('/register')
        break
      case 404:
      // case 403:
      //   history.push('/')
      //   break
    }
    return Promise.reject(error.response)
  },
)

export default axios
