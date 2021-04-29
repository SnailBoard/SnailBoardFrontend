import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Backdrop, CircularProgress } from '@material-ui/core'
import { Redirect } from 'react-router'
import {
  isAuthorizedSelector,
  isFetchingSelector,
  userStarted,
} from '../containers/Auth/authSlice'
import { useStyles } from '../containers/Auth/styles'
import { loadState } from '../core/localStorage'
import { ACCESS_TOKEN_KEY } from '../core/values/keys'
import { setAuthorizationToken } from '../core/api'

const PrivateRoute = ({ component: Component, ...rest }) => {
  const isAuthorized = useSelector(isAuthorizedSelector)
  const isFetching = useSelector(isFetchingSelector)
  const dispatch = useDispatch()
  const classes = useStyles()

  useEffect(() => {
    if (!isAuthorized) {
      setAuthorizationToken(loadState(ACCESS_TOKEN_KEY))
      dispatch(userStarted())
    }
  })

  if (!isAuthorized && isFetching) {
    console.log('Waiting')
    return (
      <div>
        <Backdrop className={classes.backdrop} open>
          <CircularProgress color="inherit" />
        </Backdrop>
      </div>
    )
  }

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
