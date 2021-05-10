import React from 'react'
import { Button, Grid, Paper, Typography, withStyles } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { useStyles } from './styles'
import boardImg from '../../static/img/board.png'
import coworkersImg from '../../static/img/coworkers.svg'

const StyledButton = withStyles({
  root: {
    variant: 'contained',
    backgroundColor: '#B1BCBE',
    color: '#FFFFFF',
    maxWidth: '240px',
    minWidth: '240px',
    maxHeight: '60px',
    minHeight: '60px',
    '&:hover': {
      backgroundColor: '#B1BCBE',
      color: '#3c52b2',
    },
  },
})(Button)

const WelcomePage = () => {
  const classes = useStyles()
  const currentYear = new Date().getFullYear()
  return (
    <div className={classes.root}>
      <Grid container justify="center" alignItems="center">
        <Grid item xs={12}>
          <Paper style={{ backgroundColor: '#E5E5E5' }}>
            <img
              className={classes.img}
              alt="snail board logo"
              src={boardImg}
            />
          </Paper>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Grid item xs={10} sm={6}>
            <Paper className={classes.welcomePaper}>
              <Typography gutterBottom variant="h3" component="h1">
                Welcome to snail team
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                One more step to continue. Please create a free account or login
                with one. Take your time enjoing work with us
              </Typography>
              <Grid container style={{ marginTop: '10%' }}>
                <Grid item xs={7} sm={7}>
                  <StyledButton component={Link} to="/login">
                    <Typography variant="h4" component="h3">
                      Sign In
                    </Typography>
                  </StyledButton>
                </Grid>
                <Grid item xs={5} sm={5}>
                  <StyledButton component={Link} to="/register">
                    <Typography variant="h4" component="h3">
                      Sign Up
                    </Typography>
                  </StyledButton>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
          <Grid item xs={6} sm={4}>
            <img
              className={classes.coworkers}
              alt="coworkers logo"
              src={coworkersImg}
            />
          </Grid>
        </Grid>
        <Typography variant="body1" color="inherit" classes={classes.phantom}>
          <footer className={classes.footer}>
            © {currentYear}. All rights reserved
          </footer>
        </Typography>
      </Grid>
    </div>
  )
}

export default WelcomePage
