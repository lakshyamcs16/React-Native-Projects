import {authenticationReducer} from "./authentication/auth.reducer";
import {navigationReducer} from "./dashboard/navigation.reducer";
import {combineReducers} from 'redux';

const reducers = {
    authenticationDetails: authenticationReducer,
    navigationDetails: navigationReducer
};

export default combineReducers(reducers);