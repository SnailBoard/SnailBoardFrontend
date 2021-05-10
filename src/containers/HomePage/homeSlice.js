import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetching: false,
  isFailed: false,
  isFulfilled: false,
}

export const isFulfilledSelector = (state) => state.home.isFulfilled

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setIsFulfilledFalse: (state) => {
      state.isFulfilled = false
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
    },
  },
})

export const {
  setIsFulfilledFalse,
  addTeamStarted,
  addTeamPending,
  addTeamSuccess,
  addTeamFailed,
} = homeSlice.actions

export default homeSlice.reducer
