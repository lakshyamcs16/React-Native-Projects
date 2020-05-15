import {
    WIDGET_CONFIG_FAILURE,
    WIDGET_CONFIG_SUCCESS,
    FETCH_WIDGET_CONFIG,
} from '../../types/dashboard/main.types'
import { ERROR_MESSAGE_401, GENERIC_APP_CONFIG_ERROR } from '../../../utilities/Constants';
import { api } from '../../../services/Services';

export const widgetRequest = () => {
    return {
        type: FETCH_WIDGET_CONFIG
    }
}

export const widgetSuccess = config => {
    return {
        type: WIDGET_CONFIG_SUCCESS,
        payload: config
    }
}

export const widgetFailure = error => {
    return {
        type: WIDGET_CONFIG_FAILURE,
        payload: error
    }
}

export const fetchWidgetConfig = () => {
    return async (dispatch) => {

        const response = await api("https://private-5268ee-parsers.apiary-mock.com/rester/widgetconfig", "GET", null, null, false);
        try {
            var result = {
                success: false
            };
            
            if (response.status >= 200 && response.status < 300) {                
                const responseJson = await response.json();  
                result.success = true;
                dispatch(widgetSuccess(responseJson));
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
                    dispatch(widgetFailure(body.message));
                    
                } catch (e) {
                    
                }
                result.body = body;
                return result;
            }
        } catch (error) {
            dispatch(widgetFailure(GENERIC_APP_CONFIG_ERROR))
            return error;
        }
    }
}