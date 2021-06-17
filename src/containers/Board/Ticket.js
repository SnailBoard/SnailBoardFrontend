import React, { useEffect } from 'react'
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

  useEffect(() => {
    console.log(ticket)
  })

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
                  #{ticket.ticket_number} {ticket.description}
                </Typography>
              </CardContent>
              <Avatar className={classes.cardStoryPoints}>
                <Typography variant="caption" color="initial" component="p">
                  {ticket.story_points}
                </Typography>
              </Avatar>
            </Grid>
            <Avatar
              className={classes.cardAvatar}
              src={`http://127.0.0.1:8081/${ticket.assignee.image}.jpg`}
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
    ticket_number: PropTypes.number.isRequired,
    story_points: PropTypes.number.isRequired,
    assignee: PropTypes.object,
  }),
  index: PropTypes.number.isRequired,
}

export default Ticket
