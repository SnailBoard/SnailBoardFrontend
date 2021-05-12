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
import { useStyles } from './styles'
import AddTeamModal from '../Modals/AddTeamModal'
import AddBoardModal from '../Modals/AddBoardModal'

export const CARD_TYPES = { BOARD: 'BOARD', TEAM: 'TEAM' }

const SBCard = (props) => {
  const { itemsCount, itemsHeader, btnName, columnsData, cardType } = props
  const [addModalOpen, setAddModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(-1)
  const renderColumn = (data, index, isSelected) => (
    <Grid item xs={12} key={data.name}>
      <Button
        className={`paperBtn ${isSelected && 'selectedTeam'} rounded ${
          classes.paperBtn
        }`}
        onClick={() => setSelectedTeam(index)}
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
            {itemsCount}
          </Typography>
        </CardContent>
        <Grid
          container
          justify="flex-start"
          alignItems="center"
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
  itemsCount: PropTypes.string.isRequired,
  itemsHeader: PropTypes.string.isRequired,
  btnName: PropTypes.string.isRequired,
  columnsData: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      membersCount: PropTypes.string.isRequired,
    }),
  ),
}

export default SBCard
