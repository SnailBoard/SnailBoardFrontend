import React, { useState } from 'react'
import { Card, CardContent, Grid, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useStyles } from './styles'
import AddTeamModal from '../../Modals/AddTeamModal'
import AddBoardModal from '../../Modals/AddBoardModal'
import RenderColumn from './RenderColumn'
import RenderAddButton from './RenderAddButton'
import { CARD_TYPES } from './cardTypes'

const SBCard = (props) => {
  const { itemsCount, itemsHeader, btnName, columnsData, cardType } = props

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(-1)

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
          alignItems="stretch"
          className={classes.cardColumn}
          spacing={1}
        >
          {columnsData.map((data, index) => {
            const isSelected =
              cardType === CARD_TYPES.TEAM && selectedTeam === index
            return RenderColumn({
              data,
              index,
              isSelected,
              setSelectedTeam,
            })
          })}
          {RenderAddButton({ btnName, setIsModalOpen })}
        </Grid>
      </Card>
      {cardType === CARD_TYPES.TEAM ? (
        <AddTeamModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      ) : (
        <AddBoardModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
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
