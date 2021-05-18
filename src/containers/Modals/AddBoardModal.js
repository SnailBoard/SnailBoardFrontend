import React, { useState } from 'react'

import {
  Backdrop,
  Button,
  CircularProgress,
  Grid,
  makeStyles,
  Modal,
  Paper,
  Snackbar,
  TextareaAutosize,
  TextField,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert'
import { ACCENT_COLOR, TEXT_DIMMED_COLOR } from '../../core/values/colors'
import {
  addBoardStarted,
  isAddBoardFailedSelector,
  isAddBoardFetchingSelector,
  isAddBoardFulfilledSelector,
  selectedTeamSelector,
  setIsAddBoardFulfilledFalse,
  setRefresh,
  userClosedErrorAlert,
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

const AddBoardModal = (props) => {
  const { isModalOpen, setIsModalOpen } = props

  const isFulfilled = useSelector(isAddBoardFulfilledSelector)
  const isFetching = useSelector(isAddBoardFetchingSelector)
  const isFailed = useSelector(isAddBoardFailedSelector)
  const selectedTeam = useSelector(selectedTeamSelector)

  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isNameValid, setIsNameValid] = useState(true)
  const [isTeamUndefined, setIsTeamUndefined] = useState(false)

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

  const handleAddBoard = () => {
    if (!selectedTeam) {
      setIsTeamUndefined(true)
    } else if (isNameValid) {
      const { id } = selectedTeam
      const payload = { id, name, description }
      dispatch(addBoardStarted(payload))
    }
  }

  if (isFulfilled) {
    setIsModalOpen(false)
    dispatch(setIsAddBoardFulfilledFalse())
    dispatch(setRefresh())
  }

  const handleCloseAlert = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(userClosedErrorAlert())
    setIsTeamUndefined(false)
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
                  Add board
                </Typography>
              </Grid>
              <Grid item align="center" xs={12}>
                <Paper
                  elevation={0}
                  className={`rounded ${classes.columnContainer}`}
                >
                  <TextField
                    label="Board name"
                    placeholder="Specify board name ..."
                    variant="filled"
                    fullWidth
                    required
                    className={classes.column}
                    onChange={onNameChange}
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
                    onClick={handleAddBoard}
                  >
                    + Add board
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
        open={isFailed || isTeamUndefined}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleCloseAlert}
          severity="error"
        >
          {isTeamUndefined ? (
            <>
              <p>Please select team!</p>
              <p>Click the team at the teams list</p>
            </>
          ) : (
            <>
              <p>Error during adding a team!</p>
              <p>Try to refresh page</p>
            </>
          )}
        </MuiAlert>
      </Snackbar>
    </>
  )
}

AddBoardModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
}

export default AddBoardModal
