import React from 'react'

import { Switch } from 'react-router-dom'
import PublicRoute from './components/Auth/PublicRoute'
import HealthCheck from './components/Auth/HealthCheck'
import LoginPage from './containers/Auth/Login'
import WelcomePage from './containers/WelcomePage'
import RegisterPage from './containers/Auth/Register'
import PrivateRoute from './components/Auth/PrivateRoute'
import HomePage from './containers/HomePage'
import LogoutPage from './containers/Auth/Logout'
import Board from './containers/Board'
import TeamInvitePage from './containers/HomePage/TeamInvitePage'

const Routing = () => (
  <Switch>
    <PrivateRoute exact path="/health-check" component={HealthCheck} />
    <PrivateRoute exact path="/home" component={HomePage} />
    <PrivateRoute exact path="/board/:boardName" component={Board} />
    <PublicRoute exact path="/login" component={LoginPage} />
    <PublicRoute exact path="/welcome" component={WelcomePage} />
    <PublicRoute exact path="/register" component={RegisterPage} />
    <PublicRoute exact path="/logout" component={LogoutPage} />
    <PublicRoute
      exact
      path="/team/invite/:inviteId"
      component={TeamInvitePage}
    />
    <PublicRoute exact path="/" component={WelcomePage} />
  </Switch>
)

export default Routing
