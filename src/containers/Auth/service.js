import API, { setAuthorizationToken } from '../../core/api'
import { removeState, saveState } from '../../core/localStorage'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../core/values/keys'

const handleResponse = ({ accessToken, refreshToken }) => {
  saveState(ACCESS_TOKEN_KEY, accessToken)
  saveState(REFRESH_TOKEN_KEY, refreshToken)
  setAuthorizationToken(accessToken)
}

export const loginRequest = (loginPayload) =>
  API.post('/auth', loginPayload)
    .then((response) => {
      handleResponse(response.data)
      return response
    })
    .catch((reason) => reason)

export const registerRequest = (registerData) =>
  API.post('/register', registerData).then((response) => {
    handleResponse(response.data)
    return response
  })

export const logoutRequest = () => {
  removeState(ACCESS_TOKEN_KEY)
  removeState(REFRESH_TOKEN_KEY)
  setAuthorizationToken(null)
}

export const userRequest = () =>
  API.get('/user')
    .then((response) => response)
    .catch((reason) => reason)
