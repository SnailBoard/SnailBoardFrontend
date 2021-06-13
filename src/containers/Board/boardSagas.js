import { all, call, put, takeEvery } from 'redux-saga/effects'
import { addColumnRequest, getBoardDataRequest } from './service'

import {
  addColumnFailed,
  addColumnPending,
  addColumnStarted,
  addColumnSuccess,
  getBoardDataFailed,
  getBoardDataPending,
  getBoardDataStarted,
  getBoardDataSuccess,
} from './boardSlice'

function* getBoardData({ payload }) {
  yield put(getBoardDataPending())
  const response = yield call(() => getBoardDataRequest(payload))

  if (response.status < 400) {
    yield put(getBoardDataSuccess(response.data))
  } else {
    yield put(getBoardDataFailed())
  }
}

function* watchGetBoardData() {
  yield takeEvery(getBoardDataStarted, getBoardData)
}

function* addNewColumn({ payload }) {
  yield put(addColumnPending())
  const response = yield call(() => addColumnRequest(payload))
  console.log(response)

  if (response.status < 400) {
    yield put(addColumnSuccess(response.data))
  } else {
    yield put(addColumnFailed())
  }
}

function* watchAddNewColumn() {
  yield takeEvery(addColumnStarted, addNewColumn)
}

export default function* boardSagas() {
  yield all([watchGetBoardData(), watchAddNewColumn()])
}
