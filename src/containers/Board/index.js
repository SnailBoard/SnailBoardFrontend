import React, { PureComponent, useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import PropTypes from 'prop-types'
import { GridList, InputBase, Paper } from '@material-ui/core'
import { useParams } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import Header from '../../components/Header/Header'
import { useStyles } from './styles'
import Column from './Column'
import {
  boardNameSelector,
  changeColumnOrderSuccess,
  changeTicketsOrderSuccess,
  columnOrderSelector,
  columnsSelector,
  getBoardDataStarted,
  ticketsSelector,
} from './boardSlice'
import { ACCENT2_COLOR, PRIMARY_COLOR } from '../../core/values/colors'
import { BoardContext } from './context'
import TicketModal from '../Modals/TicketModal'

class InnerList extends PureComponent {
  render() {
    const { column, ticketsMap, index } = this.props
    const tickets = column.tickets.map((ticketId) => ticketsMap[ticketId])
    return <Column column={column} tickets={tickets} index={index} />
  }
}

InnerList.propTypes = {
  ticketsMap: PropTypes.objectOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ).isRequired,
  column: PropTypes.shape({
    tickets: PropTypes.array.isRequired,
  }),
  index: PropTypes.number.isRequired,
}

const initTicketModalInputs = {
  reporter: 'Danya',
  assignee: 'Nazar',
  storyPoints: 5,
  name: '',
  description: '',
}

const Board = () => {
  const dispatch = useDispatch()

  const boardName = useSelector(boardNameSelector)
  const tickets = useSelector(ticketsSelector)
  const columns = useSelector(columnsSelector)
  const columnOrder = useSelector(columnOrderSelector)

  const [ticketModalOpen, setTicketModalOpen] = useState(false)
  const [ticketModalInputs, setTicketModalInputs] = useState(
    initTicketModalInputs,
  )

  const handleChange = (event) => {
    setTicketModalInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }))
  }

  const contextValues = {
    handleChange,
    ticketModalInputs,
    ticketModalOpen,
    setTicketModalOpen,
  }

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
        const newTaskIds = Array.from(home.tickets)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newHome = {
          ...home,
          tickets: newTaskIds,
        }

        const newColumnsData = {
          ...columns,
          [newHome.id]: newHome,
        }

        dispatch(changeTicketsOrderSuccess(newColumnsData))
        return
      }

      // moving from one list to another
      const homeTaskIds = Array.from(home.tickets)
      homeTaskIds.splice(source.index, 1)
      const newHome = {
        ...home,
        tickets: homeTaskIds,
      }

      const foreignTaskIds = Array.from(foreign.tickets)
      foreignTaskIds.splice(destination.index, 0, draggableId)
      const newForeign = {
        ...foreign,
        tickets: foreignTaskIds,
      }

      const newColumnsData = {
        ...columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      }
      dispatch(changeTicketsOrderSuccess(newColumnsData))
    }
  }

  const addNewColumn = (event) => {
    if (event.keyCode === 13) {
      const {
        target: { value },
      } = event
      console.log(value)
    }
  }

  const { boardId } = useParams()

  useEffect(() => {
    dispatch(getBoardDataStarted(boardId))
  }, [])

  const classes = useStyles()

  return (
    <BoardContext.Provider value={contextValues}>
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
                      ticketsMap={tickets}
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
                      onKeyDown={addNewColumn}
                    />
                  </Paper>
                </Paper>
              </GridList>
            )}
          </Droppable>
        </DragDropContext>
        <TicketModal />
      </div>
    </BoardContext.Provider>
  )
}

export default Board
