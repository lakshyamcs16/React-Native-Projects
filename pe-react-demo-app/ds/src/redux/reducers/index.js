import {authenticationReducer} from "./authentication/auth.reducer";
import {navigationReducer} from "./dashboard/navigation.reducer";
import {themeReducer} from "./themes/themes.reducer";
import {combineReducers} from 'redux';
import {dataReducer} from './dashboard/main.reducer';

const reducers = {
    authenticationDetails: authenticationReducer,
    navigationDetails: navigationReducer,
    dataDetails: dataReducer,
    themeDetails: themeReducer
};

export default combineReducers(reducers);