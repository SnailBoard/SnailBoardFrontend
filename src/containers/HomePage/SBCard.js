import React from 'react'
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

const SBCard = (props) => {
  // const user = useSelector(userSelector)

  const { itemsCount, itemsHeader, btnName, columnsData } = props

  const renderColumn = (data) => (
    <Grid item xs={12} spacing={1}>
      <Button className={`paperBtn ${classes.paperBtn}`}>
        <Paper elevation={0} className={classes.cardPaper}>
          <Typography
            variant="h5"
            component="h2"
            className={classes.headerColumn}
          >
            {data.name}
          </Typography>
          <Typography color="textSecondary" className={classes.itemCountColumn}>
            {data.membersCount}
          </Typography>
        </Paper>
      </Button>
    </Grid>
  )

  const renderAddBtn = (name) => (
    <Grid item xs={12} spacing={1}>
      <Button className={`paperBtn ${classes.paperBtn}`}>
        <Paper elevation={0} className={classes.cardPaper}>
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
      <Card className={classes.card} variant="outlined">
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
          {columnsData.map((board) => renderColumn(board))}
          {renderAddBtn(btnName)}
        </Grid>
      </Card>
    </>
  )
}

SBCard.propTypes = {
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
