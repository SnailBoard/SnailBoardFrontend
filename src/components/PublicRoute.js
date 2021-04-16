import React from 'react'
import { Route } from 'react-router'
import PropTypes from 'prop-types'

const PublicRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={(props) => <Component {...props} />} />
)

PublicRoute.propTypes = {
  component: PropTypes.elementType,
}

export default PublicRoute
