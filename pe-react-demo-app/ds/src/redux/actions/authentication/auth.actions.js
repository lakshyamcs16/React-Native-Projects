import {
    AUTHENTICATE_FAILURE,
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_USER_REQUEST,
    SAVE_USER_LOGIN_CREDS
} from "../../types/authentication/auth.types.js";
import base64 from 'react-native-base64'

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

export const authenticateUser = (username, password) => {
    return (dispatch) => {
        var headers = {
            "Content-Type":  "application/json",
            "Authorization": `Basic ${base64.encode(username + ':' + password)}`
        };
        var raw = "{}";
        var requestOptions = {
            method: 'POST',
            headers: headers,
            body: raw,
        };
        fetch('https://ivpcloud.com:8421/auth?access_token=IU3E1613AGbTHG872iBkkO0xDmjblFkW',
            requestOptions)
            .then(response => response.text())
            .then(result => {
                console.log(result);
                
                result = JSON.parse(result);
                dispatch(authenticateSuccess(result))
            })
            .catch(error => {
                console.log(error);
                
                dispatch(authenticateFailure(error.message))
            })
    }
}