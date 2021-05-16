import React, { useState } from 'react'
import {
  Button,
  Card,
  CardContent,
  Grid,
  Paper,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useStyles } from './styles'
import AddTeamModal from '../Modals/AddTeamModal'
import AddBoardModal from '../Modals/AddBoardModal'

export const CARD_TYPES = { BOARD: 'BOARD', TEAM: 'TEAM' }

const SBCard = (props) => {
  const { itemsHeader, btnName, rowDataSelector, cardType } = props
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(-1)

  const rawRowData = useSelector(rowDataSelector)
  const columnsData = rawRowData.slice(0, 4)

  const rowsCount = () => {
    const count = rawRowData.length
    const label = cardType === CARD_TYPES.TEAM ? 'team' : 'board'
    return count === 1 ? `${count} ${label}` : `${count} ${label}s`
  }

  const membersCount = (row) => {
    const count = row.memberCount
    return count === 1 ? `${count} member` : `${count} members`
  }

  const renderColumn = (data, index, isSelected) => (
    <>
      <Grid item xs={isSelected ? 8 : 12} key={`${index} ${cardType}`}>
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
              {membersCount(data)}
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
            const isSelected =
              cardType === CARD_TYPES.TEAM && selectedTeam === index
            return renderColumn(data, index, isSelected)
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
