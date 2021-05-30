import React, { PureComponent } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { GridList, InputBase, Paper } from '@material-ui/core'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import { useStyles } from './styles'
import Column from './Column'
import {
  changeColumnOrderSuccess,
  changeColumnsSuccess,
  columnOrderSelector,
  columnsSelector,
  tasksSelector,
} from './boardSlice'
import { ACCENT2_COLOR, PRIMARY_COLOR } from '../../core/values/colors'

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
  const dispatch = useDispatch()

  const tasks = useSelector(tasksSelector)
  const columns = useSelector(columnsSelector)
  const columnOrder = useSelector(columnOrderSelector)

  const { boardName } = useParams()

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
      const newColumnOrder = Array.from(columnOrder)
      newColumnOrder.splice(source.index, 1)
      newColumnOrder.splice(destination.index, 0, draggableId)

      dispatch(changeColumnOrderSuccess(newColumnOrder))
    } else {
      const home = columns[source.droppableId]
      const foreign = columns[destination.droppableId]

      if (home === foreign) {
        const newTaskIds = Array.from(home.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newHome = {
          ...home,
          taskIds: newTaskIds,
        }

        const newColumnsData = {
          ...columns,
          [newHome.id]: newHome,
        }

        dispatch(changeColumnsSuccess(newColumnsData))
        return
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

      const newColumnsData = {
        ...columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      }
      dispatch(changeColumnsSuccess(newColumnsData))
    }
  }

  const addNewColumn = (event) => {
    const {
      target: { value },
    } = event
    console.log(value)
  }

  return (
    <div className={classes.background}>
      <Header boardName={boardName} />

      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <GridList
              {...provided.droppableProps}
              innerRef={provided.innerRef}
              container
              className={classes.boardContainer}
            >
              {columnOrder.map((columnId, index) => {
                const column = columns[columnId]
                return (
                  <InnerList
                    key={column.id}
                    column={column}
                    index={index}
                    taskMap={tasks}
                  />
                )
              })}
              {provided.placeholder}
              <Paper
                style={{
                  background: PRIMARY_COLOR,
                  maxWidth: '210px',
                  minWidth: '210px',
                  height: '45px',
                  marginLeft: '2vh',
                  marginRight: '2vh',
                }}
              >
                <Paper
                  style={{
                    background: ACCENT2_COLOR,
                    margin: '1vh',
                    textAlign: 'center',
                  }}
                >
                  <InputBase
                    className={classes.input}
                    placeholder="+ Add new column"
                    inputProps={{ className: classes.inputTextColor }}
                    onChange={addNewColumn}
                  />
                </Paper>
              </Paper>
            </GridList>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default Board
