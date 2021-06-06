import React, { useContext } from 'react'
import {
  Paper,
  Typography,
  makeStyles,
  TextareaAutosize,
  Grid,
  Button,
  InputBase,
} from '@material-ui/core'

import FormatAlignRightIcon from '@material-ui/icons/FormatAlignRight'
import {
  ACCENT2_COLOR,
  ACCENT_COLOR,
  SUCCESS_COLOR,
} from '../../../core/values/colors'
import { BoardContext } from '../../Board/context'

export const useStyles = makeStyles(() => ({
  columnContainer: {
    background: ACCENT_COLOR,
  },
  description: {
    background: ACCENT2_COLOR,
    width: '95%',
    borderRadius: '10px',
    height: '10vh !important',
    font: 'inherit',
    padding: '10px',
    resize: 'none',
    border: 'none',
  },
  addTicketBtn: {
    borderRadius: '20px',
    marginTop: '120px',
  },
  btnLabel: {
    textAlign: 'center',
    background: ACCENT2_COLOR,
  },
}))

const LeftColumn = () => {
  const classes = useStyles()
  const { ticketModalInputs, handleChange } = useContext(BoardContext)

  return (
    <>
      <Grid container direction="column">
        <Grid item xs={12} style={{ textAlign: 'center' }}>
          <InputBase
            placeholder="Type ticket name"
            inputProps={{ 'aria-label': 'naked' }}
            className="ticketNameLabel"
            name="name"
            onChange={handleChange}
            value={ticketModalInputs.name}
          />
        </Grid>
        <Grid item xs={12}>
          <Grid container direction="row">
            <Grid item xs={1}>
              <FormatAlignRightIcon
                style={{ display: 'block', margin: 'auto' }}
              />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="body1" style={{ fontSize: '18px' }}>
                Description
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Paper elevation={0} className={`rounded ${classes.columnContainer}`}>
            <TextareaAutosize
              aria-label="empty textarea"
              placeholder="Add description ..."
              className={classes.description}
              name="description"
              onChange={handleChange}
              value={ticketModalInputs.description}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            className={`paperBtn rounded ${classes.addTicketBtn}`}
            style={{ background: SUCCESS_COLOR }}
          >
            <Paper
              className="paperBtn rounded"
              elevation={0}
              style={{ background: SUCCESS_COLOR }}
            >
              <Typography
                color="textSecondary"
                className={`rounded ${classes.btnLabel}`}
                style={{ background: SUCCESS_COLOR }}
              >
                Save
              </Typography>
            </Paper>
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

LeftColumn.propTypes = {}

export default LeftColumn
