import React, { useState } from 'react'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
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
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import MuiAlert from '@material-ui/lab/Alert'
import MoodIcon from '@material-ui/icons/Mood'
import {
  isFailedSelector,
  isFetchingSelector,
  registerStarted,
  userClosedErrorAlert,
} from '../authSlice'
import { useStyles } from '../styles'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(isFetchingSelector)
  const isFailed = useSelector(isFailedSelector)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isUsernameValid, setUsernameValid] = useState(true)
  const [isFirstNameValid, setFirstNameValid] = useState(true)
  const [isEmailValid, setEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)

  const setValidatedFirstName = () => setFirstNameValid(firstName.length >= 2)
  const setValidatedUsername = () => setUsernameValid(username.length >= 2)
  const setValidatedPassword = (pw) => setIsPasswordValid(pw.length >= 6)
  const setValidatedEmail = () => setEmailValid(validator.isEmail(email))

  const onRegisterClick = () => {
    if (
      isEmailValid &&
      isPasswordValid &&
      isUsernameValid &&
      isFirstNameValid
    ) {
      const registerPayload = {
        email,
        password,
        username,
        firstName,
      }
      dispatch(registerStarted(registerPayload))
    }
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
    setValidatedEmail()
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    setValidatedPassword(e.target.value)
  }

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
    setValidatedUsername()
  }

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value)
    setValidatedFirstName()
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(userClosedErrorAlert())
  }
  const classes = useStyles()
  return (
    <Grow in disableStrictModeCompat timeout={800}>
      <Paper elevation={10} className={classes.paper}>
        <Grid container alignItems="center" direction="column">
          <Grid item align="center">
            <Avatar className={classes.avatarRegister}>
              <LockOutlinedIcon />
            </Avatar>
            <h2>Register</h2>
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
          <TextField
            label="Username"
            variant="outlined"
            // placeholder="Enter password"
            type="username"
            fullWidth
            required
            className={classes.element}
            onChange={onUsernameChange}
            error={!isUsernameValid}
            helperText={!isUsernameValid && 'At least 2 characters'}
          />
          <TextField
            label="First name"
            variant="outlined"
            // placeholder="Enter password"
            type="firstName"
            fullWidth
            required
            className={classes.element}
            onChange={onFirstNameChange}
            error={!isFirstNameValid}
            helperText={!isFirstNameValid && 'At least 2 characters'}
          />
          <Button
            type="submit"
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={() => onRegisterClick()}
            disabled={isFetching}
            fullWidth
          >
            Register
          </Button>
          <Backdrop className={classes.backdrop} open={isFetching}>
            <CircularProgress color="inherit" />
          </Backdrop>
          <Snackbar
            open={isFailed}
            autoHideDuration={6000}
            onClose={handleCloseAlert}
          >
            <MuiAlert
              elevation={6}
              variant="filled"
              onClose={handleCloseAlert}
              severity="error"
            >
              Error during register!
            </MuiAlert>
          </Snackbar>
          <NavLink exact to="/login">
            <Typography className={classes.element}>
              {' '}
              <Button color="primary">
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                I don't have an account
                <MoodIcon className={classes.mood} />
              </Button>
            </Typography>
          </NavLink>
        </Grid>
      </Paper>
    </Grow>
  )
}

export default RegisterPage
