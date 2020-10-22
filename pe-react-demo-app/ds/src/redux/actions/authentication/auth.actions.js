import {
    AUTHENTICATE_FAILURE,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_USER_REQUEST,
    SAVE_USER_LOGIN_CREDS,
    LOGIN_FAILED
} from "../../types/authentication/auth.types.js";
import { isJson } from '../../../utilities/Utilities';
import { ERROR_MESSAGE_401, GENERIC_LOGIN_ERROR, DEFAULT_APP_CTX } from '../../../utilities/Constants';
import { application } from '../../../../index';

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

export const loginFailed = () => {
    return {
        type: LOGIN_FAILED
    }
}

export const authenticateUser = (params) => {
    return async (dispatch) => {
        
        let user = await application.getCurrentUser().login(params);
        let { response, userObject } = user;
        application.setCurrentUser(user);

        try {
            var result = {
                success: false
            };
            if (response.status >= 200 && response.status < 300) {
                const responseJson = userObject;
                console.log(responseJson)
                result.success = true;
                dispatch(authenticateSuccess(responseJson));
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
                    const responseJson = userObject;
                    body = responseJson;
                }

                try {
                    dispatch(authenticateFailure(body.message));
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