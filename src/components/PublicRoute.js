import React from 'react'
import { Route } from 'react-router'
// import { useSelector } from 'react-redux'
// import { isAuthorizedSelector } from '../containers/Auth/authSlice'
// import LoginPage from '../containers/Auth/Login'

// eslint-disable-next-line react/prop-types
const PublicRoute = ({ component: Component, ...rest }) => {
  console.log('asd')
  return <Route {...rest} render={(props) => <Component {...props} />} />
}

export default PublicRoute
