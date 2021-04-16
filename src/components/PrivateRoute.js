import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { isAuthorizedSelector } from '../containers/Auth/authSlice'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthorized = useSelector(isAuthorizedSelector)

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
