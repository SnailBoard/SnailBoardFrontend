import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  tickets: {
    'b4a382a4-0823-4ef2-bd2e-694ca4abcc3c': {
      name: 'test',
      description: 'test',
      reporter: {
        firstName: 'Pavel',
        email: 'pawloiwanov@gmail.com',
        username: 'pavelItel',
        id: '1f0822c4-fa90-4a34-85d3-8e4f5befd13d',
      },
      assignee: {
        firstName: 'Pavel',
        email: 'pawloiwanov@gmail.com',
        username: 'pavelItel',
        id: '1f0822c4-fa90-4a34-85d3-8e4f5befd13d',
      },
      id: 'b4a382a4-0823-4ef2-bd2e-694ca4abcc3c',
      position: 1,
      created_at: '2021-06-03T21:24:12',
      updated_at: '2021-06-03T21:24:12',
      storyPoints: 12,
      number: 1,
    },
    'b4a382b4-0823-4ef2-bd2e-694ca4abcc3c': {
      name: 'test',
      description: 'test',
      reporter: {
        firstName: 'Pavel',
        email: 'pawloiwanov@gmail.com',
        username: 'pavelItel',
        id: '1f0822c4-fa90-4a34-85d3-8e4f5befd13d',
      },
      assignee: {
        firstName: 'Pavel',
        email: 'pawloiwanov@gmail.com',
        username: 'pavelItel',
        id: '1f0822c4-fa90-4a34-85d3-8e4f5befd13d',
      },
      id: 'b4a382b4-0823-4ef2-bd2e-694ca4abcc3c',
      position: 1,
      created_at: '2021-06-03T21:24:12',
      updated_at: '2021-06-03T21:24:12',
      storyPoints: 12,
      number: 2,
    },
  },
  columns: {
    'column-1': {
      id: 'column-1',
      name: 'To do',
      description: 'test',
      position: 1,
      tickets: ['b4a382a4-0823-4ef2-bd2e-694ca4abcc3c'],
    },
    'column-2': {
      id: 'column-2',
      name: 'In progress',
      description: 'test',
      position: 2,
      tickets: ['b4a382b4-0823-4ef2-bd2e-694ca4abcc3c'],
    },
    'column-3': {
      id: 'column-3',
      name: 'Done',
      description: 'test',
      position: 3,
      tickets: [],
    },
  },
  name: 'test board name',
  columnOrder: ['column-1', 'column-2', 'column-3'],
  isFetching: false,
  isFailed: false,
}

export const ticketsSelector = (state) => state.board.tickets
export const boardNameSelector = (state) => state.board.name
export const ticketByIdSelector = (ticketId) => (state) =>
  state.board.tickets[ticketId]
export const columnsSelector = (state) => state.board.columns
export const columnOrderSelector = (state) => state.board.columnOrder
export const isFetchingSelector = (state) => state.board.isFetching
export const ticketsInColumnCountSelector = (columnId) => (state) =>
  state.board.columns[columnId].tickets.length

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    getBoardDataStarted: () => {},
    getBoardDataSuccess: (state, { payload: { name, columns } }) => {
      state.isFetching = false
      state.name = name
      state.columns = columns.reduce(
        (acc, column) => ({ ...acc, [column.id]: column }),
        {},
      )
      state.tickets = columns.tasks.reduce(
        (acc, ticket) => ({ ...acc, [ticket.id]: ticket }),
        {},
      )
      state.columnOrder = columns
        .map(({ id, position }) => ({
          id,
          position,
        }))
        .sort((prev, next) => prev.position - next.position)
        .map(({ id }) => id)
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
} = boardSlice.actions

export default boardSlice.reducer
