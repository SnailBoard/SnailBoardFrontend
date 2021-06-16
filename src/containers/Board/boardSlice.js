import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: {},
  columns: {},
  name: 'test board name',
  columnOrder: [],
  isFetching: false,
  isFailed: false,
  members: [],
}

export const ticketsSelector = (state) => state.board.tasks
export const boardNameSelector = (state) => state.board.name
export const ticketByIdSelector = (ticketId) => (state) =>
  state.board.tasks[ticketId]
export const columnsSelector = (state) => state.board.columns
export const columnOrderSelector = (state) => state.board.columnOrder
export const membersSelector = (state) => state.board.members
export const isFetchingSelector = (state) => state.board.isFetching
export const ticketsInColumnCountSelector = (columnId) => (state) =>
  state.board.columns[columnId].tasks.length

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoardDataStarted: (state) => {
      state.columnOrder = []
    },
    getBoardDataSuccess: (state, { payload: { name, columns, members } }) => {
      state.isFetching = false
      state.name = name
      state.members = members

      state.columns = columns.reduce(
        (acc, column) => ({ ...acc, [column.id]: column }),
        {},
      )

      const columnsTasks = columns.reduce(
        (acc, column) => [...acc, ...column.tasks],
        [],
      )

      state.tasks = columnsTasks.reduce(
        (acc, ticket) => ({ ...acc, [ticket.id]: ticket }),
        {},
      )
      state.columnOrder = columns.map(({ id, position }) => ({
        id,
        position,
      }))
      state.columnOrder.sort((prev, next) => prev.position - next.position)
      state.columnOrder = state.columnOrder.map(({ id }) => id)
    },
    getBoardDataFailed: (state) => {
      state.isFetching = false
      state.isFailed = true
    },
    getBoardDataPending: (state) => {
      state.isFetching = true
    },
    changeTicketsOrderStarted: () => {},
    changeTicketsOrderPending: (state) => {
      state.isFetching = true
    },
    changeTicketsOrderSuccess: (state, { payload }) => {
      state.columns = payload
      state.isFetching = false
    },
    changeColumnOrderStarted: () => {},
    changeColumnOrderPending: (state) => {
      state.isFetching = true
    },
    changeColumnOrderSuccess: (state, { payload }) => {
      state.columnOrder = payload
      state.isFetching = false
    },
    addColumnStarted: () => {},
    addColumnPending: (state) => {
      state.isFetching = true
    },
    addColumnSuccess: (
      state,
      { payload: { name, description, id, position } },
    ) => {
      state.isFetching = false

      state.columns[id] = {
        id,
        name,
        description,
        position,
        tasks: [],
      }
      state.columnOrder.push(id)
    },
    addColumnFailed: (state) => {
      state.isFetching = false
      state.isFailed = true
    },
    addTicketStarted: () => {},
    addTicketPending: (state) => {
      state.isFetching = true
    },
    addTicketSuccess: (
      state,
      payload,
      // {
      //   payload: {
      //     name,
      //     description,
      //     reporter,
      //     assignee,
      //     id,
      //     position,
      //     created_at,
      //     updated_at,
      //     story_points,
      //     ticket_number,
      //     columnId,
      //   },
      // },
    ) => {
      console.log('Response ticket', payload)
      state.isFetching = false

      // state.column[columnId].tasks.push(id)
      // state.tickets[id] = {
      //   id,
      //   name,
      //   description,
      //   position,
      //   tasks: [],
      // }
      // state.columnOrder.push(id)
    },
    addTicketFailed: (state) => {
      state.isFetching = false
      state.isFailed = true
    },
  },
})

export const {
  getBoardDataPending,
  getBoardDataStarted,
  getBoardDataSuccess,
  getBoardDataFailed,
  changeTicketsOrderStarted,
  changeTicketsOrderPending,
  changeTicketsOrderSuccess,
  changeColumnOrderPending,
  changeColumnOrderStarted,
  changeColumnOrderSuccess,
  addColumnSuccess,
  addColumnStarted,
  addColumnPending,
  addColumnFailed,
} = boardSlice.actions

export default boardSlice.reducer
