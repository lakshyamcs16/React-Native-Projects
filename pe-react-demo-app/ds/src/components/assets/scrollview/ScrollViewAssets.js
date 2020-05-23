import React from 'react';
import {
    Text,
    View,
} from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { base } from '../../../themes/theme';
import { nFormatter } from '../../../utilities/Utilities';
import { Actions } from 'react-native-router-flux';
var hash = require('object-hash');
var mustache = require("mustache");
const Entities = require('html-entities').XmlEntities;
const entities = new Entities();

var props, params, data;

export const getFontSize = (col, key) => {
    switch (key) {
        case "very large":
            return base.FONT_SIZE_GIANT;
        case "large":
            return base.FONT_SIZE_SUPER;
        case "medium":
            return base.FONT_SIZE_EXTRA_LARGE;
        case "small":
            return base.FONT_SIZE_EXTRA_LARGE;
        case "very small":
            return base.FONT_SIZE_MEDIUM;
        default:
            return base.FONT_SIZE_SMALL;
    }
}

export const getFormattedNumber = (number, prec = "", dPrec = 0) => {
    if (isNaN(number)) {
        return 0.0;
    }
    return nFormatter(number, prec, dPrec);
}

export const getText = (item, col) => {
    switch (col.renderer) {

        case "basic":
            return (
                <Text style={[
                    {
                        color: this.props.theme.theme.PRIMARY_TEXT_COLOR,
                        fontSize: getFontSize(col, col.layout.value.size),
                        textAlign: 'center'
                    },
                    this.params.styles.keyStyle]}
                    numberOfLines={1}>
                    {
                        col.layout.value.type === "number" ?
                            getFormattedNumber(item[col.keyField], col.layout.value.numberFormat, col.layout.value.decimalPrecision) :
                            item[col.keyField]
                    }
                </Text>)
        case "initials":
            return (
                <Text style={[
                    {
                        color: this.props.theme.theme.SECONDARY_TEXT_COLOR,
                        fontSize: getFontSize(col, col.layout.value.size),
                        textAlign: 'center'
                    },
                    this.params.styles.keyStyle]}
                    numberOfLines={1}>
                    {
                        col.layout.value.type === "number" ?
                            getFormattedNumber(item[col.keyField], col.layout.value.numberFormat, col.layout.value.decimalPrecision) :
                            item[col.keyField].substring(0, 2).toUpperCase()
                    }
                </Text>)
        default:
            break;
    }
}

export const formatText = (text, col) => {
    if (col.layout && col.layout.value && col.layout.value.from) {

        switch (col.layout.value.from) {
            case "config":
                return col.valueField;
            case "data":
                return text[col.valueField];
            default:
                break;
        }
    } else {
        return text[col.valueField];
    }
}

export const getSubText = (item, col) => {
    switch (col.renderer) {
        case "basic":
            return (
                <Text style={[
                    {
                        color: this.props.theme.theme.PRIMARY_TEXT_COLOR_LIGHT,
                        fontSize: getFontSize(col, col.layout.label.size),
                        textAlign: 'center'
                    },
                    this.params.styles.keyStyle]}
                    numberOfLines={2}>
                    {formatText(item, col)}
                </Text>)
        case "initials":
            return (
                <Text style={[
                    {
                        color: this.props.theme.theme.PRIMARY_TEXT_COLOR,
                        fontSize: getFontSize(col, col.layout.label.size),
                        textAlign: 'center',
                        fontWeight: 'bold'
                    },
                    this.params.styles.keyStyle]}
                    numberOfLines={2}>
                    {formatText(item, col)}
                </Text>)
        default:
            break;
    }
}

export const getCardViews = (item, columns) => {
    return columns.map((col, id) => {
        return (
            <View key={id} style={[{ flex: col.width || 1, paddingLeft: 5 }, this.params.styles.columnStyle]}>
                {col.layout.label.position === "top" && getSubText(item, col)}
                {getText(item, col)}
                {col.layout.label.position === "bottom" && getSubText(item, col)}
            </View>
        )

    })
}

export const getColorForColumns = (data, config, t) => {    
    if (config.colorOnField) {
        return config.colorsToDataMap[data[config.colorOnField]] || "#000";
    } else {
        return this.props.theme.theme.PRIMARY_BORDER_COLOR || "#000";
    }
}

export const getKeyHash = (key) => {
    if (typeof key !== "object") {
        return key;
    }
    return hash(key);
}

export const getCardViewWithInitials = (item, initials) => {
    var cols = this.props.wConfig.columns;

    return(<>
        <View style={{flex: 1}}>
            <View style={{
                flex: 1, 
                backgroundColor: getColorForColumns(item, this.props.wConfig, true), 
                alignItems: 'center', 
                justifyContent: 'center', 
                height: 80, 
                width: 80, 
                borderRadius: 40,
                marginLeft: 15
                }}>
                { getText(item, initials) }
            </View>
        </View>
        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center',alignSelf: 'center'}}>
            <View style={{ flex: 1, marginBottom: 5}}>
                {getSubText(item, initials)}
            </View>
            <View style={{ flex: 1, flexDirection: 'row'}}>
            {getCardViews(item, cols)}
            </View>
        </View>
    </>);
}

export const getInnerView = (item) => {
    if(this.props.wConfig.initials) {
        return getCardViewWithInitials(item, this.props.wConfig.initials);
    }else{
        return getCardViews(item, this.props.wConfig.columns);
    }
}

export const getCards = (item, props, data, params) => {

    this.props = props;
    this.params = params;
    this.data = data;


    return (<TouchableOpacity
        onPress={params.onPressHandler ? () => params.onPressHandler(item) : () => false}
        disabled={params.onPressHandler ? false : true}
    >

        <View
            key={getKeyHash(item._id)}
            style={[
                {
                    flexDirection: 'row',
                    backgroundColor: props.theme.theme.PRIMARY_BORDER_COLOR_LIGHT,
                    //borderRadius: 5,
                    borderLeftWidth: 15,
                    borderBottomWidth: 1,
                    borderBottomColor: props.theme.theme.PRIMARY_BORDER_COLOR_LIGHT,
                    borderLeftColor: getColorForColumns(item, this.props.wConfig),
                },
                params.styles.cardContainer]}>
            {getInnerView(item)}
        </View>
    </TouchableOpacity>)

}