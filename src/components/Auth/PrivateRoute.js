import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router'
import {
  isAuthorizedSelector,
  userSelector,
  userStarted,
} from '../../containers/Auth/authSlice'
import { loadState } from '../../core/localStorage'
import { ACCESS_TOKEN_KEY } from '../../core/values/keys'
import { setAuthorizationToken } from '../../core/api'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthorized = useSelector(isAuthorizedSelector)
  const dispatch = useDispatch()
  const user = useSelector(userSelector)

  useEffect(() => {
    if (isAuthorized && user.firstName) {
      setAuthorizationToken(loadState(ACCESS_TOKEN_KEY))
      dispatch(userStarted())
    }
  })

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthorized ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  )
}

PrivateRoute.propTypes = {
  component: PropTypes.elementType,
}

export default PrivateRoute
