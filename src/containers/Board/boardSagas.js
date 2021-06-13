import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  changeTicketPositionRequest,
  getBoardDataRequest,
  changeColumnOrderRequest,
} from './service'

import {
  getBoardDataStarted,
  getBoardDataPending,
  getBoardDataSuccess,
  getBoardDataFailed,
  changeColumnOrderPending,
  changeColumnOrderStarted,
  changeColumnOrderSuccess,
  changeTicketsInColumnsSuccess,
  changeTicketsInColumnsPending,
  changeTicketsInColumnsStarted,
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

export default function* boardSagas() {
  yield all([watchGetBoardData()])
}
