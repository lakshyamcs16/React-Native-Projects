import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import DropDown from './DropDown';
import Toggle from './Toggle';
import Value from './Value';

export default class TopWidgetConfiguration extends Component{ 

   createWidget = () => {
        const { config, data } = this.props;
        if(config && Array.isArray(config)) {
            return (
                config.map(item => {
                    switch (item.type) {
                        case "dropdown":
                            return <DropDown data={data} config={item}/>
                        case "value":
                            return <Value data={data} config={item}/>
                            case "toggle":
                                return <Toggle data={data} config={item}/>
                        default:
                            break;
                    }
                })
            );
        }
        
        return null;
        
   } 

   render() {
        return (
        <View style={{ flexDirection: 'row'}}>{ this.createWidget() }</View>
            
        );
    }
    
}