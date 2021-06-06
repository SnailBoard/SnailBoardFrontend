import { createSlice } from '@reduxjs/toolkit'

const initialState = {
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
  columnOrder: ['column-1', 'column-2', 'column-3'],
  isFetching: false,
}

export const tasksSelector = (state) => state.board.tasks
export const taskByIdSelector = (taskId) => (state) => state.board.tasks[taskId]
export const columnsSelector = (state) => state.board.columns
export const columnOrderSelector = (state) => state.board.columnOrder
export const isFetchingSelector = (state) => state.board.isFetching

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {
    changeTasksInColumnsStarted: () => {},
    changeTasksInColumnsPending: (state) => {
      state.isFetching = true
    },
    changeTasksInColumnsSuccess: (state, { payload }) => {
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
  changeTasksInColumnsPending,
  changeTasksInColumnsStarted,
  changeTasksInColumnsSuccess,
  changeColumnOrderPending,
  changeColumnOrderStarted,
  changeColumnOrderSuccess,
} = boardSlice.actions

export default boardSlice.reducer
