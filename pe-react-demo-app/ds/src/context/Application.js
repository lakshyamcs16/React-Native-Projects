import { Reducer } from 'react-native-router-flux';
import Service from '../services/Services';
import { DEFAULT_APP_CTX } from '../utilities/Constants';

export default class Application {
    constructor() {
        this.services = {},
        this.reducers = new Reducer(),
        this.widgets = {},
        this.applicationContext = this;

        this.services[DEFAULT_APP_CTX] = new Service()
    }

    registerWidget = (widget, widgetObj) => {
        this.widgets[widget] = widgetObj;
        return this;
    }

    getWidget = (widget) => {
        console.log('----------$%@#$@#$@#$@#$@#$----------------')
        console.log(this.widgets);
        console.log('----------$%@#$@#$@#$@#$@#$----------------')

        return this.widgets[widget];
    }

    registerReducers = (reducerObj) => {
        this.reducers.setReducer(reducerObj);
        return this;
    }

    getReducers = () => {
        return this.reducers;
    }

    registerService = (serviceContext = this.services.DEFAULT_APP_CTX, serviceObject) => {
        this.services =  {};
        this.services[serviceContext] = serviceObject;
        return this;
    }

    getService = (serviceContext) => {
        return this.services[serviceContext];
    }

    registerApplication = (applicationContext) => {
        this.applicationContext = applicationContext;
    }

    getApplicationContext = () => {
        return this.applicationContext;
    }
}