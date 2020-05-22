import React, { Component } from 'react';
import {
    ActivityIndicator
} from 'react-native-paper';
import { WIDGET_TYPE_SCROLLVIEW, DASHBOARD_TYPE_SCROLLVIEW } from '../../utilities/Constants';
import ScrollViewWidget from '../widgets/ScrollViewWidget';
import DashboardScrollViewWidget from '../widgets/DashboardScrollViewWidget';

export const GetWidgets = (props) => {

    if (Object.keys(props.wConfig).length > 0) {
        switch (props.wConfig.type) {
            case WIDGET_TYPE_SCROLLVIEW:                   
                return <ScrollViewWidget wConfig={props.wConfig} theme={props.theme} service={props.service}/>
            case DASHBOARD_TYPE_SCROLLVIEW:
                return <DashboardScrollViewWidget wConfig={props.wConfig} theme={props.theme} service={props.service}/>
            default:
                break;
        }
    } else {
        return (<ActivityIndicator></ActivityIndicator>);
    }

}