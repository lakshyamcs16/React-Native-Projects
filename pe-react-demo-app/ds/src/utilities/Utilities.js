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
import { Actions } from 'react-native-router-flux';

var hash = require('object-hash');
var mustache = require("mustache");
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

export const getKeyHash = (key) => {
    if (typeof key !== "object") {
        return key;
    }
    return hash(key);
}

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
        return item.active ? styles.navBarIconSelected : styles.navBarIcon;
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

export const nFormatter = (num, precision = "", digits = 0) => {
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i = 0;
    if (precision === "auto") {
        var si = [
            { value: 1, symbol: "" },
            { value: 1E3, symbol: "k" },
            { value: 1E6, symbol: "m" },
            { value: 1E9, symbol: "g" },
            { value: 1E12, symbol: "t" },
            { value: 1E15, symbol: "p" },
            { value: 1E18, symbol: "e" }
        ];

        for (i = si.length - 1; i > 0; i--) {
            if (num >= si[i].value) {
                break;
            }
        }
    } else {
        var si = [];
        switch (precision) {
            case "k":
                si.push({ value: 1E3, symbol: "k" }); break;
            case "m":
                si.push({ value: 1E6, symbol: "m" }); break;
            case "g":
                si.push({ value: 1E9, symbol: "g" }); break;
            case "t":
                si.push({ value: 1E12, symbol: "t" }); break;
            case "p":
                si.push({ value: 1E15, symbol: "p" }); break;
            case "e":
                si.push({ value: 1E18, symbol: "e" }); break;
            default:
                si.push({ value: 1, symbol: "" }); break;
        }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
}

export const getFilledObject = (obj, config) => {
    if (obj.Where && config.Where) {
        switch (config.Where) {
            case "props":
                config.Where = obj.Where;
                return config;
            default:
                return config;
        }
    }

    return config;
}

export const getAction = (config, id, data, token, parameters) => {

    var paramsToReturn = {
        token: token
    };

    if (config.click) {
        bindAction(config.click);
    }

    if (config.swipeLeft) {

    }

    if (config.swipeRight) {

    }

    function bindAction(action) {

        switch (action.type) {

            case "navigate":
                performNavigationAction(action.params);
                break;

            default:
                break;
        }
    }

    function performNavigationAction(typeParams) {        
        if (typeParams.type === "dashboard") {
            var body = {}, st;
            const { dashboardId } =  typeParams ;
            paramsToReturn['dashboardId'] = dashboardId;
            let { params } = typeParams ;
            
            if (params.filter) {
                const filteredData = data.filter(d => {
                    return getKeyHash(d._id) == id
                });
                
                if (filteredData && filteredData.length > 0) {                    
                    st = mustache.render(JSON.stringify(params.filter), filteredData[0]);
                }

            }

            body = {
                "body": JSON.parse(entities.decode(st))
            }

            paramsToReturn.service = body;
            parameters.navigate(paramsToReturn);
           

        }
        
    }
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