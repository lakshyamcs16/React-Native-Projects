import React from 'react';
import {
    StyleSheet,
} from 'react-native';
import {
    StyledMaterialIcon,
    StyledAntDesign,
    StyledMaterialCommunityIcons,
    StyledIonicons
} from '../themes/styling';
import { ThemeProvider } from 'styled-components';

export function isJson(str) {
    try {        
        JSON.parse(str);
    } catch (e) {        
        return false;
    }
    return true;
}

export var getIcon = (item, props) => {    
    let icon;

    getSelectedIcon = (item) => {
        return item.active? styles.navBarIconSelected: styles.navBarIcon;
    }

    switch (item.iconSource) {
        case "Ionicons": icon = (
            <StyledIonicons
                name={item.icon}
                size={25}
                style={this.getSelectedIcon(item)}></StyledIonicons>
        ); break;
        case "AntDesign": icon = (
            <StyledAntDesign
                name={item.icon}
                size={25}
                style={this.getSelectedIcon(item)}></StyledAntDesign>
        ); break;
        case "MaterialIcons": icon = (
            <StyledMaterialIcon
                name={item.icon}
                size={25}
                style={this.getSelectedIcon(item)}></StyledMaterialIcon>
        ); break;
        case "MaterialCommunityIcons": icon = (
            <StyledMaterialCommunityIcons
                name={item.icon}
                size={25}
                style={this.getSelectedIcon(item)}></StyledMaterialCommunityIcons>
        );
    }

    return (
        <ThemeProvider theme={props.theme}>
            {icon}
        </ThemeProvider>
    )
}

export const nFormatter = (num, digits) => {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "m" },
      { value: 1E9, symbol: "g" },
      { value: 1E12, symbol: "t" },
      { value: 1E15, symbol: "p" },
      { value: 1E18, symbol: "e" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }

const styles = StyleSheet.create({
    navBarIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    navBarIconSelected: {
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 0,
        // iOS
        shadowOffset: {
            width: -1,            // These can't both be 0
            height: -1,           // i.e. the shadow has to be offset in some way
        },
    }
});