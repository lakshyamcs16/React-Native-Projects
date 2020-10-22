import React, { Component } from 'react';
import { Dropdown } from 'react-native-material-dropdown';
import {
  View,
} from 'react-native';

export default class DropDown extends Component{ 
    createDropDown = () => {
        const { config, data } = this.props;
        console.log(data);
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
                console.log(this.props);
                return <Dropdown 
                label={val.label || ""} 
                data={dropdownData} 
                useNativeDriver={true} 
                pickerStyle={{borderBottom: 0}}
                inputContainerStyle={this.props.inputContainerStyle}
                value={data[0][val.value]}
                containerStyle={this.props.containerStyle}/>
            })

            return dropDowns;
        }else{
            return null;
        }
    }

    render() {
        return (
            this.createDropDown()
            
        );
    }
    
}