import { createSlice } from '@reduxjs/toolkit'
import { saveState } from '../../core/utils/localStorage'

const initialState = {
  isAuthorized: false,
  isFetching: false,
  isFailed: false,
}

export const isAuthorizedSelector = (state) => state.auth.isAuthorized
export const isFetchingSelector = (state) => state.auth.isFetching
export const isFailedSelector = (state) => state.auth.isFailed

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerStarted: () => {},
    registerPending: (state) => {
      state.isFetching = true
    },
    registerSuccess: (state) => {
      console.log('Success registration request')
      state.isFetching = false
    },
    loginStarted: () => {},
    loginPending: (state) => {
      state.isFetching = true
    },
    loginSuccess: (state, { payload: { accessToken, refreshToken } }) => {
      console.log('Success login request')
      saveState('accessToken', accessToken)
      saveState('refreshToken', refreshToken)

      state.isFetching = false
      state.isAuthorized = true
    },
    loginFailed: (state) => {
      console.log('Failed login request')
      state.isFetching = false
      state.isAuthorized = false
      state.isFailed = true
    },
    userClosedErrorAlert: (state) => {
      state.isFailed = false
    },
    logoutSuccess: (state) => {
      saveState('accessToken', '')
      saveState('refreshToken', '')
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
  userClosedErrorAlert,
  logoutSuccess,
} = authSlice.actions

export default authSlice.reducer
