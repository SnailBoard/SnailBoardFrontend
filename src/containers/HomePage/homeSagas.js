import { all, call, put, takeEvery } from 'redux-saga/effects'
import { addTeamRequest } from './service'
import {
  addTeamStarted,
  addTeamPending,
  addTeamSuccess,
  addTeamFailed,
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

function* watchAddTeam() {
  yield takeEvery(addTeamStarted, addTeam)
}

export default function* homeSagas() {
  yield all([watchAddTeam()])
}
