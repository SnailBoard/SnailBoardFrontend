import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { NavLink } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import { useSelector } from 'react-redux'
import snailLogo from '../../static/img/snailboard.png'
import { userSelector } from '../../containers/Auth/authSlice'
import { useStyles } from './styles'

const Header = (props) => {
  const { boardName } = props
  const user = useSelector(userSelector)

  const classes = useStyles()
  return (
    <div className={classes.grow}>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <div className={classes.leftBlock}>
            <NavLink exact to="/home">
              <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="open drawer"
              >
                <HomeIcon fontSize="large" />
              </IconButton>
            </NavLink>
            {boardName && (
              <Typography variant="h5" noWrap>
                {boardName} board
              </Typography>
            )}
          </div>
          <div className={classes.centralBlock}>
            <NavLink exact to="/welcome">
              <Typography>
                <IconButton
                  edge="start"
                  className={classes.snailBtn}
                  color="inherit"
                >
                  <Icon className={classes.snailBtn}>
                    <img
                      alt="snail"
                      src={snailLogo}
                      width="100px"
                      height="65px"
                    />
                  </Icon>
                </IconButton>
              </Typography>
            </NavLink>
          </div>
          <div className={classes.rightBlock}>
            <Typography className={classes.title} variant="h5" noWrap>
              {user.firstName}
            </Typography>
            <NavLink exact to="/logout">
              <Button className={classes.btnLink}>
                <Typography variant="h5" noWrap>
                  Logout
                </Typography>
              </Button>
            </NavLink>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}

Header.propTypes = {
  boardName: PropTypes.string,
}

export default Header
