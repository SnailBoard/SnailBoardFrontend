import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import { routerReducer } from 'react-router-redux'
import authSlice from '../../containers/Auth/authSlice'
import rootSaga from '../sagas'

const sagaMiddleware = createSagaMiddleware()
const middleware = [
  ...getDefaultMiddleware({ thunk: true, serializableCheck: false }),
  sagaMiddleware,
]

const devMode = process.env.NODE_ENV === 'development'

const store = configureStore({
  reducer: {
    auth: authSlice,
    routing: routerReducer,
  },
  devTools: devMode,
  middleware,
  preloadedState: {},
})

sagaMiddleware.run(rootSaga)

export default store
