import React, { useEffect, useState } from 'react'
import {
  Button,
  Grid,
  makeStyles,
  Modal,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { Autocomplete } from '@material-ui/lab'
import validator from 'validator'
import { useDispatch, useSelector } from 'react-redux'
import { ACCENT_COLOR, TEXT_DIMMED_COLOR } from '../../core/values/colors'
import {
  getUsersStarted,
  usersSelector,
  usersLoadingSelector,
  inviteUserToTeam,
  selectedTeamSelector,
} from '../HomePage/homeSlice'
import { userSelector } from '../Auth/authSlice'

export const useStyles = makeStyles((theme) => ({
  addModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: 20,
    width: '40vw',
    background: ACCENT_COLOR,
  },
  header: {
    color: TEXT_DIMMED_COLOR,
    margin: '20px 0px',
  },
  column: {
    width: '37vw',
    margin: '15px 15px',
    color: TEXT_DIMMED_COLOR,
    fontSize: '18px',
    textAlign: 'left',
  },
  columnContainer: {
    background: ACCENT_COLOR,
  },
  description: {
    background: ACCENT_COLOR,
    width: '35vw',
    borderRadius: '8px',
    height: '10vh !important',
    margin: '0px 5px',
    font: 'inherit',
    padding: '10px',
    resize: 'none',
  },
  button: {
    width: '36vw',
  },
  btnContainer: {
    margin: '2vh 0',
    height: '30%',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
}))

const AddUserToTeamModal = (props) => {
  const { isOpenModal, handleClose } = props
  const [username, setUsername] = useState('')
  const usernames = useSelector(usersSelector)
  const currentUser = useSelector(userSelector)
  const isUsersLoading = useSelector(usersLoadingSelector)
  const selectedTeam = useSelector(selectedTeamSelector)
  const [email, setEmail] = useState('')
  const [isEmailValid, setIsEmailValid] = useState(true)
  const dispatch = useDispatch()
  const classes = useStyles()

  const setValidatedEmail = (v) => setIsEmailValid(validator.isEmail(v))

  useEffect(() => {
    if (isOpenModal) dispatch(getUsersStarted())
  }, [isOpenModal])

  const onEmailChange = (e) => {
    setEmail(e.target.value)
    setValidatedEmail(e.target.value)
  }

  const onUsernameChange = (e) => {
    setUsername(e.target.innerText)
  }

  const handleAddUser = () => {
    if (selectedTeam) {
      if (username) {
        dispatch(
          inviteUserToTeam({
            userEmail: usernames.find((user) => user.username === username)
              .email,
            teamId: selectedTeam.id,
          }),
        )
        handleClose()
      } else if (email && isEmailValid) {
        dispatch(
          inviteUserToTeam({ userEmail: email, teamId: selectedTeam.id }),
        )
        handleClose()
      }
    }
  }

  return (
    <Modal
      open={isOpenModal}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      className={classes.addModal}
    >
      <Paper elevation={10} className={classes.paper}>
        <Grid container alignItems="center" direction="column" spacing={0}>
          <Grid container alignItems="center" direction="column" spacing={0}>
            <Grid item align="center" xs={12}>
              <Typography
                variant="h5"
                component="h2"
                className={classes.header}
              >
                Add team
              </Typography>
            </Grid>
            <Grid item align="center" xs={12}>
              <Paper
                elevation={0}
                className={`rounded ${classes.columnContainer}`}
              >
                <Typography>
                  If you want to add registered user - find him by username
                </Typography>
                <Autocomplete
                  disabled={email}
                  loading={isUsersLoading}
                  fullWidth
                  getOptionLabel={(option) => option.username}
                  className={classes.column}
                  onChange={onUsernameChange}
                  options={usernames.filter(
                    (user) => user.username !== currentUser.username,
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="User name"
                      placeholder="Specify username ..."
                      variant="filled"
                    />
                  )}
                />
              </Paper>
            </Grid>
            <Grid item align="center" xs={12}>
              <Paper
                elevation={0}
                className={`rounded ${classes.columnContainer}`}
              >
                <Typography style={{ marginTop: '20px' }}>
                  If you want to add unregistered user - type his email
                </Typography>
                <TextField
                  label="New user email"
                  placeholder="Specify email of user you want to be invited"
                  variant="filled"
                  fullWidth
                  helperText={!isEmailValid && 'Specify valid email'}
                  className={classes.column}
                  value={email}
                  onChange={onEmailChange}
                  error={!isEmailValid}
                  disabled={username}
                />
              </Paper>
            </Grid>
          </Grid>
          <Grid
            container
            alignItems="center"
            direction="column"
            justify="flex-end"
            spacing={0}
            className={classes.btnContainer}
          >
            <Grid item align="center" xs={12} className="successBtn">
              <Paper
                elevation={0}
                className={`rounded ${classes.columnContainer}`}
              >
                <Button
                  type="submit"
                  variant="contained"
                  className={`successBtn ${classes.button}`}
                  fullWidth
                  onClick={() => handleAddUser()}
                >
                  + Add user to team
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  )
}

AddUserToTeamModal.propTypes = {
  isOpenModal: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default AddUserToTeamModal
