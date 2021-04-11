import React from 'react'
import './static/css/App.css'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Routing from './Routing'
import store from './core/store'

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <BrowserRouter>
          <Routing />
        </BrowserRouter>
      </Provider>
    </div>
  )
}

export default App
