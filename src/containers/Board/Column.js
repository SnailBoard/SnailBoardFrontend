import React from 'react'
import { Paper, Typography } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Droppable } from 'react-beautiful-dnd'
import Card from './Card'
import { PRIMARY_COLOR } from '../../core/values/colors'

const Column = (props) => {
  const { column, tasks } = props

  return (
    <Paper
      style={{
        background: PRIMARY_COLOR,
        maxWidth: '200px',
        minWidth: '200px',
        minHeight: '200px',
        marginLeft: '2vh',
        marginRight: '2vh',
      }}
    >
      <Typography align="center" style={{ color: 'white' }} variant="h5">
        {column.title}
      </Typography>
      <Droppable droppableId={column.id}>
        {(provided) => (
          <Paper
            innerRef={provided.innerRef}
            {...provided.droppableProps}
            style={{
              margin: '7px',
              backgroundColor: PRIMARY_COLOR,
            }}
          >
            {tasks.map((task, index) => (
              <Card key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Paper>
        )}
      </Droppable>
    </Paper>
  )
}

Column.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      content: PropTypes.string.isRequired,
    }),
  ),
  column: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }),
}

export default Column
