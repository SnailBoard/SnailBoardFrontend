import { Button, Grid, Paper, Typography } from '@material-ui/core'
import React from 'react'
import { CARD_TYPES } from './cardTypes'

const membersCount = (data, cardType, memberCount) => {
  let count
  if (cardType === CARD_TYPES.TEAM) {
    count = data.memberCount
  } else {
    count = memberCount
  }
  return count === 1 ? `${count} member` : `${count} members`
}

export const RenderTeamsColumn = (
  data,
  index,
  isSelected,
  setSelectedTeamIndex,
  setAddUserModalOpen,
  classes,
) => (
  <>
    <Grid item xs={isSelected ? 8 : 12} key={`${index} ${CARD_TYPES.TEAM}`}>
      <Button
        className={`paperBtn ${isSelected && 'selectedTeam'} rounded ${
          classes.paperBtn
        }`}
        onClick={() => setSelectedTeamIndex(index)}
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
            {membersCount(data, CARD_TYPES.TEAM)}
          </Typography>
        </Paper>
      </Button>
    </Grid>
    {isSelected && (
      <Grid item xs={4} key={data.name}>
        <Button
          className={`rounded addMemberBtn ${classes.addMemberBtn}`}
          onClick={() => setAddUserModalOpen(true)}
        >
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

export const RenderBoardsColumn = (
  data,
  memberCount,
  index,
  classes,
  history,
) => (
  <>
    <Grid item xs={12} key={`${index} ${CARD_TYPES.BOARD}`}>
      <Button
        className={`paperBtn rounded ${classes.paperBtn}`}
        onClick={() => {
          history.push(`board/${data.id}`)
        }}
      >
        <Paper elevation={0} className={`rounded ${classes.cardPaper}`}>
          <Typography
            variant="h5"
            component="h2"
            className={`rounded ${classes.headerColumn}`}
          >
            {data.name}
          </Typography>
          <Typography
            color="textSecondary"
            className={`rounded ${classes.itemCountColumn}`}
          >
            {membersCount(data, CARD_TYPES.BOARD, memberCount)}
          </Typography>
        </Paper>
      </Button>
    </Grid>
  </>
)
