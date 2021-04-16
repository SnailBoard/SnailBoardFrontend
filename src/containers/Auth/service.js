import API, { setAuthorizationToken } from '../../core/utils/api'
import { removeState, saveState } from '../../core/localStorage'
import {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY,
} from '../../core/localStorage/keys'

const handleResponse = ({ accessToken, refreshToken }) => {
  saveState(ACCESS_TOKEN_KEY, accessToken)
  saveState(REFRESH_TOKEN_KEY, refreshToken)
  setAuthorizationToken(accessToken)
}

export const loginRequest = (loginPayload) =>
  API.post('/auth', loginPayload).then((response) => {
    handleResponse(response.data)
    return response
  })

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
