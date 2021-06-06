import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { useStyles } from '../styles'
import AddTeamModal from '../../Modals/AddTeamModal'
import AddBoardModal from '../../Modals/AddBoardModal'
import AddUserToTeamModal from '../../Modals/AddUserToTeamModal'
import {
  getBoardsStarted,
  isBoardsFetchingSelector,
  setSelectedTeam,
} from '../homeSlice'
import { CARD_TYPES } from './cardTypes'
import { RenderBoardsColumn, RenderTeamsColumn } from './renderColumns'

const PAGE_SIZE = 3

const SBCard = (props) => {
  const { itemsHeader, btnName, rowDataSelector, cardType } = props
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [addUserModalOpen, setAddUserModalOpen] = useState(false)
  const [selectedTeamIndex, setSelectedTeamIndex] = useState(-1)
  const [page, setPage] = useState(1)

  const selectorData = useSelector(rowDataSelector)
  const isBoardsFetching = useSelector(isBoardsFetchingSelector)
  const dispatch = useDispatch()
  const classes = useStyles()
  const history = useHistory()

  useEffect(() => {
    if (columnsData) {
      dispatch(setSelectedTeam(columnsData[selectedTeamIndex]))
      const selectedTeam = columnsData[selectedTeamIndex]
      if (selectedTeam) {
        dispatch(getBoardsStarted(selectedTeam.id))
      }
    }
  }, [selectedTeamIndex])

  let rawData
  if (cardType === CARD_TYPES.TEAM) {
    rawData = selectorData
  } else {
    rawData = selectorData.boards
  }

  const columnsData = rawData.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE)

  const rowsCount = () => {
    const count = rawData.length

    const label = cardType === CARD_TYPES.TEAM ? 'team' : 'board'
    return count === 1 ? `${count} ${label}` : `${count} ${label}s`
  }

  const handleCloneAddUserModal = () => {
    setAddUserModalOpen(false)
  }

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

  const changePage = (value) => {
    setPage(value)
    setSelectedTeamIndex(-1)
  }

  const renderPagination = () => (
    <>
      <Grid item xs={4}>
        <Button
          className={`paperBtn rounded ${classes.paperBtn}`}
          onClick={() => changePage(page - 1)}
          disabled={page === 1}
        >
          <Paper elevation={0} className={`rounded ${classes.cardPaper}`}>
            <Typography className={classes.addBtn} color="textSecondary">
              Prev
            </Typography>
          </Paper>
        </Button>
      </Grid>
      <Grid item xs={4}>
        <Paper elevation={0} className={`rounded ${classes.cardPaper}`}>
          <Typography className={classes.addBtn} color="textSecondary">
            {page} page
          </Typography>
        </Paper>
      </Grid>
      <Grid item xs={4}>
        <Button
          className={`paperBtn rounded ${classes.paperBtn}`}
          onClick={() => changePage(page + 1)}
          disabled={
            page ===
            Math.ceil(rawData.length / PAGE_SIZE || rawData.length === 0)
          }
        >
          <Paper elevation={0} className={`rounded ${classes.cardPaper}`}>
            <Typography className={classes.addBtn} color="textSecondary">
              Next
            </Typography>
          </Paper>
        </Button>
      </Grid>
    </>
  )

  const renderItemsGrid = () => (
    <Grid
      container
      justify="flex-start"
      alignItems="stretch"
      className={classes.cardColumn}
      spacing={1}
    >
      {renderPagination()}
      {columnsData.map((data, index) => {
        if (cardType === CARD_TYPES.TEAM) {
          const isSelected = selectedTeamIndex === index
          return RenderTeamsColumn(
            data,
            index,
            isSelected,
            setSelectedTeamIndex,
            setAddUserModalOpen,
            classes,
          )
        }
        const { memberCount } = selectorData
        return RenderBoardsColumn(data, memberCount, index, classes, history)
      })}
      {renderAddBtn(btnName)}
    </Grid>
  )

  const renderItemsGridLoader = () => (
    <CircularProgress color="inherit" className={classes.boardsLoader} />
  )

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
        {cardType === CARD_TYPES.BOARD && isBoardsFetching
          ? renderItemsGridLoader()
          : renderItemsGrid()}
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
