import React from 'react'
import { Route } from 'react-router'
import { useSelector } from 'react-redux'
import HealthCheck from './HealthCheck'
import { isAuthorizedSelector } from '../containers/Auth/authSlice'

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ component: Component, ...rest }) => {
  const isAuthorized = useSelector(isAuthorizedSelector)

  return (
    <Route
      {...rest}
      render={(props) =>
        !isAuthorized ? <Component {...props} /> : <HealthCheck />
      }
    />
  )
}

export default PublicRoute
