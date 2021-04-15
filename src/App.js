import React from 'react'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import history from './setupHistory'
import Routing from './Routing'
import store from './core/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router history={history}>
          <Routing />
        </Router>
      </Provider>
    </div>
  )
}

export default App
