import { createSlice } from '@reduxjs/toolkit'
import { saveState } from '../../core/utils/localStorage'

const initialState = {
  isAuthorized: false,
  isFetching: false,
}

export const isAuthorizedSelector = (state) => state.auth.isAuthorized
export const isFetchingSelector = (state) => state.auth.isFetching

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logoutSuccess: (state) => {
      saveState('accessToken', '')
      saveState('refreshToken', '')
      state.isAuthorized = false
    },
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
  },
})

export const {
  loginStarted,
  loginPending,
  loginSuccess,
  logoutSuccess,
  registerStarted,
  registerPending,
  registerSuccess,
} = authSlice.actions

export default authSlice.reducer
