import { 
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILURE,
    AUTHENTICATE_USER_REQUEST,
    SAVE_USER_LOGIN_CREDS
} from "../../types/authentication/auth.types.js";

const initialState = {
    loggedin: true,
    loading: false,
    user_details: {},
    error: ''
};

export const authenticationReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_USER_LOGIN_CREDS: 
            return {
                ...state,
                username: action.payload
            }

        case AUTHENTICATE_USER_REQUEST:
            return {
                ...state,
                loggedin: false,
                loading: true
            }
           
        case AUTHENTICATE_SUCCESS:
            return {
                ...state,
                loading: false,
                user_details: action.payload,
                loggedin: true,
                error: ''
            }
        
        case AUTHENTICATE_FAILURE:
            return {
                loggedin: false,
                loading: false,
                username: '',
                user_details: {},
                error: action.payload
            }    
        default:
            return state;
    }
}