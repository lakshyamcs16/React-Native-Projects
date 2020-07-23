import React, { Component } from 'react';
import {
    ActivityIndicator, Text
} from 'react-native-paper';
import { WIDGET_TYPE_SCROLLVIEW, DASHBOARD_TYPE_SCROLLVIEW, WIDGET_TYPE_NUMBER_STAMP, WIDGET_TYPE_KEY_INFO } from '../../utilities/Constants';
import ScrollViewWidget from '../widgets/ScrollViewWidget';
import DashboardScrollViewWidget from '../widgets/DashboardScrollViewWidget';
import NumberStampWidget from '../widgets/NumberStampWidget';
import KeyInfoWidget from '../widgets/KeyInfoWidget';

export const GetWidgets = (props) => {
    
    if (Object.keys(props.wConfig).length > 0) {
        switch (props.wConfig.type) {
            case WIDGET_TYPE_SCROLLVIEW:                   
                return <ScrollViewWidget wConfig={props.wConfig} theme={props.theme} service={props.service}/>
            case DASHBOARD_TYPE_SCROLLVIEW:
                return <DashboardScrollViewWidget wConfig={props.wConfig} theme={props.theme} id={props.id} prevData={props.data}/>
            case WIDGET_TYPE_NUMBER_STAMP:
                return <NumberStampWidget wConfig={props.wConfig} theme={props.theme} id={props.id} prevData={props.data}/>
            case WIDGET_TYPE_KEY_INFO:
                return <KeyInfoWidget wConfig={props.wConfig} theme={props.theme} id={props.id} prevData={props.data}/>
            default:
                break;
        }
    } else {
        return (<ActivityIndicator></ActivityIndicator>);
    }

}