import { all, call, put, takeEvery } from 'redux-saga/effects'
import history from '../../setupHistory'
import { loginRequest, logoutRequest, registerRequest } from './service'
import {
  loginFailed,
  loginPending,
  loginStarted,
  loginSuccess,
  logoutStarted,
  logoutSuccess,
  registerPending,
  registerStarted,
} from './authSlice'

function* login({ payload }) {
  yield put(loginPending())

  const response = yield call(() => loginRequest(payload))

  if (response.status === 200) {
    yield put(loginSuccess())
    // history.push('/health-check')
  } else {
    yield put(loginFailed())
  }
}

function* watchLogin() {
  yield takeEvery(loginStarted, login)
}

function* register({ payload }) {
  yield put(registerPending())

  const response = yield call(() => registerRequest(payload))

  console.log('Response in sagas ', response)
}

function* watchRegister() {
  yield takeEvery(registerStarted, register)
}

function* logout() {
  logoutRequest()
  yield put(logoutSuccess())
}

function* watchLogout() {
  yield takeEvery(logoutStarted, logout)
}

export default function* authSagas() {
  yield all([watchLogin(), watchRegister(), watchLogout()])
}
