import { Button, Grid, Paper, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import React from 'react'

import { useStyles } from './styles'

const RenderColumn = (props) => {
  const { data, index, isSelected, setSelectedTeam } = props

  const classes = useStyles()

  return (
    <>
      <Grid item xs={isSelected ? 8 : 12} key={data.name}>
        <Button
          className={`paperBtn ${isSelected && 'selectedTeam'} rounded ${
            classes.paperBtn
          }`}
          onClick={() => setSelectedTeam(index)}
          disabled={isSelected}
        >
          <Paper
            elevation={0}
            className={`rounded ${isSelected && 'selectedTeam'} ${
              classes.cardPaper
            }`}
          >
            <Typography
              variant="h5"
              component="h2"
              className={`rounded ${isSelected && 'selectedTeam'} ${
                classes.headerColumn
              }`}
            >
              {data.name}
            </Typography>
            <Typography
              color="textSecondary"
              className={`rounded ${isSelected && 'selectedTeam'} ${
                classes.itemCountColumn
              }`}
            >
              {data.membersCount}
            </Typography>
          </Paper>
        </Button>
      </Grid>
      {isSelected && (
        <Grid item xs={4} key={data.name}>
          <Button className={`rounded addMemberBtn ${classes.addMemberBtn}`}>
            <Typography
              color="textSecondary"
              className={`rounded ${classes.addMemberLabel}`}
            >
              + member
            </Typography>
          </Button>
        </Grid>
      )}
    </>
  )
}

RenderColumn.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      membersCount: PropTypes.string.isRequired,
    }),
  ),
  index: PropTypes.number.isRequired,
  isSelected: PropTypes.bool.isRequired,
  setSelectedTeam: PropTypes.func.isRequired,
}

export default RenderColumn
