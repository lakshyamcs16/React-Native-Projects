import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import {
  StyleSheet,
  View,
} from 'react-native';

export default class DropDown extends Component{ 
    createDropDown = () => {
        const { config, data } = this.props;
        const { values } = config;
        if(values && Array.isArray(values)) {
            let dropDowns = values.map(val => {
                let set = new Set();
                let dropdownData = [];
                for(let i=0; i<data.length; i++) {
                    if(!set.has(data[i][val.value]) && data[i][val.value]) {
                        dropdownData.push({
                            value: data[i][val.value]
                        });
                        set.add(data[i][val.value]);
                    }
                }
                return <Dropdown label={val.label} data={dropdownData} useNativeDriver={true} containerStyle={{ width: 150, marginHorizontal: 15, justifyContent: 'flex-end'}}/>
            })

            return dropDowns;
        }else{
            return null;
        }
    }

    render() {
        return (
            <View>{this.createDropDown()}</View>
            
        );
    }
    
}