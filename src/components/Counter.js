import React from 'react';
import '../static/css/App.css';
import {connect, useSelector} from "react-redux";
import { increment, incrementAsync, decrement } from '../core/actions'

const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) => {
  return (
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
  )
}


// export default Counter;
const mapStateToProps = rootState => (
    {
      value: 0,
    }
);

const mapDispatchToProps =
    {
      // onIncrement: dispatch(),
      // onDecrement,
      // onIncrementAsync,
    };

export default connect(mapStateToProps, mapDispatchToProps)(Counter);