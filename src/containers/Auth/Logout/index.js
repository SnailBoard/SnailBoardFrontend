import React from 'react'
import { Redirect } from 'react-router'
import { removeState } from '../../../core/localStorage'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../../core/values/keys'

const LogoutPage = () => {
  removeState(ACCESS_TOKEN_KEY)
  removeState(REFRESH_TOKEN_KEY)

  return <Redirect to="/welcome" />
}

export default LogoutPage
