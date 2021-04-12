import { all, call, put, takeEvery } from 'redux-saga/effects'
import { loginRequest, registerRequest } from './service'
import {
  loginStarted,
  loginPending,
  loginSuccess,
  registerStarted,
  registerPending,
} from './authSlice'

function* login({ payload }) {
  yield put(loginPending)

  const response = yield call(() => loginRequest(payload))
  // console.log(response2, " asdff ")
  // const response = {user: "rost", token: "asdf"}

  yield put(
    loginSuccess({
      accessToken: response.accessToken,
      refreshToken: response.refreshToken,
    }),
  )
}

function* watchLogin() {
  yield takeEvery(loginStarted, login)
}

function* register({ payload }) {
  console.log(payload)
  yield put(registerPending)

  const response = yield call(() => registerRequest(payload))

  console.log('Response in sagas ', response)
  // const { user, token } = response
  // yield put(registerSuccess({ user, token }));
}

function* watchRegister() {
  yield takeEvery(registerStarted, register)
}

// function* getUser() {
//   const response = yield call(() => getUserRequest())
//   if (response) {
//     yield put(getUserRoutine.success(response))
//   }
// }
//
// function* watchGetUser() {
//   yield takeEvery(getUserRoutine.TRIGGER, getUser)
// }

export default function* authSagas() {
  yield all([
    watchLogin(),
    watchRegister(),
    // watchGetUser()
  ])
}
