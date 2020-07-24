import React from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import {
    StyledMaterialIcon,
    StyledAntDesign,
    StyledMaterialCommunityIcons,
    StyledIonicons
} from '../themes/styling';
import { ThemeProvider } from 'styled-components';
import { Actions } from 'react-native-router-flux';
import {
    getFormattedNumber
} from '../components/assets/scrollview/ScrollViewAssets';

var hash = require('object-hash');
var mustache = require("mustache");
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();


export const buildDataRequest = (dataConfig) => {
    let url = fetchUrl(dataConfig);
    url = addUrlParams(url, dataConfig.urlparams);

    return {
        url: url,
        body: dataConfig.params.body,
        method: "POST",
        isBaseUrlAbsent: false
    };
}

export const addUrlParams = (url, config) => {
    if (config) {
        url += '?';

        for (var key in config) {
            url += `${key}=${config[key]}&`
        }

        url = url.slice(0, -1);
    }

    return url;
}

export const fetchUrl = (config) => {
    if (config.baseurl) {
        return `${config.baseurl}/${config.datapoint}`
    }

    return config.datapoint;
}

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

export const filterDataOnId = (data, id) => {
    if(data && data[0]) {
        data = data.filter(v => id === getKeyHash(v._id))
        if(data && data.length > 0) {
            return data[0];
        }
    }

    return []
    
}

export const createCard = (config, data, styles, renderKey) => {
    let key = config.keyField;
    let layout = config.layout;
    let label = '';

    if(layout.label.enabled) {
        label = config.labelField;
    }

    return (
        <View key={renderKey} style={styles.keyStats}> 
            <Text style={styles.keyHeading}>{getFormattedNumber(data[key], layout.key.numberFormat, layout.key.decimalPrecision)}</Text>
            <Text style={styles.keySubHeading}>{data[label]}</Text>
        </View>
    );
}

export const getFilledObject = (id, data, body) => {
    
    const filteredData = data.filter(d => {
        return getKeyHash(d._id) == id
    });

    if (filteredData && filteredData.length > 0) {
        body = mustache.render(JSON.stringify(body), filteredData[0]);
    }

    if(typeof body === "string") {
        body = JSON.parse(entities.decode(body));
    }

    return body;

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
            const { dashboardId } = typeParams;
            paramsToReturn['dashboardId'] = dashboardId;
            paramsToReturn['data'] = data;
            paramsToReturn['id'] = id;
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