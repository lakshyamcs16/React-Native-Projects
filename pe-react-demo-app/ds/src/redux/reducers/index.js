import { Reducer } from 'react-native-router-flux';
import {combineReducers} from 'redux';
import {Reducers} from './reducers';

export default combineReducers(new Reducers().getReducer());