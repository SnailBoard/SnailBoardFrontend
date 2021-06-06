import React, { useContext } from 'react'

import { Grid, makeStyles, Modal, Paper } from '@material-ui/core'
import { ACCENT_COLOR, TEXT_DIMMED_COLOR } from '../../../core/values/colors'
import { BoardContext } from '../../Board/context'
import LeftColumn from './LeftColumn'
import RightColumn from './RightColumn'

export const useStyles = makeStyles((theme) => ({
  ticketModal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    padding: 20,
    background: ACCENT_COLOR,
  },
  header: {
    color: TEXT_DIMMED_COLOR,
    margin: '20px 0px',
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: '#fff',
  },
  modalGrid: {
    width: '600px',
  },
}))

const TicketModal = () => {
  const { ticketModalOpen, setTicketModalOpen } = useContext(BoardContext)

  const handleClose = () => {
    setTicketModalOpen(false)
  }

  const classes = useStyles()
  return (
    <>
      <Modal
        open={ticketModalOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        className={classes.ticketModal}
      >
        <Paper elevation={10} className={classes.paper}>
          <Grid
            container
            direction="row"
            className={classes.modalGrid}
            spacing={1}
          >
            <Grid item xs={8}>
              <LeftColumn />
            </Grid>
            <Grid item xs={4}>
              <RightColumn />
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </>
  )
}

TicketModal.propTypes = {}

export default TicketModal
