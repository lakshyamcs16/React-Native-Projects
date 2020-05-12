import { 
    UPDATE_NAVIGATION_BAR_TITLE,
    IS_NAVIGATION_BAR_TITLE_ENABLED,
    TOGGLE_DRAWER,
    SET_APP_CONFIG,
    SET_APP_CONFIG_ERROR
} from "../../types/dashboard/navigation.types.js";
import { ERROR_MESSAGE_401, GENERIC_APP_CONFIG_ERROR } from '../../../utilities/Constants';
import { api } from '../../../services/Services';

export const isNavigationBarTitleEnabled = enabled => {
    return {
        type: IS_NAVIGATION_BAR_TITLE_ENABLED,
        payload: enabled
    }
}

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

export const setAppConfig = (config) => {
    return {
        type: SET_APP_CONFIG,
        payload: config
    }
}

export const appConfigFailure = (error) => {
    return {
        type: SET_APP_CONFIG_ERROR,
        payload: error
    }
}

export const fetchAppConfig = () => {
    return async (dispatch) => {

        const response = await api("https://private-5268ee-parsers.apiary-mock.com/rester/appconfig", "GET", null, null, false);
        try {
            var result = {
                success: false
            };
            
            if (response.status >= 200 && response.status < 300) {                
                const responseJson = await response.json();                
                result.success = true;
                dispatch(setAppConfig(responseJson));
                dispatch(isNavigationBarTitleEnabled(responseJson.title.enabled));
                result.body = responseJson;
                return result;
            } else {
                let body = {};
                let tempBody = response;
                if(isJson(tempBody)) {
                    body = response;
                    body = JSON.parse(body);
                }else if(response.status === 401) {
                    body.message = ERROR_MESSAGE_401;
                }else{
                    const responseJson = await response.json();
                    body = responseJson;
                }
                
                try {
                    dispatch(appConfigFailure(body.message));
                    console.log(body.message);
                    
                } catch (e) {
                    
                }
                result.body = body;
                return result;
            }
        } catch (error) {
            dispatch(appConfigFailure(GENERIC_APP_CONFIG_ERROR))
            return error;
        }
    }
}