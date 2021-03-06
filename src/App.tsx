import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './rootReducer';
import logo from './logo.svg';
import Counter from './Counter';
import { addCount, minusCount } from './counter';
import './App.css';

export const incrementAsync = () => ({
  type: 'INCREMENT_ASYNC',
});

function App() {
  const dispatch = useDispatch()
  const { clicks } = useSelector((state: RootState) => state.count)

  const increment = (page: number) => {
    dispatch(addCount(page));
  }

  const decrement = (page: number) => {
    dispatch(minusCount(page));
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Counter
          value={clicks}
          onIncrement={() => increment(1)}
          onDecrement={() => decrement(1)}
          onIncrementAsync={() => dispatch(incrementAsync())}
        />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
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
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
          Typescript,
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
          React Redux,
          </a>
          {" "}
          <a
            className="App-link"
            href="https://www.npmjs.com/package/redux-injectors"
            target="_blank"
            rel="noopener noreferrer"
          >
          Redux Injectors
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
