import { all, call, put, takeEvery } from 'redux-saga/effects'
import history from '../../setupHistory'
import {
  getRefreshData,
  loginRequest,
  logoutRequest,
  refreshRequest,
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
  userPending,
  userFailed,
  refreshStarted,
  refreshSuccess,
  refreshFailed,
  refreshPending,
} from './authSlice'
import { TOKEN_EXPIRED_MESSAGE } from '../../core/values/keys'
import { setAuthorizationToken } from '../../core/api'

function* login({ payload }) {
  yield put(loginPending())
  setAuthorizationToken(null)
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

  yield put(userPending())

  const { data } = response
  if (response.status < 400) {
    yield put(userSuccess(data))
    history.push('/health-check')
  } else if (
    response.status === 403 &&
    response.data.message === TOKEN_EXPIRED_MESSAGE
  ) {
    yield put(refreshStarted())
  } else {
    yield put(userFailed())
  }
}

function* watchUser() {
  yield takeEvery(userStarted, user)
}

function* refresh() {
  yield put(refreshPending())
  setAuthorizationToken(null)
  const response = yield call(() => refreshRequest(getRefreshData()))
  const { data } = response
  if (response.status < 400) {
    yield put(refreshSuccess(data))
    yield put(userStarted())
    // history.push('/health-check')
  } else {
    yield put(refreshFailed())
  }
}

function* watchRefresh() {
  yield takeEvery(refreshStarted, refresh)
}

export default function* authSagas() {
  yield all([
    watchLogin(),
    watchRegister(),
    watchLogout(),
    watchUser(),
    watchRefresh(),
  ])
}
