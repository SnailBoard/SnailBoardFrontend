import { all, call, put, takeEvery } from 'redux-saga/effects'
import history from '../../setupHistory'
import {
  loginRequest,
  logoutRequest,
  registerRequest,
  userRequest,
} from './service'
import {
  loginFailed,
  loginPending,
  loginStarted,
  userStarted,
  logoutStarted,
  logoutSuccess,
  registerPending,
  registerStarted,
  registerSuccess,
  userSuccess,
  userFailed,
} from './authSlice'

function* login({ payload }) {
  yield put(loginPending())

  const response = yield call(() => loginRequest(payload))

  if (response.status < 400) {
    yield put(userStarted())
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
  if (response.status < 400) {
    yield put(registerSuccess())
    history.push('/login')
  } else {
    yield put(loginFailed())
  }
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

function* user() {
  const response = yield call(() => userRequest())
  const { data } = response
  if (response.status < 400) {
    yield put(userSuccess(data))
    history.push('/health-check')
  } else {
    yield put(userFailed())
  }
}

function* watchUser() {
  yield takeEvery(userStarted, user)
}

export default function* authSagas() {
  yield all([watchLogin(), watchRegister(), watchLogout(), watchUser()])
}
