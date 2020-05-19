import React, { Component } from 'react';
import {
    ActivityIndicator
} from 'react-native-paper';
import { WIDGET_TYPE_SCROLLVIEW } from '../../utilities/Constants';
import ScrollViewWidget from '../widgets/ScrollViewWidget';

export const GetWidgets = (props) => {

    if (Object.keys(props.wConfig).length > 0) {
        switch (props.wConfig.type) {
            case WIDGET_TYPE_SCROLLVIEW:                
                return <ScrollViewWidget wConfig={props.wConfig} theme={props.theme} />
                break;
            default:
                break;
        }
    } else {
        return (<ActivityIndicator></ActivityIndicator>);
    }

}