import React from 'react'

import { Switch } from 'react-router-dom'
import PublicRoute from './components/PublicRoute'
import HealthCheck from './components/HealthCheck'
import LoginPage from './containers/Auth/Login'
import WelcomePage from './containers/WelcomePage'
import RegisterPage from './containers/Auth/Register'
import PrivateRoute from './components/PrivateRoute'

const Routing = () => (
  <Switch>
    <PrivateRoute exact path="/health-check" component={HealthCheck} />
    <PublicRoute exact path="/login" component={LoginPage} />
    <PublicRoute exact path="/welcome" component={WelcomePage} />
    <PublicRoute exact path="/register" component={RegisterPage} />
  </Switch>
)

export default Routing
