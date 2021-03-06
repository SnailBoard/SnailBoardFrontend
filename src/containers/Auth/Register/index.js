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
  isUploadingImageSelector,
  registerStarted,
  userClosedErrorAlert,
  uploadingImageStarted,
  uploadedImageIdSelector,
} from '../authSlice'
import { useStyles } from '../styles'

const RegisterPage = () => {
  const dispatch = useDispatch()
  const isFetching = useSelector(isFetchingSelector)
  const isFailed = useSelector(isFailedSelector)
  const isAdding = useSelector(isUploadingImageSelector)
  const uploadedImageId = useSelector(uploadedImageIdSelector)

  const classes = useStyles()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [isUsernameValid, setUsernameValid] = useState(true)
  const [isFirstNameValid, setFirstNameValid] = useState(true)
  const [isEmailValid, setEmailValid] = useState(true)
  const [isPasswordValid, setIsPasswordValid] = useState(true)
  const [selectedFile, setSelectedFile] = useState()

  const setValidatedFirstName = (v) => setFirstNameValid(v.length >= 2)
  const setValidatedUsername = (v) => setUsernameValid(v.length >= 2)
  const setValidatedPassword = (v) => setIsPasswordValid(v.length >= 6)
  const setValidatedEmail = (v) => setEmailValid(validator.isEmail(v))

  const onRegisterClick = () => {
    if (email === '') {
      setEmailValid(false)
      return
    }
    if (password === '') {
      setIsPasswordValid(false)
      return
    }
    if (username === '') {
      setUsernameValid(false)
      return
    }
    if (firstName === '') {
      setFirstNameValid(false)
      return
    }
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
        image: uploadedImageId,
      }
      console.log(registerPayload)
      dispatch(registerStarted(registerPayload))
    }
  }

  const handleFileChange = (element) => {
    const filesList = element.target.files
    if (!filesList || !filesList[0]) return
    setSelectedFile(filesList[0])
    dispatch(uploadingImageStarted(filesList[0]))
  }

  const onEmailChange = (e) => {
    setEmail(e.target.value)
    setValidatedEmail(e.target.value)
  }

  const onPasswordChange = (e) => {
    setPassword(e.target.value)
    setValidatedPassword(e.target.value)
  }

  const onUsernameChange = (e) => {
    setUsername(e.target.value)
    setValidatedUsername(e.target.value)
  }

  const onFirstNameChange = (e) => {
    setFirstName(e.target.value)
    setValidatedFirstName(e.target.value)
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(userClosedErrorAlert())
  }

  return (
    <div className={classes.authBody}>
      <Grow in disableStrictModeCompat timeout={800}>
        <Paper
          elevation={10}
          className={`${classes.paper} ${classes.registerPaper}`}
        >
          <Grid container alignItems="center" direction="column">
            <Grid item align="center">
              <Avatar className={classes.avatarRegister}>
                <LockOutlinedIcon />
              </Avatar>
              <h2>Register</h2>
            </Grid>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                variant="contained"
                color="primary"
                component="label"
                disabled={!!isAdding}
              >
                Add avatar
                <input
                  type="file"
                  hidden
                  accept=".png,.jpg"
                  onChange={handleFileChange}
                />
              </Button>
              {selectedFile && (
                <Avatar
                  alt="Avatar"
                  src={URL.createObjectURL(selectedFile)}
                  style={{ marginLeft: '10px' }}
                />
              )}
            </div>
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
                  I have an account
                  <MoodIcon className={classes.mood} />
                </Button>
              </Typography>
            </NavLink>
          </Grid>
        </Paper>
      </Grow>
    </div>
  )
}

export default RegisterPage
