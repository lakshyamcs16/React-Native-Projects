import { 
    AUTHENTICATE_SUCCESS,
    AUTHENTICATE_FAILURE,
    AUTHENTICATE_USER_REQUEST,
    SAVE_USER_LOGIN_CREDS
} from "../../types/authentication/auth.types.js";

const initialState = {
    loggedin: true,
    loading: false,
    user_details: {
        token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlYjQxMjQ1NWM3ZDUwMjY0NGI5M2UzMSIsImlhdCI6MTU5MDA3MzA1NX0.eH4yaTo1qbxpmBRtl52F1yBO6u2Ih1VWOfeb7vN22Xg"
    },
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