import counterReducer from './counter';
import auth from './authReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
    counter: counterReducer,
    auth: auth
})

export default allReducers;