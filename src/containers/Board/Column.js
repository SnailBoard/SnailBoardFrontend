import React, { PureComponent, useContext } from 'react'
import { InputBase, Paper, Typography, ButtonBase } from '@material-ui/core'
import PropTypes from 'prop-types'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import Ticket from './Ticket'
import { ACCENT2_COLOR, PRIMARY_COLOR } from '../../core/values/colors'
import { useStyles } from './styles'
import { BoardContext } from './context'

class InnerList extends PureComponent {
  render() {
    return this.props.tasks.map((task, index) => (
      <Ticket key={task.id} task={task} index={index} />
    ))
  }
}

InnerList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
}

const Column = (props) => {
  const { column, tasks, index } = props
  const { setTicketModalOpen } = useContext(BoardContext)
  const classes = useStyles()

  return (
    <Draggable draggableId={column.id} index={index}>
      {(providedDraggable) => (
        <Paper
          {...providedDraggable.draggableProps}
          innerRef={providedDraggable.innerRef}
          style={{
            background: PRIMARY_COLOR,
            maxWidth: '210px',
            minWidth: '210px',
            marginLeft: '2vh',
            marginRight: '2vh',
            position: 'relative',
            ...providedDraggable.draggableProps.style,
          }}
        >
          <Typography
            {...providedDraggable.dragHandleProps}
            align="center"
            style={{ color: 'white' }}
            variant="h5"
          >
            {column.title}
          </Typography>
          <Droppable droppableId={column.id} type="task">
            {(provided) => (
              <Paper
                innerRef={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  margin: '7px',
                  backgroundColor: PRIMARY_COLOR,
                  height: '80vh',
                  overflow: 'auto',
                }}
              >
                <InnerList tasks={tasks} />
                {provided.placeholder}
                <Paper
                  style={{
                    background: ACCENT2_COLOR,
                    textAlign: 'center',
                    position: 'sticky',
                    bottom: 0,
                  }}
                >
                  <ButtonBase>
                    <InputBase
                      className={classes.input}
                      placeholder="   + Add new card"
                      inputProps={{ className: classes.inputTextColor }}
                      disabled
                      onClick={() => setTicketModalOpen(true)}
                    />
                  </ButtonBase>
                </Paper>
              </Paper>
            )}
          </Droppable>
        </Paper>
      )}
    </Draggable>
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
  index: PropTypes.number.isRequired,
}

export default Column
