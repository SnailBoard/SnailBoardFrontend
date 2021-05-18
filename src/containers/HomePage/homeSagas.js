import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  addTeamRequest,
  getTeamsRequest,
  getUsersRequest,
  inviteUserToTeamRequest,
} from './service'
import {
  addTeamStarted,
  addTeamPending,
  addTeamSuccess,
  addTeamFailed,
  getTeamsStarted,
  getTeamsPending,
  getTeamsSuccess,
  getTeamsFailed,
  getUsersPending,
  getUsersStarted,
  getUsersSuccess,
  getUsersFailed,
  inviteUserToTeam,
} from './homeSlice'

function* addTeam({ payload }) {
  yield put(addTeamPending())
  const response = yield call(() => addTeamRequest(payload))

  if (response.status < 400) {
    yield put(addTeamSuccess())
  } else {
    yield put(addTeamFailed())
  }
}

function* getTeams() {
  yield put(getTeamsPending())
  const response = yield call(() => getTeamsRequest())

  if (response.status < 400) {
    yield put(getTeamsSuccess(response.data))
  } else {
    yield put(getTeamsFailed())
  }
}

function* getUsers() {
  yield put(getUsersPending())
  const response = yield call(() => getUsersRequest())

  if (response.status < 400) {
    yield put(getUsersSuccess(response.data))
  } else {
    yield put(getUsersFailed())
  }
}

function* inviteUser({ payload }) {
  console.log(payload)
  yield call(() => inviteUserToTeamRequest(payload))
}

function* watchInviteToTeam() {
  yield takeEvery(inviteUserToTeam, inviteUser)
}

function* watchAddTeam() {
  yield takeEvery(addTeamStarted, addTeam)
}

function* watchGetTeams() {
  yield takeEvery(getTeamsStarted, getTeams)
}

function* watchGetUsers() {
  yield takeEvery(getUsersStarted, getUsers)
}

export default function* homeSagas() {
  yield all([
    watchAddTeam(),
    watchGetTeams(),
    watchGetUsers(),
    watchInviteToTeam(),
  ])
}
