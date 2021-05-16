import React, { useState } from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Grid } from '@material-ui/core'
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
    'task-6': { id: 'task-6', content: 'Write esse' },
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

const Board = () => {
  const [boardData, setBoardData] = useState(initialData)

  const classes = useStyles()

  const onDragEnd = ({ destination, source, draggableId }) => {
    if (
      !destination ||
      (destination.droppableId === source.droppableId &&
        destination.index === source.index)
    ) {
      return
    }

    const start = boardData.columns[source.droppableId]
    const finish = boardData.columns[destination.droppableId]

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds)
      newTaskIds.splice(source.index, 1)
      newTaskIds.splice(destination.index, 0, draggableId)

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      }

      const newBoardData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newColumn.id]: newColumn,
        },
      }

      setBoardData(newBoardData)
    } else {
      // Moving from one list to another
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }

      const newBoardData = {
        ...boardData,
        columns: {
          ...boardData.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      }
      setBoardData(newBoardData)
    }
  }

  return (
    <div className={classes.background}>
      <Header boardName="development" />

      <Grid container justify="flex-start" className={classes.boardContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {boardData.columnOrder.map((columnId) => {
            const column = boardData.columns[columnId]
            const tasks = column.taskIds.map(
              (taskId) => boardData.tasks[taskId],
            )
            return <Column key={column.id} column={column} tasks={tasks} />
          })}
        </DragDropContext>
      </Grid>
    </div>
  )
}

export default Board
