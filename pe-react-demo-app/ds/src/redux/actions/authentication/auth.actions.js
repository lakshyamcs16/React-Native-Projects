import {
    AUTHENTICATE_FAILURE,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_USER_REQUEST,
    SAVE_USER_LOGIN_CREDS
} from "../../types/authentication/auth.types.js";
import base64 from 'react-native-base64';
import { api } from '../../../services/Services';
import { isJson } from '../../../utilities/Utilities';
import { ERROR_MESSAGE_401, GENERIC_LOGIN_ERROR } from '../../../utilities/Constants';

export const saveUserCreds = () => {
    return {
        type: SAVE_USER_LOGIN_CREDS
    }
}

export const authenticateUserRequest = () => {
    return {
        type: AUTHENTICATE_USER_REQUEST
    }
}

export const authenticateSuccess = users => {
    return {
        type: AUTHENTICATE_SUCCESS,
        payload: users
    }
}

export const authenticateFailure = error => {
    return {
        type: AUTHENTICATE_FAILURE,
        payload: error
    }
}

export const authenticateUser = (params) => {
    return async (dispatch) => {

        console.log('Password ' + params.password);

        var headers = {
            "Authorization": `Basic ${base64.encode(params.username + ':' + params.password)}`
        };
        var raw = {};
        const response = await api("/auth?access_token=IU3E1613AGbTHG872iBkkO0xDmjblFkW", "POST", raw, headers);
        try {
            var result = {
                success: false
            };

            if (response.status > 200 && response.status < 300) {                
                const responseJson = await response.json();

                result.success = true;
                dispatch(authenticateSuccess(responseJson));
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
                    dispatch(authenticateFailure(body.message));
                    console.log(body.message);
                    
                } catch (e) {
                    
                }
                result.body = body;
                return result;
            }
        } catch (error) {
            dispatch(authenticateFailure(GENERIC_LOGIN_ERROR))
            return error;
        }
    }
}