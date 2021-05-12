import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetching: false,
  isFailed: false,
  isFulfilled: false,
}

export const isFulfilledSelector = (state) => state.home.isFulfilled
export const isFetchingSelector = (state) => state.home.isFetching
export const isFailedSelector = (state) => state.home.isFailed

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setIsFulfilledFalse: (state) => {
      state.isFulfilled = false
    },
    userClosedErrorAlert: (state) => {
      state.isFailed = false
    },
    addTeamStarted: () => {},
    addTeamPending: (state) => {
      state.isFetching = true
    },
    addTeamSuccess: (state) => {
      state.isFetching = false
      state.isFulfilled = true
    },
    addTeamFailed: (state) => {
      state.isFailed = true
      state.isFetching = false
    },
  },
})

export const {
  setIsFulfilledFalse,
  userClosedErrorAlert,
  addTeamStarted,
  addTeamPending,
  addTeamSuccess,
  addTeamFailed,
} = homeSlice.actions

export default homeSlice.reducer
