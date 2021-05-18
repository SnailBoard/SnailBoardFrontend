import { all, call, put, takeEvery } from 'redux-saga/effects'
import { addBoardRequest, addTeamRequest, getTeamsRequest } from './service'
import {
  addTeamStarted,
  addTeamPending,
  addTeamSuccess,
  addTeamFailed,
  getTeamsStarted,
  getTeamsPending,
  getTeamsSuccess,
  getTeamsFailed,
  addBoardStarted,
  addBoardPending,
  addBoardSuccess,
  addBoardFailed,
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

function* addBoard({ payload }) {
  yield put(addBoardPending())
  const response = yield call(() => addBoardRequest(payload))

  if (response.status < 400) {
    yield put(addBoardSuccess())
  } else {
    yield put(addBoardFailed())
  }
}
function* watchAddTeam() {
  yield takeEvery(addTeamStarted, addTeam)
}

function* watchGetTeams() {
  yield takeEvery(getTeamsStarted, getTeams)
}

function* watchAddBoard() {
  yield takeEvery(addBoardStarted, addBoard)
}

export default function* homeSagas() {
  yield all([watchAddTeam(), watchGetTeams(), watchAddBoard()])
}
