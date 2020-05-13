import {authenticationReducer} from "./authentication/auth.reducer";
import {navigationReducer} from "./dashboard/navigation.reducer";
import {themeReducer} from "./themes/themes.reducer";
import {combineReducers} from 'redux';

const reducers = {
    authenticationDetails: authenticationReducer,
    navigationDetails: navigationReducer,
    themeDetails: themeReducer
};

export default combineReducers(reducers);