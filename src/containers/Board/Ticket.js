import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  Avatar,
  Card as BaseCard,
  CardContent,
  Grid,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useStyles } from './styles'
import { ACCENT_COLOR } from '../../core/values/colors'

const Ticket = (props) => {
  const { ticket, index } = props
  const classes = useStyles()

  return (
    <Draggable draggableId={ticket.id} index={index}>
      {(provided) => (
        <BaseCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          style={{
            marginBottom: 6,
            backgroundColor: ACCENT_COLOR,
            ...provided.draggableProps.style,
          }}
        >
          <Grid container justify="flex-end">
            <Grid item xs direction="column">
              <CardContent className={classes.cardContent}>
                <Typography variant="body2" color="textPrimary" component="p">
                  #{ticket.number} {ticket.description}
                </Typography>
              </CardContent>
              <Avatar className={classes.cardStoryPoints}>
                <Typography variant="caption" color="initial" component="p">
                  {ticket.storyPoints}
                </Typography>
              </Avatar>
            </Grid>
            <Avatar
              className={classes.cardAvatar}
              src="http://i.pravatar.cc/300?img=1"
            />
          </Grid>
        </BaseCard>
      )}
    </Draggable>
  )
}

Ticket.propTypes = {
  ticket: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    storyPoints: PropTypes.number.isRequired,
  }),
  index: PropTypes.number.isRequired,
}

export default Ticket
