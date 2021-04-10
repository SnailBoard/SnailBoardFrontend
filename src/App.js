import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './static/img/logo.svg';
import increment, { incrementAsync, decrement } from './core/actions';
import './static/css/App.css';
import Routing from "./Routing";

function App() {
  // const dispatch = useDispatch();
  // const counter = useSelector(state => state.count)

  return (
    <div className="App">
      <Routing/>
    </div>
  );
}

export default App;
