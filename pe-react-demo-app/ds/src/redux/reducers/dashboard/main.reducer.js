import {
    FETCH_WIDGET_CONFIG,
    WIDGET_CONFIG_FAILURE,
    WIDGET_CONFIG_SUCCESS,
    DATA_CONFIG_SUCCESS,
    DATA_CONFIG_FAILURE,
    FETCH_DATA_REQUEST
} from "../../types/dashboard/main.types.js";
import {combineReducers} from 'redux';


const initialWidgetState = {
    loading: false,
    error: '',
    widgetConfig: {}
};

const initialDataState = {
    loading: false,
    error: '',
    data: []
};
export const widgetReducer = (state = initialWidgetState, action) => {
    switch (action.type) {
        case FETCH_WIDGET_CONFIG:
            return {
                ...state,
                loading: true
            }
        case WIDGET_CONFIG_FAILURE:
            return {
                error: action.payload,
                widgetConfig: {},
                loading: false
            }
        case WIDGET_CONFIG_SUCCESS:
            return {
                widgetConfig: action.payload,
                loading: false,
                error: ''
            }
        default:
            return state;
    }
}

export const dataReducer = (state = initialDataState, action) => {
    switch (action.type) {
        case FETCH_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DATA_CONFIG_FAILURE:
            return {
                error: action.payload,
                data: [],
                loading: false
            }
        case DATA_CONFIG_SUCCESS:
            return {
                data: action.payload,
                loading: false,
                error: ''
            }
        default:
            return state;
    }
}