import { Reducer } from 'react-native-router-flux';
import Service from '../services/Services';
import { DEFAULT_APP_CTX } from '../utilities/Constants';
import React from 'react';
import Application from '../../contracts/Application';
import User from './User';

/*
        create user module
        instantiate all the logins
*/

export class ResterApplication implements Application {
    services: object;
    reducers: Reducer;
    widgets: object;
    user: User;

    constructor() {
        this.services = {},
        this.reducers = new Reducer(),
        this.widgets = {},
        this.services[DEFAULT_APP_CTX] = new Service(),
        this.user = new User();

    }

    registerWidget = (widget: string, widgetObj: object) => {
        if(!React.isValidElement(widgetObj['component'])) {
            throw new Error('Object is not a valid React component')
        }
        this.widgets[widget] = widgetObj;
        return this;
    }

    getWidget = (widget: string) => {
        return this.widgets[widget];
    }

    registerReducers = (reducerObj: Reducer) => {
        this.reducers.setReducer(reducerObj);
        return this;
    }

    getReducers = () => {
        return this.reducers;
    }

    registerService = (serviceContext: string = this.services[DEFAULT_APP_CTX], serviceObject: Service) => {
        this.services =  {};
        this.services[serviceContext] = serviceObject;
        return this;
    }

    getService = (serviceContext: string) => {
        return this.services[serviceContext];
    }

    getCurrentUser = (): User => {
        return this.user;
    }

    setCurrentUser = (user: User) => {
        this.user = user;
        return this;
    }
}