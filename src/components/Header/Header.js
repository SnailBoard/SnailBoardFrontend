import React from 'react'
import PropTypes from 'prop-types'
import {
  AppBar,
  Button,
  Grid,
  IconButton,
  Paper,
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
import { PRIMARY_COLOR } from '../../core/values/colors'

const Header = (props) => {
  const { boardName } = props
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
                  <NavLink exact to="/home">
                    <IconButton
                      edge="start"
                      className={classes.menuButton}
                      color="inherit"
                    >
                      <HomeIcon fontSize="large" />
                    </IconButton>
                  </NavLink>
                </Grid>
                {boardName && (
                  <>
                    <Grid item xs={3}>
                      <Typography>
                        <Button className={classes.btnLink}>Boards</Button>
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Paper
                        style={{
                          textAlign: 'center',
                          color: PRIMARY_COLOR,
                        }}
                        variant="outlined"
                      >
                        {boardName}
                      </Paper>
                    </Grid>
                  </>
                )}
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
                      <Button className={classes.btnLink}>Logout</Button>
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

Header.propTypes = {
  boardName: PropTypes.string,
}

export default Header
