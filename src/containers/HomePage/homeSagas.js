import { all, call, put, takeEvery } from 'redux-saga/effects'
import { addTeamRequest, getTeamsRequest } from './service'
import {
  addTeamStarted,
  addTeamPending,
  addTeamSuccess,
  addTeamFailed,
  getTeamsStarted,
  getTeamsPending,
  getTeamsSuccess,
  getTeamsFailed,
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

function* watchAddTeam() {
  yield takeEvery(addTeamStarted, addTeam)
}

function* watchGetTeams() {
  yield takeEvery(getTeamsStarted, getTeams)
}

export default function* homeSagas() {
  yield all([watchAddTeam(), watchGetTeams()])
}
