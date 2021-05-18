import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useStyles } from './styles'
import AddTeamModal from '../Modals/AddTeamModal'
import AddBoardModal from '../Modals/AddBoardModal'
import AddUserToTeamModal from '../Modals/AddUserToTeamModal'
import { getBoardsStarted, setSelectedTeam } from './homeSlice'

export const CARD_TYPES = { BOARD: 'BOARD', TEAM: 'TEAM' }

const SBCard = (props) => {
  const { itemsHeader, btnName, rowDataSelector, cardType } = props
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(-1)

  const selectorData = useSelector(rowDataSelector)

  let rawData
  if (cardType === CARD_TYPES.TEAM) {
    rawData = selectorData
  } else {
    rawData = selectorData.boards
  }

  const columnsData = rawData.slice(0, 4)

  const dispatch = useDispatch()

  useEffect(() => {
    if (columnsData) {
      dispatch(setSelectedTeam(columnsData[selectedTeamIndex]))
      const selectedTeam = columnsData[selectedTeamIndex]
      if (selectedTeam) {
        dispatch(getBoardsStarted(selectedTeam.id))
      }
    }
  }, [selectedTeamIndex])

  const history = useHistory()

  const rowsCount = () => {
    const count = rawData.length

    const label = cardType === CARD_TYPES.TEAM ? 'team' : 'board'
    return count === 1 ? `${count} ${label}` : `${count} ${label}s`
  }

  const handleCloneAddUserModal = () => {
    setAddUserModalOpen(false)
  }

  const membersCount = (row) => {
    let count
    if (cardType === CARD_TYPES.TEAM) {
      count = row.memberCount
    } else {
      count = selectorData.memberCount
    }
    return count === 1 ? `${count} member` : `${count} members`
  }

  const renderTeamsColumn = (data, index, isSelected) => (
    <>
      <Grid item xs={isSelected ? 8 : 12} key={`${index} ${cardType}`}>
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
              {membersCount(data)}
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

  const renderBoardsColumn = (data, index) => (
    <>
      <Grid item xs={12} key={`${index} ${cardType}`}>
        <Button
          className={`paperBtn rounded ${classes.paperBtn}`}
          onClick={() => {
            history.push('/board')
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
              {membersCount(data)}
            </Typography>
          </Paper>
        </Button>
      </Grid>
    </>
  )

  const renderAddBtn = (name) => (
    <Grid item xs={12}>
      <Button
        className={`paperBtn rounded ${classes.paperBtn}`}
        onClick={() => setAddModalOpen(true)}
      >
        <Paper elevation={0} className={`rounded ${classes.cardPaper}`}>
          <Typography className={classes.addBtn} color="textSecondary">
            {name}
          </Typography>
        </Paper>
      </Button>
    </Grid>
  )

  const classes = useStyles()
  return (
    <>
      <Card className={`rounded ${classes.card}`} variant="outlined">
        <CardContent>
          <Typography variant="h5" component="h2" className={classes.header}>
            {itemsHeader}
          </Typography>
          <Typography className={classes.pos} color="textSecondary">
            {rowsCount()}
          </Typography>
        </CardContent>
        <Grid
          container
          justify="flex-start"
          alignItems="stretch"
          className={classes.cardColumn}
          spacing={1}
        >
          {columnsData.map((data, index) => {
            if (cardType === CARD_TYPES.TEAM) {
              const isSelected = selectedTeamIndex === index
              return renderTeamsColumn(data, index, isSelected)
            }
            return renderBoardsColumn(data, index)
          })}
          {renderAddBtn(btnName)}
        </Grid>
      </Card>
      {cardType === CARD_TYPES.TEAM ? (
        <AddTeamModal
          isModalOpen={addModalOpen}
          setIsModalOpen={setAddModalOpen}
        />
      ) : (
        <AddBoardModal
          isModalOpen={addModalOpen}
          setIsModalOpen={setAddModalOpen}
        />
      )}
      <AddUserToTeamModal
        isOpenModal={addUserModalOpen}
        handleClose={handleCloneAddUserModal}
      />
    </>
  )
}

SBCard.propTypes = {
  cardType: PropTypes.string.isRequired,
  itemsHeader: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  rowDataSelector: PropTypes.func.isRequired,
}

export default SBCard
