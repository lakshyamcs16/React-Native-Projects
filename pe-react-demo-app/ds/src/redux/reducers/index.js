import authReducer from "./authentication/auth.reducer.js";
import {combineReducers} from 'redux';

const reducers = {
    authReducer
};

export default combineReducers(reducers);