import Service from './Service';
import Reducer from './Reducer';
import User from './User';

export default interface Application {
    registerWidget(widget: string, widgetObj: object);
    getWidget(widget: string): object;
    registerReducers(reducerObj: Reducer);
    getReducers(): Reducer;
    registerService(serviceContext: string, serviceObject: Service);
    getService(serviceContext: string);
    getCurrentUser(): User;
    setCurrentUser(user: User);
}