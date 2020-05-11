import {
    UPDATE_NAVIGATION_BAR_TITLE,
    TOGGLE_DRAWER,
    SET_APP_CONFIG_ERROR,
    SET_APP_CONFIG
} from "../../types/dashboard/navigation.types.js";

const initialState = {
    title: '',
    isDrawerOpen: false,
    error: '',
    appConfig: {}
};

export const navigationReducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_NAVIGATION_BAR_TITLE:
            return {
                ...state,
                title: action.payload
            }
        case TOGGLE_DRAWER:
            return {
                ...state,
                isDrawerOpen: action.payload
            }
        case SET_APP_CONFIG_ERROR:
            return {
                ...state,
                appConfig: {},
                error: action.payload
            }
        case SET_APP_CONFIG: 
            return {
                ...state,
                error: '',
                appConfig: action.payload
            }
        default:
            return state;
    }
}