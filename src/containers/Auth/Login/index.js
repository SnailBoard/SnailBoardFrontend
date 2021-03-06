import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import {
  Avatar,
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  Grow,
  Paper,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core'
import MuiAlert from '@material-ui/lab/Alert'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import { NavLink } from 'react-router-dom'
import {
  isFetchingSelector,
  loginStarted,
  userClosedErrorAlert,
  isFailedSelector,
} from '../authSlice'
import { useStyles } from '../styles'
import { errorLoginMessage } from '../../../core/values/strings'

const LoginPage = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(isFetchingSelector)
  const isFailed = useSelector(isFailedSelector)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const setValidatedEmail = (e) => setIsEmailValid(validator.isEmail(e))
  const setValidatedPassword = (p) => setIsPasswordValid(p.length >= 6)

  const onLoginClick = () => {
    if (email === '') {
      setIsEmailValid(false)
      return
    }
    if (password === '') {
      setIsPasswordValid(false)
      return
    }
    if (isEmailValid && isPasswordValid) {
      const loginPayload = { email, password }
      dispatch(loginStarted(loginPayload))
    }
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
    setValidatedEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    setValidatedPassword(e.target.value)
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(userClosedErrorAlert())
  }

  const classes = useStyles()
  return (
    <div className={classes.authBody}>
      <Grow in disableStrictModeCompat timeout={800}>
        <Paper
          elevation={10}
          className={`${classes.paper} ${classes.loginPaper}`}
        >
          <Grid container alignItems="center" direction="column">
            <Grid item align="center">
              <Avatar className={classes.avatarLogin}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Log In</h2>
            </Grid>
            <TextField
              label="Email"
              variant="outlined"
              placeholder="Enter email"
              fullWidth
              required
              className={classes.element}
              onChange={onEmailChange}
              error={!isEmailValid}
              helperText={!isEmailValid && 'Incorrect email format'}
            />
            <TextField
              label="Password"
              variant="outlined"
              placeholder="Enter password"
              type="password"
              fullWidth
              required
              className={classes.element}
              onChange={onPasswordChange}
              error={!isPasswordValid}
              helperText={!isPasswordValid && 'At least 6 characters'}
            />
            <Button
              type="submit"
              color="primary"
              variant="contained"
              className={classes.button}
              onClick={() => onLoginClick()}
              disabled={isFetching}
              fullWidth
            >
              Sign in
            </Button>
            <Backdrop className={classes.backdrop} open={isFetching}>
              <CircularProgress color="inherit" />
            </Backdrop>
            <NavLink exact to="/register">
              <Typography className={classes.element}>
                <Button color="primary">
                  I don&apos;t have an account
                  <MoodBadIcon className={classes.mood} />
                </Button>
              </Typography>
            </NavLink>
          </Grid>
        </Paper>
      </Grow>
      <Snackbar
        open={isFailed}
        autoHideDuration={3000}
        onClose={handleCloseAlert}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="error"
        >
          {errorLoginMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  )
}

export default LoginPage
