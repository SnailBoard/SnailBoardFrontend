import { all } from 'redux-saga/effects'
import authSagas from '../../containers/Auth/authSagas'

export default function* rootSaga() {
  yield all([authSagas()])
}
