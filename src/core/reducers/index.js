import { combineReducers } from 'redux';
import auth from '../../containers/Auth/reducer'

const rootReducer = combineReducers({
    auth
});

export default rootReducer;