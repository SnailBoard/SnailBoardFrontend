import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isAuthorized: false,
  isFetching: false,
  isFailed: false,
  data: {},
}

export const isAuthorizedSelector = (state) => state.auth.isAuthorized
export const isFetchingSelector = (state) => state.auth.isFetching
export const isFailedSelector = (state) => state.auth.isFailed
export const dataSelector = (state) => state.auth.data

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStarted: () => {},
    registerPending: (state) => {
      state.isFetching = true
    },
    registerSuccess: (state) => {
      state.isFetching = false
    },
    loginStarted: () => {},
    loginPending: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state) => {
      state.isFetching = false
      state.isAuthorized = true
    },
    loginFailed: (state) => {
      state.isFetching = false
      state.isAuthorized = false
      state.isFailed = true
    },
    userStarted: () => {},
    userPending: (state) => {
      state.isFetching = true
    },
    userSuccess: (state, payload) => {
      state.data = { ...payload.payload }
      state.isFetching = false
      state.isAuthorized = true
    },
    userFailed: (state) => {
      state.isFetching = false
      state.isAuthorized = false
      state.isFailed = true
    },
    refreshStarted: () => {},
    refreshPending: (state) => {
      state.isFetching = true
    },
    refreshSuccess: (state) => {
      state.isFetching = false
      state.isAuthorized = true
    },
    refreshFailed: (state) => {
      state.isFetching = false
      state.isAuthorized = false
      state.isFailed = true
    },

    userClosedErrorAlert: (state) => {
      state.isFailed = false
    },
    logoutStarted: () => {},
    logoutSuccess: (state) => {
      state.isAuthorized = false
    },
  },
})

export const {
  registerStarted,
  registerPending,
  registerSuccess,
  loginStarted,
  loginPending,
  loginSuccess,
  loginFailed,
  userStarted,
  userPending,
  userClosedErrorAlert,
  logoutStarted,
  logoutSuccess,
  userSuccess,
  userFailed,
  refreshStarted,
  refreshPending,
  refreshSuccess,
  refreshFailed,
} = authSlice.actions

export default authSlice.reducer
