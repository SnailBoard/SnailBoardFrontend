import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isFetching: false,
  isFailed: false,
  isFulfilled: false,
  refresh: false,
  addTeam: {
    isFetching: false,
    isFailed: false,
    isFulfilled: false,
  },
  addBoard: {
    isFetching: false,
    isFailed: false,
    isFulfilled: false,
  },
  teams: {
    isFetching: false,
    isFailed: false,
    isFulfilled: false,
    data: [],
    users: [],
    isUsersFetching: false,
    isUserFetchingFailed: false,
    uploadedImageId: '',
    isUploadingImage: false,
  },
  boards: {
    isFetching: false,
    isFailed: false,
    isFulfilled: false,
    uploadedImageId: '',
    isUploadingImage: false,
    data: {
      boards: [],
      memberCount: 0,
    },
  },
  selectedTeam: '',
}

export const isAddBoardFulfilledSelector = (state) =>
  state.home.addBoard.isFulfilled
export const isAddBoardFetchingSelector = (state) =>
  state.home.addBoard.isFetching
export const isAddBoardFailedSelector = (state) => state.home.addBoard.isFailed

export const isAddTeamFulfilledSelector = (state) =>
  state.home.addTeam.isFulfilled
export const isAddTeamFetchingSelector = (state) =>
  state.home.addTeam.isFetching
export const isAddTeamFailedSelector = (state) => state.home.addTeam.isFailed

export const refreshSelector = (state) => state.home.refresh

export const isTeamsFulfilledSelector = (state) => state.home.teams.isFulfilled
export const isTeamsFetchingSelector = (state) => state.home.teams.isFetching
export const isTeamsFailedSelector = (state) => state.home.teams.isFailed
export const teamsDataSelector = (state) => state.home.teams.data
export const usersSelector = (state) => state.home.teams.users
export const usersLoadingSelector = (state) => state.home.teams.isUsersFetching

export const isBoardsFulfilledSelector = (state) =>
  state.home.boards.isFulfilled
export const isBoardsFetchingSelector = (state) => state.home.boards.isFetching
export const isBoardsFailedSelector = (state) => state.home.boards.isFailed
export const boardsDataSelector = (state) => state.home.boards.data

export const selectedTeamSelector = (state) => state.home.selectedTeam
export const isUploadingTeamImageSelector = (state) =>
  state.home.teams.isUploadingImage
export const isUploadingBoardImageSelector = (state) =>
  state.home.boards.isUploadingImage
export const uploadedTeamImageIdSelector = (state) =>
  state.home.teams.uploadedImageId
export const uploadedBoardImageIdSelector = (state) =>
  state.home.boards.uploadedImageId

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    setIsAddTeamFulfilledFalse: (state) => {
      state.addTeam.isFulfilled = false
    },
    setIsAddBoardFulfilledFalse: (state) => {
      state.addBoard.isFulfilled = false
    },
    setRefresh: (state) => {
      state.refresh = !state.refresh
    },
    userClosedErrorAlert: (state) => {
      state.isFailed = false
    },
    addTeamStarted: () => {},
    addTeamPending: (state) => {
      state.addTeam.isFetching = true
    },
    addTeamSuccess: (state) => {
      state.addTeam.isFetching = false
      state.addTeam.isFulfilled = true
    },
    addTeamFailed: (state) => {
      state.addTeam.isFailed = true
      state.addTeam.isFetching = false
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
    getBoardsStarted: () => {},
    getBoardsPending: (state) => {
      state.boards.isFetching = true
    },
    getBoardsSuccess: (state, payload) => {
      state.boards.isFetching = false
      state.boards.isFulfilled = true
      state.boards.data = payload.payload
    },
    getBoardsFailed: (state) => {
      state.boards.isFailed = true
      state.boards.isFetching = false
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
    addBoardStarted: () => {},
    addBoardPending: (state) => {
      state.addBoard.isFetching = true
    },
    addBoardSuccess: (state) => {
      state.addBoard.isFetching = false
      state.addBoard.isFulfilled = true
    },
    addBoardFailed: (state) => {
      state.addBoard.isFailed = true
      state.addBoard.isFetching = false
    },
    setSelectedTeam: (state, payload) => {
      state.selectedTeam = payload.payload
    },
    uploadingTeamImageStarted: () => {},
    uploadingTeamImage: (state) => {
      state.teams.isUploadingImage = true
    },
    uploadingTeamImageSuccess: (state, payload) => {
      state.teams.isUploadingImage = false
      state.teams.uploadedImageId = payload.payload
    },
    uploadingBoardImageStarted: () => {},
    uploadingBoardImage: (state) => {
      state.boards.isUploadingImage = true
    },
    uploadingBoardImageSuccess: (state, payload) => {
      state.boards.isUploadingImage = false
      state.boards.uploadedImageId = payload.payload
    },
    cleanImages: (state) => {
      state.boards.uploadedImageId = ''
      state.teams.uploadedImageId = ''
    },
  },
})

export const {
  setIsAddTeamFulfilledFalse,
  setIsAddBoardFulfilledFalse,
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
  addBoardStarted,
  addBoardPending,
  addBoardSuccess,
  addBoardFailed,
  setSelectedTeam,
  getUsersPending,
  getUsersStarted,
  getUsersSuccess,
  getUsersFailed,
  inviteUserToTeam,
  getBoardsStarted,
  getBoardsPending,
  getBoardsSuccess,
  getBoardsFailed,
  uploadingBoardImage,
  uploadingBoardImageStarted,
  uploadingBoardImageSuccess,
  uploadingTeamImage,
  uploadingTeamImageStarted,
  uploadingTeamImageSuccess,
  cleanImages,
} = homeSlice.actions

export default homeSlice.reducer
