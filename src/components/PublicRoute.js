import React, { useEffect } from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'
import { setAuthorizationToken } from '../core/api'

const PublicRoute = ({ component: Component, ...rest }) => {
  useEffect(() => {
    setAuthorizationToken(null)
  })
  return <Route {...rest} render={(props) => <Component {...props} />} />
}

PublicRoute.propTypes = {
  component: PropTypes.elementType,
}

export default PublicRoute
