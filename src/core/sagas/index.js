import { all } from 'redux-saga/effects'
import authSagas from '../../containers/Auth/authSagas'
import homeSagas from '../../containers/HomePage/homeSagas'

export default function* rootSaga() {
  yield all([authSagas(), homeSagas()])
}
