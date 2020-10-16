import Service from './Service';
import Reducer from './Reducer';

export default interface Application {
    registerWidget(widget: string, widgetObj: object): Application;
    getWidget(widget: string): object;
    registerReducers(reducerObj: Reducer): Application;
    getReducers(): Reducer;
    registerService(serviceContext: string, serviceObject: Service);
    getService(serviceContext: string);
}