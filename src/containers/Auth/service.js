import API, { setAuthorizationToken } from '../../core/api'
import { loadState, removeState, saveState } from '../../core/localStorage'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../core/values/keys'

const handleResponse = ({ accessToken, refreshToken }) => {
  saveState(ACCESS_TOKEN_KEY, accessToken)
  saveState(REFRESH_TOKEN_KEY, refreshToken)
  setAuthorizationToken(accessToken)
}

export const getRefreshData = () => ({
  refreshToken: loadState(REFRESH_TOKEN_KEY),
})

export const loginRequest = (loginPayload) =>
  API.post('/auth', loginPayload)
    .then((response) => {
      handleResponse(response.data)
      return response
    })
    .catch((reason) => reason)

export const registerRequest = (data) =>
  API.post('/register', data)
    .then((response) => {
      handleResponse(response.data)
      return response
    })
    .catch((reason) => reason)

export const logoutRequest = () => {
  removeState(ACCESS_TOKEN_KEY)
  removeState(REFRESH_TOKEN_KEY)
  setAuthorizationToken(null)
}

export const userRequest = () =>
  API.get('/user')
    .then((response) => response)
    .catch((reason) => reason)

export const refreshRequest = (data) =>
  API.post('/refresh', data)
    .then((response) => {
      handleResponse(response.data)
      return response
    })
    .catch((reason) => reason)

export const acceptInvitationRequest = (payload) => {
  API.put(`team/acceptInvitation/${payload.inviteId}`)
    .then((response) => response)
    .catch((reason) => reason)
}

export const addImage = (image) => {
  const data = new FormData()
  data.append('image', image, image.name)
  return API.post(`images/add`, data)
    .then((response) => response)
    .catch((reason) => reason)
}
