import { Button, Grid, Paper, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'
import { useStyles } from './styles'

const RenderAddButton = (props) => {
  const { btnName, setAddModalOpen } = props
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <Button
        className={`paperBtn rounded ${classes.paperBtn}`}
        onClick={() => setAddModalOpen(true)}
      >
        <Paper elevation={0} className={`rounded ${classes.cardPaper}`}>
          <Typography className={classes.addBtn} color="textSecondary">
            {btnName}
          </Typography>
        </Paper>
      </Button>
    </Grid>
  )
}

RenderAddButton.propTypes = {
  btnName: PropTypes.string.isRequired,
  setAddModalOpen: PropTypes.func.isRequired,
}

export default RenderAddButton
