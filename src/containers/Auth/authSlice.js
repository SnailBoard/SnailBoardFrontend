import { createSlice } from '@reduxjs/toolkit'
import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '../../core/values/keys'
import { loadState } from '../../core/localStorage'

const initialState = {
  isAuthorized: !!loadState(ACCESS_TOKEN_KEY) && !!loadState(REFRESH_TOKEN_KEY),
  isFetching: false,
  isFulfilled: false,
  isFailed: false,
  isUploadingImage: false,
  uploadedImageId: '',
  user: {},
}

export const isAuthorizedSelector = (state) => state.auth.isAuthorized
export const isFetchingSelector = (state) => state.auth.isFetching
export const isFulfilledSelector = (state) => state.auth.isFulfilled
export const isFailedSelector = (state) => state.auth.isFailed
export const userSelector = (state) => state.auth.user
export const isUploadingImageSelector = (state) => state.auth.isUploadingImage
export const uploadedImageIdSelector = (state) => state.auth.uploadedImageId

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
    registerFailed: (state) => {
      state.isFetching = false
      state.isAuthorized = false
      state.isFailed = true
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
    userStarted: (state) => {
      state.isFulfilled = false
    },
    userPending: (state) => {
      state.isFetching = true
    },
    userSuccess: (state, payload) => {
      state.user = { ...payload.payload }
      state.isFetching = false
      state.isAuthorized = true
      state.isFulfilled = true
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
    uploadingImageStarted: () => {},
    uploadingImage: (state) => {
      state.isUploadingImage = true
    },
    uploadingImageSuccess: (state, payload) => {
      state.isUploadingImage = false
      state.uploadedImageId = payload.payload
    },
  },
})

export const {
  registerStarted,
  registerPending,
  registerSuccess,
  registerFailed,
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
  uploadingImage,
  uploadingImageSuccess,
  uploadingImageStarted,
} = authSlice.actions

export default authSlice.reducer
