import {authenticationReducer} from "./authentication/auth.reducer";
import {combineReducers} from 'redux';

const reducers = {
    authenticationDetails: authenticationReducer
};

export default combineReducers(reducers);