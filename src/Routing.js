import React from 'react'

import { Switch } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import HealthCheck from './components/HealthCheck'
import LoginPage from './containers/Auth/Login'
import RegisterPage from './containers/Auth/Register'
import PrivateRoute from './components/PrivateRoute'
import HomePage from './containers/HomePage'
import LogoutPage from './containers/Auth/Logout'

const Routing = () => (
  <Switch>
    <PrivateRoute exact path="/health-check" component={HealthCheck} />
    <PrivateRoute exact path="/home" component={HomePage} />
    <PublicRoute exact path="/login" component={LoginPage} />
    <PublicRoute exact path="/register" component={RegisterPage} />
    <PublicRoute exact path="/logout" component={LogoutPage} />
  </Switch>
)

export default Routing
