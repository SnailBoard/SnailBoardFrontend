import React, { useState, PureComponent } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import { Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import Header from '../../components/Header/Header'
import { useStyles } from './styles'
import Column from './Column'

const initialData = {
  tasks: {
    'task-1': { id: 'task-1', content: 'Take out the garbage' },
    'task-2': { id: 'task-2', content: 'Watch my favorite show' },
    'task-3': { id: 'task-3', content: 'Charge my phone' },
    'task-4': { id: 'task-4', content: 'Cook dinner' },
    'task-5': { id: 'task-5', content: 'Go shopping' },
    'task-6': { id: 'task-6', content: 'Write essay' },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      title: 'To do',
      taskIds: ['task-1', 'task-2', 'task-3', 'task-4'],
    },
    'column-2': {
      id: 'column-2',
      title: 'In progress',
      taskIds: ['task-5', 'task-6'],
    },
    'column-3': {
      id: 'column-3',
      title: 'Done',
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ['column-1', 'column-2', 'column-3'],
}

class InnerList extends PureComponent {
  render() {
    const { column, taskMap, index } = this.props
    const tasks = column.taskIds.map((taskId) => taskMap[taskId])
    return <Column column={column} tasks={tasks} index={index} />
  }
}

InnerList.propTypes = {
  taskMap: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }),
  column: PropTypes.shape({
    taskIds: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
}

const Board = () => {
  const [boardData, setBoardData] = useState(initialData)

  const classes = useStyles()

  const onDragEnd = ({ destination, source, draggableId, type }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return
    }

    if (type === 'column') {
      const newColumnOrder = Array.from(boardData.columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      const newBoardData = {
        ...boardData,
        columnOrder: newColumnOrder,
      }
      setBoardData(newBoardData)
    } else {
      const home = boardData.columns[source.droppableId]
      const foreign = boardData.columns[destination.droppableId]

      if (home === foreign) {
        const newTaskIds = Array.from(home.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newHome = {
          ...home,
          taskIds: newTaskIds,
        }

        const newBoardData = {
          ...boardData,
          columns: {
            ...boardData.columns,
            [newHome.id]: newHome,
          },
        }

        setBoardData(newBoardData)
      }

      // moving from one list to another
      const homeTaskIds = Array.from(home.taskIds)
      homeTaskIds.splice(source.index, 1)
      const newHome = {
        ...home,
        taskIds: homeTaskIds,
      }

      const foreignTaskIds = Array.from(foreign.taskIds)
      foreignTaskIds.splice(destination.index, 0, draggableId)
      const newForeign = {
        ...foreign,
        taskIds: foreignTaskIds,
      }

      const newBoardData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newHome.id]: newHome,
          [newForeign.id]: newForeign,
        },
      }
      setBoardData(newBoardData)
    }
  }

  return (
    <div className={classes.background}>
      <Header boardName="development" />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <Grid
              {...provided.droppableProps}
              innerRef={provided.innerRef}
              container
              justify="flex-start"
              alignContent="flex-start"
              className={classes.boardContainer}
            >
              {boardData.columnOrder.map((columnId, index) => {
                const column = boardData.columns[columnId]
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    index={index}
                    taskMap={boardData.tasks}
                  />
                )
              })}
              {provided.placeholder}
            </Grid>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Board
