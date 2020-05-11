import { 
    UPDATE_NAVIGATION_BAR_TITLE,
    TOGGLE_DRAWER
} from "../../types/dashboard/navigation.types.js";

export const updateNavigationBarTitle = title => {
    return {
        type: UPDATE_NAVIGATION_BAR_TITLE,
        payload: title
    }
}

export const openNavigationDrawer = () => {
    return {
        type: TOGGLE_DRAWER,
        payload: true
    }
}

export const closeNavigationDrawer = () => {
    return {
        type: TOGGLE_DRAWER,
        payload: false
    }
}