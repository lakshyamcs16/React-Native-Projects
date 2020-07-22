import {
    FETCH_WIDGET_CONFIG,
    WIDGET_CONFIG_FAILURE,
    WIDGET_CONFIG_SUCCESS,
    DATA_CONFIG_SUCCESS,
    DATA_CONFIG_FAILURE,
    FETCH_DATA_REQUEST,
    FETCH_DASHBOARD_DATA_REQUEST,
    DATA_DASHBOARD_SUCCESS,
    DATA_DASHBOARD_FAILURE
} from "../../types/dashboard/main.types.js";


const initialWidgetState = {
    loading: false,
    error: '',
    widgetConfig: {},
};

const initialDataState = {
    loading: false,
    error: '',
    data: []
};

const initialDashboardState = {
    loading: false,
    error: '',
    dashboardConfig: {}
}

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
            state.widgetConfig[action.id] = action.payload;
            return {
                ...state,
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

export const dashboardReducer = (state = initialDashboardState, action) => {
    switch (action.type) {
        case FETCH_DASHBOARD_DATA_REQUEST:
            return {
                ...state,
                loading: true
            }
        case DATA_DASHBOARD_SUCCESS:
            state.dashboardConfig[action.id] = action.payload;
            return {
                ...state,
                error: '',
                loading: false
            }
        case DATA_DASHBOARD_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload
            }
        default:
            return state;
    }
}