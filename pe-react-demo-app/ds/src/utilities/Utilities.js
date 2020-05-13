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
    switch (item.iconSource) {
        case "Ionicons": icon = (
            <StyledIonicons
                name={item.icon}
                size={25}
                style={styles.navBarIcon}></StyledIonicons>
        ); break;
        case "AntDesign": icon = (
            <StyledAntDesign
                name={item.icon}
                size={25}
                style={styles.navBarIcon}></StyledAntDesign>
        ); break;
        case "MaterialIcons": icon = (
            <StyledMaterialIcon
                name={item.icon}
                size={25}
                style={styles.navBarIcon}></StyledMaterialIcon>
        ); break;
        case "MaterialCommunityIcons": icon = (
            <StyledMaterialCommunityIcons
                name={item.icon}
                size={25}
                style={styles.navBarIcon}></StyledMaterialCommunityIcons>
        );
    }

    return (
        <ThemeProvider theme={props.theme}>
            {icon}
        </ThemeProvider>
    )
}

const styles = StyleSheet.create({
    navBarIcon: {
        justifyContent: 'center',
        alignItems: 'center',
    }
});