import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tasks: {},
  columns: {},
  name: 'test board name',
  columnOrder: [],
  isFetching: false,
  isFailed: false,
  members: [],
  addTicket: {
    isFulfilled: false,
    isFetching: false,
    isFailed: false,
  },
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

export const isAddTicketFetchingSelector = (state) =>
  state.board.addTicket.isFetching
export const isAddTicketFulfilledSelector = (state) =>
  state.board.addTicket.isFulfilled
export const isAddTicketFailedSelector = (state) =>
  state.board.addTicket.isFailed

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
        (acc, column) => ({
          ...acc,
          [column.id]: { ...column, tasks: column.tasks.map(({ id }) => id) },
        }),
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
      state.addTicket.isFetching = true
    },
    addTicketSuccess: (state, payload) => {
      const {
        name,
        description,
        reporter,
        assignee,
        id,
        position,
        // eslint-disable-next-line camelcase
        created_at,
        // eslint-disable-next-line camelcase
        updated_at,
        // eslint-disable-next-line camelcase
        story_points,
        // eslint-disable-next-line camelcase
        ticket_number,
      } = payload.payload.ticketInfo
      state.addTicket.isFetching = false
      state.addTicket.isFulfilled = true
      state.columns[payload.payload.columnId].tasks.push(id)
      state.tasks[id] = {
        id,
        name,
        description,
        reporter,
        assignee,
        position,
        created_at,
        updated_at,
        story_points,
        ticket_number,
      }
    },
    addTicketFailed: (state) => {
      state.addTicket.isFetching = false
      state.addTicket.isFulfilled = true
      state.addTicket.isFailed = true
    },
    setIsAddTicketFulfilledFalse: (state) => {
      state.addTicket.isFulfilled = false
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
  addTicketFailed,
  addTicketPending,
  addTicketStarted,
  addTicketSuccess,
  setIsAddTicketFulfilledFalse,
} = boardSlice.actions

export default boardSlice.reducer
