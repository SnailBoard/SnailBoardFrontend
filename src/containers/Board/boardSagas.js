import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  addColumnRequest,
  addTicketRequest,
  getBoardDataRequest,
} from './service'

import {
  addColumnFailed,
  addColumnPending,
  addColumnStarted,
  addColumnSuccess,
  addTicketFailed,
  addTicketPending,
  addTicketStarted,
  addTicketSuccess,
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

  if (response.status < 400) {
    yield put(addColumnSuccess(response.data))
  } else {
    yield put(addColumnFailed())
  }
}

function* watchAddNewColumn() {
  yield takeEvery(addColumnStarted, addNewColumn)
}

function* addNewTicket({ payload }) {
  yield put(addTicketPending())
  const response = yield call(() => addTicketRequest(payload))

  if (response.status < 400) {
    yield put(addTicketSuccess(response.data))
  } else {
    yield put(addTicketFailed())
  }
}

function* watchAddNewTicket() {
  yield takeEvery(addTicketStarted, addNewTicket)
}

export default function* boardSagas() {
  yield all([watchGetBoardData(), watchAddNewColumn(), watchAddNewTicket()])
}
