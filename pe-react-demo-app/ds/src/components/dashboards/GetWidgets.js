import React, { Component } from 'react';
import {
    ActivityIndicator, Text
} from 'react-native-paper';
import { COMPONENT, PROPS } from '../../utilities/Constants';
import { application } from "../../../App";

export const GetWidgets = (props) => {
    
    if (Object.keys(props.wConfig).length > 0) {
        let widget = application.getWidget(props.wConfig.type);
        let customProps = widget[PROPS];
        let component = widget[COMPONENT];
        console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@PROPS#@@@@@@@@@@@@@@@@@@@@@@`);
        console.log(props);
        console.log(`@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@PROPS#@@@@@@@@@@@@@@@@@@@@@@`);

        widget = React.cloneElement(component, {...props, customProps})
        return (
            widget
        );
        switch (props.wConfig.type) {
            // case WIDGET_TYPE_SCROLLVIEW:                   
            //     return <ScrollViewWidget wConfig={props.wConfig} theme={props.theme} service={props.service}/>
            // case DASHBOARD_TYPE_SCROLLVIEW:
            //     return <DashboardScrollViewWidget wConfig={props.wConfig} theme={props.theme} id={props.id} prevData={props.data}/>
            // case WIDGET_TYPE_NUMBER_STAMP:
            //     return <NumberStampWidget wConfig={props.wConfig} theme={props.theme} id={props.id} prevData={props.data}/>
            // case WIDGET_TYPE_KEY_INFO:
            //     return <KeyInfoWidget wConfig={props.wConfig} theme={props.theme} id={props.id} prevData={props.data}/>
            // case WIDGET_TYPE_TOP_BOTTOM:
            //     return <TopBottom wConfig={props.wConfig} theme={props.theme} id={props.id} prevData={props.data}/>
            // default:
            //     break;
        }
    } else {
        return (<ActivityIndicator></ActivityIndicator>);
    }

}