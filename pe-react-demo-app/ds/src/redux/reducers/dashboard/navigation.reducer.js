import {
    UPDATE_NAVIGATION_BAR_TITLE,
    TOGGLE_DRAWER
} from "../../types/dashboard/navigation.types.js";

const initialState = {
    title: '',
    isDrawerOpen: false
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
        default:
            return state;
    }
}