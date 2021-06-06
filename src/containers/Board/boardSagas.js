import { all, call, put, takeEvery } from 'redux-saga/effects'
import {
  changeTicketPosition,
  getBoardData,
  changeColumnOrder,
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

function* getBoard({ payload }) {
  yield put(getBoardDataPending())
  const response = yield call(() => getBoardData(payload))

  if (response.status < 400) {
    yield put(getBoardDataSuccess(response.data))
  } else {
    yield put(getBoardDataFailed())
  }
}

function* watchGetBoardData() {
  yield takeEvery(getBoardDataStarted, getBoard)
}

export default function* boardSagas() {
  yield all([watchGetBoardData()])
}
