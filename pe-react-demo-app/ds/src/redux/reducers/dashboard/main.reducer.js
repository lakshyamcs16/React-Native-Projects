import {
    FETCH_WIDGET_CONFIG,
    WIDGET_CONFIG_FAILURE,
    WIDGET_CONFIG_SUCCESS
} from "../../types/dashboard/main.types.js";

const initialState = {
    loading: false,
    error: '',
    widgetConfig: {}
};

export const navigationReducer = (state = initialState, action) => {
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