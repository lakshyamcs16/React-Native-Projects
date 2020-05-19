import {
    WIDGET_CONFIG_FAILURE,
    WIDGET_CONFIG_SUCCESS,
    FETCH_WIDGET_CONFIG,
    DATA_CONFIG_FAILURE,
    DATA_CONFIG_SUCCESS,
    FETCH_DATA_REQUEST
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

export const dataRequest = () => {
    return {
        type: FETCH_DATA_REQUEST
    }
}

export const dataSuccess = data => {
    return {
        type: DATA_CONFIG_SUCCESS,
        payload: data
    }
}

export const dataFailure = error => {
    return {
        type: DATA_CONFIG_FAILURE,
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
                if (isJson(tempBody)) {
                    body = response;
                    body = JSON.parse(body);
                } else if (response.status === 401) {
                    body.message = ERROR_MESSAGE_401;
                } else {
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

export const fetchWidgetData = (params) => {

    return async (dispatch) => {

        console.log("------------------------------------------------------");        
        const response = await api(`/DataQueries/c/ms/p/PrivateEquity/scan?datapoint=Objects.'29757046-2abb-4edc-a793-bc8e9885c9ca'&mode=Stream&access_token=${params.token}`, "POST", params.body, params.headers);
        
        try {
            var result = {
                success: false
            };

            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                result.success = true;
                dispatch(dataSuccess(responseJson));
                result.body = responseJson;
                return result;
            } else {
                let body = {};
                let tempBody = response;
                if (isJson(tempBody)) {
                    body = response;
                    body = JSON.parse(body);
                } else if (response.status === 401) {
                    body.message = ERROR_MESSAGE_401;
                } else {
                    const responseJson = await response.json();
                    body = responseJson;
                }

                try {
                    dispatch(dataFailure(body.message));

                } catch (e) {

                }
                result.body = body;
                return result;
            }
        } catch (error) {
            dispatch(dataFailure(GENERIC_APP_CONFIG_ERROR))
            return error;
        }
    }
}