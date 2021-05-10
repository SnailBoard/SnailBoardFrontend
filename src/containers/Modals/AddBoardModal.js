import React from 'react'

import {
  Grid,
  Modal,
  Paper,
  makeStyles,
  Typography,
  TextField,
  TextareaAutosize,
  Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { ACCENT_COLOR, TEXT_DIMMED_COLOR } from '../../core/values/colors'

export const useStyles = makeStyles(() => ({
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
}))

const AddBoardModal = (props) => {
  const { isModalOpen, setIsModalOpen } = props

  const handleClose = () => {
    setIsModalOpen(false)
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
                  >
                    + Add board
                  </Button>
                </Paper>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  )
}

AddBoardModal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  setIsModalOpen: PropTypes.func.isRequired,
}

export default AddBoardModal
