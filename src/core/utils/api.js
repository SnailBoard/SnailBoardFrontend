import axios from 'axios'
import jwtDecode from 'jwt-decode'
import history from '../../setupHistory'

export const TOKEN_KEY = 'token'

export const setToken = (token) => {
  if (token) {
    axios.defaults.headers.common.Authorization = `Token ${token}`
  } else {
    delete axios.defaults.headers.common.Authorization
  }
}

export const isTokenValid = (token) => {
  try {
    const decodedJwt = jwtDecode(token)
    const currentTime = Date.now().valueOf() / 1000
    return decodedJwt.exp > currentTime
  } catch (error) {
    return false
  }
}

axios.defaults.baseURL = '/api'

axios.interceptors.response.use(
  (response) => response,
  (error) => {
    // eslint-disable-next-line default-case
    switch (error.response.status) {
      case 401:
        history.push('/register')
        break
      case 404:
      case 403:
        history.push('/')
        break
    }
    return Promise.reject(error.response)
  },
)

export default axios
