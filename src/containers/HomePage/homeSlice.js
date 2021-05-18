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
    users: [],
    isUsersFetching: false,
    isUserFetchingFailed: false,
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
export const usersSelector = (state) => state.home.teams.users
export const usersLoadingSelector = (state) => state.home.teams.isUsersFetching

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
    getUsersStarted: () => {},
    getUsersPending: (state) => {
      state.teams.isUsersFetching = true
    },
    getUsersSuccess: (state, payload) => {
      state.teams.users = payload.payload
    },
    getUsersFailed: (state) => {
      state.teams.isUsersFetching = false
      state.teams.isUserFetchingFailed = true
    },
    inviteUserToTeam: () => {},
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
  getUsersPending,
  getUsersStarted,
  getUsersSuccess,
  getUsersFailed,
  inviteUserToTeam,
} = homeSlice.actions

export default homeSlice.reducer
