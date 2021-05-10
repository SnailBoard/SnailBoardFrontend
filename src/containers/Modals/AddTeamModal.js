import React, { useState } from 'react'

import {
  Grid,
  Modal,
  Paper,
  makeStyles,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
  CircularProgress,
  Backdrop,
  Snackbar,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert'
import { ACCENT_COLOR, TEXT_DIMMED_COLOR } from '../../core/values/colors'
import {
  userClosedErrorAlert,
  addTeamStarted,
  isFailedSelector,
  isFetchingSelector,
  isFulfilledSelector,
  setIsFulfilledFalse,
} from '../HomePage/homeSlice'

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

const AddTeamModal = (props) => {
  const { isModalOpen, setIsModalOpen } = props

  const isFulfilled = useSelector(isFulfilledSelector)
  const isFetching = useSelector(isFetchingSelector)
  const isFailed = useSelector(isFailedSelector)

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isNameValid, setIsNameValid] = useState(true)

  const setValidatedName = (v) => setIsNameValid(v.length >= 3)

  const onNameChange = (e) => {
    setName(e.target.value)
    setValidatedName(e.target.value)
  }
  const onDescriptionChange = (e) => {
    setDescription(e.target.value)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const handleAddTeam = () => {
    if (isNameValid) {
      const addTeamPayload = { name, description }
      dispatch(addTeamStarted(addTeamPayload))
    }
  }

  if (isFulfilled) {
    setIsModalOpen(false)
    dispatch(setIsFulfilledFalse())
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(userClosedErrorAlert())
  }

  const classes = useStyles()
  return (
    <>
      <Modal
        open={isModalOpen}
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
                  <TextField
                    label="Team name"
                    placeholder="Specify team name ..."
                    variant="filled"
                    fullWidth
                    required
                    helperText={!isNameValid && 'At least 3 symbols'}
                    className={classes.column}
                    onChange={onNameChange}
                    error={!isNameValid}
                  />
                </Paper>
              </Grid>
              <Grid item align="center" xs={12}>
                <Paper
                  elevation={0}
                  className={`rounded ${classes.columnContainer}`}
                >
                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Add description ..."
                    className={classes.description}
                    onChange={onDescriptionChange}
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
                    onClick={() => handleAddTeam()}
                  >
                    + Add team
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
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
          <p>Error during adding a team!</p>
          <p>Try to refresh page</p>
        </MuiAlert>
      </Snackbar>
    </>
  )
}

AddTeamModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
}

export default AddTeamModal
