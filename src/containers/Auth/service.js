import API, { setToken, TOKEN_KEY } from '../../core/utils/api'
import { removeState, saveState } from '../../core/utils/localStorage'

const handleResponse = ({ data: { token, ...restData } }) => {
  saveState(TOKEN_KEY, token)
  setToken(token)
  return restData
}

export const loginRequest = (loginPayload) =>
  API.post('/auth', loginPayload).then((response) =>
    handleResponse(response.data),
  )

export const registerRequest = (registerData) =>
  API.post('/register', registerData).then((response) =>
    handleResponse(response.data),
  )

export const logout = () => {
  removeState(TOKEN_KEY)
  setToken(null)
}
