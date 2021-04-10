import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import logo from './logo.svg';
import increment, { incrementAsync, decrement } from './actions';
import Counter from './Counter';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const counter = useSelector(state => state.count)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter
          value={counter}
          onIncrement={() => dispatch(increment())}
          onDecrement={() => dispatch(decrement())}
          onIncrementAsync={() => dispatch(incrementAsync())}
        />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <div>
          Learn
          {" "}
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
          React,
          </a>
          {" "}
          <a
            className="App-link"
            href="https://redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
          Redux,
          </a>
          {" "}
          <a
            className="App-link"
            href="https://react-redux.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
          React Redux
          </a>
          {" "}
          and
          {" "}
          <a
            className="App-link"
            href="https://redux-saga.js.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
          Redux Saga
          </a>
        </div>
      </header>
    </div>
  );
}

export default App;
