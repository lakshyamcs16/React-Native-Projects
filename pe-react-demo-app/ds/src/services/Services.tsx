import { BASE_URL } from 'react-native-dotenv';
import Service from '../../contracts/Service';

export default class ResterService implements Service{
    url: string;
    headers: object;
    body: object;
    method: string;

    constructor(params: object = {}) {
        this.url = params.url || '';
        this.headers = params.headers || {};
        this.body = params.body || null;
        this.method = params.method || 'POST';
    }

    getUrl = () => {
        return this.url;
    }

    setUrl = (base = BASE_URL, url) => {
        this.url = `${base}${url}`;
        return this;
    }

    getHeaders = () => {
        return this.headers;
    }

    setHeaders = (headers = {}) => {
        this.headers = {...this.headers, headers};
        return this;
    }

    getBody = () => {
        return this.body;
    }

    setBody = (body = null) => {
        this.headers = {...this.body, body};
        return this;
    }

    getMethod = () => {
        return this.method;
    }

    setMethod = (method = 'POST') => {
        this.method = method;
        return this;
    }

    setParameters = (params) => {
        this.url = params.url || '';
        this.headers = params.headers || {};
        this.body = params.body || null;
        this.method = params.method || 'POST';
        return this;
    }

    useService = (middleware, params, callback, ...next) => {
        middleware(params);
        callback.apply(this, next);
    }

    hit = async (isBaseUrlAbsent = true) => {
        try {
            let endPoint = this.url;

            if (isBaseUrlAbsent)
                endPoint = BASE_URL.concat(this.url);

            const reqBody = this.body ? JSON.stringify(this.body) : null;

            let { method, headers } = this;
            const fetchParams = { method, headers };

            if ((this.method === "POST" || this.method === "PUT") && !reqBody) {
                throw new Error("Request body required");
            }

            if (reqBody) {
                fetchParams.headers["Content-type"] = "application/json";
                fetchParams.body = reqBody;
            }

            const fetchPromise = fetch(endPoint, fetchParams);
            console.log(endPoint);
            const timeOutPromise = new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject(`{ "statusCode": "408", "message" : "Please check your internet connection" }`);
                }, 10000);
            });
            const response = await Promise.race([fetchPromise, timeOutPromise]);

            return response;
        } catch (e) {
            return e;
        }
    }

    fetchApi = async (url, method, body, statusCode, token = null, base = null, loader = false) => {
        try {
            const headers = {}
            const result = {
                token: null,
                success: false,
                responseBody: null
            };
            if (token) {
                headers["x-auth"] = token;
            }

            const response = await api(url, method, body, headers);

            if (response.status === statusCode) {
                result.success = true;

                if (response.headers.get("x-auth")) {
                    result.token = response.headers.get("x-auth");
                }

                let responseBody;
                const responseText = await response.text();

                try {
                    responseBody = JSON.parse(responseText);
                } catch (e) {
                    responseBody = responseText;
                }

                result.responseBody = responseBody;
                return result;

            }

            let errorBody;
            const errorText = await response.text();

            try {
                errorBody = JSON.parse(errorText);
            } catch (e) {
                errorBody = errorText;
            }

            result.responseBody = errorBody;

            throw result;
        } catch (error) {
            return error;
        }
    }

}