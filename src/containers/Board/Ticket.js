import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import {
  Button,
  Card as BaseCard,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import SnailImage from '../../static/img/snailboard.png'

const Ticket = (props) => {
  const { task, index } = props

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <BaseCard
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          innerRef={provided.innerRef}
          style={{ marginBottom: '10px', ...provided.draggableProps.style }}
        >
          <CardMedia
            image={SnailImage}
            title="Contemplative Reptile"
            style={{ height: 120 }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h4">
              Lizard
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {task.content}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small" color="primary">
              Share
            </Button>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </BaseCard>
      )}
    </Draggable>
  )
}

Ticket.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
}

export default Ticket
