import {authenticationReducer} from "./authentication/auth.reducer";
import {navigationReducer} from "./dashboard/navigation.reducer";
import {themeReducer} from "./themes/themes.reducer";
import {dataReducer, dashboardReducer} from './dashboard/main.reducer';

export class Reducers {
    constructor() {
        this.reducers = {
            authenticationDetails: authenticationReducer,
            navigationDetails: navigationReducer,
            dataDetails: dataReducer,
            dashboardDetails: dashboardReducer,
            themeDetails: themeReducer
        };
    }

    getReducer = () => {
        return this.reducers;
    }

    setReducer = (reducerObj) => {
        this.reducers = {
            ...this.reducers,
            reducerObj
        };
    }
}
