import React from 'react'

import { Switch } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import HealthCheck from './components/HealthCheck'
import LoginPage from './containers/Auth/Login'
import RegisterPage from './containers/Auth/Register'

const Routing = () => (
  <Switch>
    <PublicRoute exact path="/health-check" component={HealthCheck} />
    <PublicRoute exact path="/login" component={LoginPage} />
    <PublicRoute exact path="/register" component={RegisterPage} />
  </Switch>
)

export default Routing
