import {combineReducers} from 'redux'
import loggedReducer from './logged';

const allReducers=combineReducers({
    logged: loggedReducer,
})
export default allReducers;