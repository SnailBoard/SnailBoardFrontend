import React, { useContext } from 'react'
import {
  Paper,
  Typography,
  makeStyles,
  Grid,
  FormControl,
  Select,
  withStyles,
  InputBase,
  MenuItem,
} from '@material-ui/core'

import { ACCENT2_COLOR, ACCENT4_COLOR } from '../../../core/values/colors'
import { BoardContext } from '../../Board/context'

export const useStyles = makeStyles(() => ({
  label: {
    textAlign: 'left',
    padding: '10px 20px',
    background: ACCENT4_COLOR,
  },
  rightPaper: {
    height: '100%',
    background: ACCENT2_COLOR,
  },
  rightContainer: {
    padding: '5px 0px 15px 0px',
  },
  labelContainer: {
    margin: '0px 10px',
    background: ACCENT4_COLOR,
  },
  labelDescription: {
    margin: '0px 25px',
    fontSize: '15px',
  },
  formControl: {
    width: '100%',
  },
  timeLabel: {
    margin: '2px 12px',
  },
}))

const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 15,
    position: 'relative',
    backgroundColor: ACCENT4_COLOR,
    border: 'none',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
}))(InputBase)

const RightColumn = () => {
  const classes = useStyles()
  const { ticketModalInputs, handleChange, members } = useContext(BoardContext)

  const renderReporterForm = () => (
    <>
      <Typography color="textSecondary" className={classes.labelDescription}>
        Reporter
      </Typography>
      <Paper className={`rounded ${classes.labelContainer}`} elevation={0}>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            name="reporter"
            value={ticketModalInputs.reporter}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            {members.map((member) => (
              <MenuItem value={member.id}>{member.firstName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </>
  )

  const renderAssigneeForm = () => (
    <>
      <Typography color="textSecondary" className={classes.labelDescription}>
        Assignee
      </Typography>
      <Paper className={`rounded ${classes.labelContainer}`} elevation={0}>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            name="assignee"
            value={ticketModalInputs.assignee}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            {members.map((member) => (
              <MenuItem value={member.id}>{member.firstName}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Paper>
    </>
  )

  const renderStoryPointsForm = () => (
    <>
      <Typography color="textSecondary" className={classes.labelDescription}>
        Story points
      </Typography>
      <Paper className={`rounded ${classes.labelContainer}`} elevation={0}>
        <FormControl className={classes.formControl}>
          <Select
            labelId="demo-customized-select-label"
            id="demo-customized-select"
            name="storyPoints"
            value={ticketModalInputs.storyPoints}
            onChange={handleChange}
            input={<BootstrapInput />}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={3}>3</MenuItem>
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={8}>8</MenuItem>
            <MenuItem value={13}>13</MenuItem>
          </Select>
        </FormControl>
      </Paper>
    </>
  )

  const renderCreatedAt = () => (
    <>
      <Typography color="textSecondary" className={classes.labelDescription}>
        Created at
      </Typography>
      <Paper className={`rounded ${classes.labelContainer}`} elevation={0}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography className={classes.timeLabel} variant="body2">
            {new Date().toLocaleString()}
          </Typography>
        </Grid>
      </Paper>
    </>
  )

  const renderUpdatedAt = () => (
    <>
      <Typography color="textSecondary" className={classes.labelDescription}>
        Updated at
      </Typography>
      <Paper className={`rounded ${classes.labelContainer}`} elevation={0}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Typography className={classes.timeLabel} variant="body2">
            {new Date().toLocaleString()}
          </Typography>
        </Grid>
      </Paper>
    </>
  )

  return (
    <>
      <Paper className={`rounded ${classes.rightPaper}`} elevation={0}>
        <Grid
          container
          direction="row"
          className={classes.rightContainer}
          spacing={1}
        >
          <Grid item xs={12}>
            {renderReporterForm()}
          </Grid>
          <Grid item xs={12}>
            {renderAssigneeForm()}
          </Grid>
          <Grid item xs={12}>
            {renderStoryPointsForm()}
          </Grid>
          <Grid item xs={12}>
            {renderCreatedAt()}
          </Grid>
          <Grid item xs={12}>
            {renderUpdatedAt()}
          </Grid>
        </Grid>
      </Paper>
    </>
  )
}

RightColumn.propTypes = {}

export default RightColumn
