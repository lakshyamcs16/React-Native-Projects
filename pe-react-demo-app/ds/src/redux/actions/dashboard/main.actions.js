import {
    WIDGET_CONFIG_FAILURE,
    WIDGET_CONFIG_SUCCESS,
    FETCH_WIDGET_CONFIG,
    DATA_CONFIG_FAILURE,
    DATA_CONFIG_SUCCESS,
    FETCH_DATA_REQUEST,
    FETCH_DASHBOARD_DATA_REQUEST,
    DATA_DASHBOARD_FAILURE,
    DATA_DASHBOARD_SUCCESS
} from '../../types/dashboard/main.types'
import { ERROR_MESSAGE_401, GENERIC_APP_CONFIG_ERROR, DEFAULT_APP_CTX } from '../../../utilities/Constants';
import { isJson } from '../../../utilities/Utilities';
import { application } from "../../../../index";

export const widgetRequest = () => {
    return {
        type: FETCH_WIDGET_CONFIG
    }
}

export const widgetSuccess = (config, id) => {
    return {
        type: WIDGET_CONFIG_SUCCESS,
        payload: config,
        id: id
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

export const dashboardDataRequest = () => {
    return {
        type: FETCH_DASHBOARD_DATA_REQUEST
    }
}

export const dashboardDataSuccess = (data, id) => {
    return {
        type: DATA_DASHBOARD_SUCCESS,
        payload: data,
        id: id
    }
}

export const dashboardDataFailure = error => {
    return {
        type: DATA_DASHBOARD_FAILURE,
        payload: error
    }
}

export const fetchWidgetConfig = (params) => {
    return async (dispatch) => {

        console.log(JSON.stringify(params, null, 2));

        let services = application.getService(DEFAULT_APP_CTX);
        const response = await services.setParameters(params).hit(false);
        
        try {
            var result = {
                success: false
            };

            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                result.success = true;
                dispatch(widgetSuccess(responseJson, params.id));
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
        params.url = `${params.url}&access_token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjQxMjQ1NWM3ZDUwMjY0NGI5M2UzMSIsImlhdCI6MTU5MTE4ODM5Nn0.fBuHR9AFwvyadA8qgPEw4O-J7A3Ygo-CKiPryqt9vD8`;
        
        let services = application.getService(DEFAULT_APP_CTX);
        const response = await services.setParameters(params).hit(false);
                
        try {
            var result = {
                success: false
            };
            console.log(response.status);
            
            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                console.log(JSON.stringify(responseJson, null, 2));
                result.success = true;
                dispatch(dataSuccess(responseJson));
                result.body = responseJson;
                return result;
            } else {
                let body = {};
                let tempBody = response;
                console.log(JSON.stringify(response, null, 2));
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

export const fetchDashboardData = (params) => {

    return async (dispatch) => {

        console.log("--------------------------DASHBOARD DATA----------------------------");        
        console.log(JSON.stringify(params, null, 2));

        params.url = `/DataQueries/c/ms/p/PrivateEquity/scan?datapoint=Objects.'29757046-2abb-4edc-a793-bc8e9885c9ca'&mode=Stream&access_token=${params.token}`;

        let services = application.getService(DEFAULT_APP_CTX);
        const response = await services.setParameters().hit(false);
        
        try {
            var result = {
                success: false
            };

            if (response.status >= 200 && response.status < 300) {
                const responseJson = await response.json();
                result.success = true;
                dispatch(dashboardDataSuccess(responseJson, params.id));
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
                    dispatch(dashboardDataFailure(body.message));

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