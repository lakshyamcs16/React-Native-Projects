import { 
    UPDATE_NAVIGATION_BAR_TITLE,
    IS_NAVIGATION_BAR_TITLE_ENABLED,
    IS_NAVIGATION_BAR_FILTERS_ENABLED,
    TOGGLE_DRAWER,
    TOGGLE_NOTIFICATION_DRAWER,
    SET_APP_CONFIG,
    SET_APP_CONFIG_ERROR
} from "../../types/dashboard/navigation.types.js";
import { ERROR_MESSAGE_401, GENERIC_APP_CONFIG_ERROR, DEFAULT_APP_CTX } from '../../../utilities/Constants';
import { isJson } from '../../../utilities/Utilities';
import { loginFailed } from '../authentication/auth.actions';
import { application } from '../../../../App';

export const isNavigationBarTitleEnabled = enabled => {
    return {
        type: IS_NAVIGATION_BAR_TITLE_ENABLED,
        payload: enabled
    }
}

export const isNavigationBarFiltersEnabled = enabled => {
    return {
        type: IS_NAVIGATION_BAR_FILTERS_ENABLED,
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

export const openNotificationDrawer = () => {
    return {
        type: TOGGLE_NOTIFICATION_DRAWER,
        payload: true
    }
}

export const closeNotificationDrawer = () => {
    return {
        type: TOGGLE_NOTIFICATION_DRAWER,
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

export const fetchAppConfig = (params) => {
    return async (dispatch) => {

        let services = application.getService(DEFAULT_APP_CTX);
        
        const response = await services.setParameters(params).hit(false);
        console.log(response);
        try {
            var result = {
                success: false
            };
            
            if (response.status >= 200 && response.status < 300) {                
                const responseJson = await response.json();                
                result.success = true;
                
                dispatch(setAppConfig(responseJson));
                dispatch(isNavigationBarTitleEnabled(responseJson.title.enabled));
                dispatch(isNavigationBarFiltersEnabled(responseJson.filters.enabled));
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
                    if(!result.success) {
                        dispatch(loginFailed());
                        dispatch(appConfigFailure(body.message));
                    }
                    
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