import React from 'react';
import './static/css/App.css';
import Routing from "./Routing";
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "./store";

const store = configureStore();

function App() {
  return (
      <Provider store={store}>
          <BrowserRouter>
              <div className="App">
                  <Routing/>
              </div>
          </BrowserRouter>
      </Provider>
  );
}

export default App;
