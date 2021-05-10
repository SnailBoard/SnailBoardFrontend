import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetching: false,
  isFailed: false,
}

// export const isAuthorizedSelector = (state) => state.auth.isAuthorized

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    addTeamStarted: () => {},
    addTeamPending: (state) => {
      state.isFetching = true
    },
    addTeamSuccess: (state) => {
      state.isFetching = false
    },
    addTeamFailed: (state) => {
      state.isFailed = true
    },
  },
})

export const {
  addTeamStarted,
  addTeamPending,
  addTeamSuccess,
  addTeamFailed,
} = homeSlice.actions

export default homeSlice.reducer
