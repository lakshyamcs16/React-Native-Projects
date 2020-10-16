import React, { Component } from 'react';
import {
    ActivityIndicator, Text
} from 'react-native-paper';
import { COMPONENT, PROPS } from '../../utilities/Constants';
import { application } from "../../../index";

export const GetWidgets = (props) => {
    
    if (Object.keys(props.wConfig).length > 0) {
        let widget = application.getWidget(props.wConfig.type);
        //let widget = application.getWidget('Snackbar');

        let customProps = widget[PROPS];
        let component = widget[COMPONENT];
        props = {...props, ...customProps}

        widget = React.cloneElement(component, {...props, customProps})
        return (
            widget
        );
    } else {
        return (<ActivityIndicator></ActivityIndicator>);
    }

}