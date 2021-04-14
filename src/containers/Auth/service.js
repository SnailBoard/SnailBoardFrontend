import API from '../../core/utils/api'

export const loginRequest = async (loginData) => {
  const response = await API({
    endpoint: '/api/auth',
    type: 'POST',
    skipAuthorization: true,
    request: loginData,
  })
  // const resp = await response.json()
  // console.log("Response from auth  ", resp)
  return response
}

export const registerRequest = async (registerData) => {
  const response = await API({
    endpoint: '/api/register',
    type: 'POST',
    skipAuthorization: true,
    request: registerData,
  })
  return response.text()
}

export const getUserRequest = async () => {
  try {
    const response = await API({
      endpoint: '/api/user',
      type: 'GET',
    })
    return response.json()
  } catch (e) {
    return null
  }
}
