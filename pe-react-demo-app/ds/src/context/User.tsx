import base64 from 'react-native-base64';
import { MASTER_KEY } from 'react-native-dotenv'
import { application } from '../../index';
import { DEFAULT_APP_CTX } from '../utilities/Constants';

export default class User {

    response: object;
    userObject: object;

    constructor() {
        this.response = null,
        this.userObject = {}
    }
    getUser = () => {
        return this.userObject;
    };

    setUser = (userObject) => {
        this.userObject = userObject;
        return this;
    }

    handleResponse = async (response) => {
        if (response.status >= 200 && response.status < 300) {
            const responseJson = await response.json();
            this.userObject = responseJson;
        } 
    }

    login = async ({username, password}) => {
        var headers = {
            "Authorization": `Basic ${base64.encode(username + ':' + password)}`
        };
        var raw = {};
    
        let serviceParams = {
            headers, 
            body: raw, 
            url: `/auth?access_token=${MASTER_KEY}`
        };

        let services = application.getService(DEFAULT_APP_CTX);
        const response = await services.setParameters(serviceParams).hit();

        this.response = response;
        await this.handleResponse(response);

        return this;
    };
    logout = (username: string) => {

    };
    IsLoggedIn = (): boolean => {
        if(!this.response) {
            return false;
        }

        return true;
    };
}