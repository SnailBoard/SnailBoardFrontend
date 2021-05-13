import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetching: false,
  isFailed: false,
  isFulfilled: false,
  refresh: false,
  teams: {
    isFetching: false,
    isFailed: false,
    isFulfilled: false,
    data: [],
  },
}

export const isFulfilledSelector = (state) => state.home.isFulfilled
export const isFetchingSelector = (state) => state.home.isFetching
export const isFailedSelector = (state) => state.home.isFailed
export const refreshSelector = (state) => state.home.refresh

export const isTeamsFulfilledSelector = (state) => state.home.teams.isFulfilled
export const isTeamsFetchingSelector = (state) => state.home.teams.isFetching
export const isTeamsFailedSelector = (state) => state.home.teams.isFailed
export const teamsDataSelector = (state) => state.home.teams.data


export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setIsFulfilledFalse: (state) => {
      state.isFulfilled = false
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh
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
    getTeamsStarted: () => {},
    getTeamsPending: (state) => {
      state.teams.isFetching = true
    },
    getTeamsSuccess: (state, payload) => {
      state.teams.isFetching = false
      state.teams.isFulfilled = true
      state.teams.data = payload.payload
    },
    getTeamsFailed: (state) => {
      state.teams.isFailed = true
      state.teams.isFetching = false
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
  getTeamsStarted,
  getTeamsPending,
  getTeamsSuccess,
  getTeamsFailed,
  setRefresh,
} = homeSlice.actions

export default homeSlice.reducer
