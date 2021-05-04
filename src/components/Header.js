import React from 'react'
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  makeStyles,
  Toolbar,
  Typography,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import { NavLink } from 'react-router-dom'
import Icon from '@material-ui/core/Icon'
import { useSelector } from 'react-redux'
import { PRIMARY_COLOR } from '../core/values/colors'
import snailLogo from '../static/img/snailboard.png'
import { userSelector } from '../containers/Auth/authSlice'

export const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
    justifyContent: 'center',
    justifyItems: 'center',
  },
  title: {
    flexGrow: 1,
    fontSize: 'medium',
  },
  appBar: {
    background: PRIMARY_COLOR,
  },
  btnLink: {
    color: '#fff',
    fontSize: 'medium',
  },
  logoutLink: {
    color: '#fff',
    fontSize: 'medium',
  },
  snailBtn: {
    justifyContent: 'center',
    justifyItems: 'center',
    margin: '10px',
    width: '95px',
    height: '60px',
  },
}))

const Header = () => {
  const user = useSelector(userSelector)

  const classes = useStyles()
  return (
    <>
      <AppBar position="static" className={classes.appBar}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item xs={4}>
              <Grid
                container
                spacing={1}
                justify="flex-start"
                alignItems="center"
              >
                <Grid item xs={3}>
                  <IconButton
                    edge="start"
                    className={classes.menuButton}
                    color="inherit"
                  >
                    <HomeIcon fontSize="large" />
                  </IconButton>
                </Grid>
                <Grid item xs={3}>
                  <NavLink exact to="/boards">
                    <Typography>
                      <Button className={classes.btnLink}>Boards</Button>
                    </Typography>
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} align="center">
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
            </Grid>
            <Grid item xs={4}>
              <Grid
                container
                spacing={1}
                justify="flex-end"
                alignItems="center"
              >
                <Grid item xs={6} lg={4}>
                  <Typography variant="h6" className={classes.title}>
                    {user.firstName}
                  </Typography>
                </Grid>
                <Grid item xs={3}>
                  <NavLink exact to="/logout">
                    <Typography>
                      <Button className={classes.logoutLink}>Logout</Button>
                    </Typography>
                  </NavLink>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Header
