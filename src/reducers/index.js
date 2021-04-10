import { combineReducers } from 'redux';

const initialState = 0;

function count(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
  default:
    return state;
  }
}

const rootReducer = combineReducers({
  count
});

export default rootReducer;