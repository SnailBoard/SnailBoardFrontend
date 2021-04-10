import React from 'react';
import './App.css';

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
<div>
  <button onClick={onIncrementAsync} className="button">
    Increment after 1 second
  </button>
  {' '}
  <button onClick={onIncrement} className="button">
    + Increment
  </button>
  {' '}
  <button onClick={onDecrement} className="button">
    - Decrement
  </button>
  <hr />
  <div>
    Clicked: {value} times
  </div>
</div>

export default Counter;