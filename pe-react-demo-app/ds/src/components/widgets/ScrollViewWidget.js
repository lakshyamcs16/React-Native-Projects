import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Alert
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { base } from '../../themes/theme';
import { nFormatter } from '../../utilities/Utilities';
import { fetchWidgetData, dataRequest } from '../../redux/actions/dashboard/main.actions';
import { GENERIC_DATA_ERROR } from '../../utilities/Constants';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
var hash = require('object-hash');

class ScrollViewWidget extends Component<{}> {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    async componentDidMount() {

        const headers = {
            "Authorization": "Basic amFzc2luZ2hAaXZwLmluOnBhc3N3b3Jk",
        };

        const body = {
            "Select": {
                "'Entity State'": 1,
                "Probability": "sum(Probability)",
                "Amount": "sum(Amount)",
                "ExpectedRevenue": "sum(ExpectedRevenue)"
            },
            "GroupBy": {
                "'Entity State'": 1
            }
        };

        var params = {
            headers: headers,
            body: body,
            token: this.props.token
        };

        const response = await this.props.fetchWidgetData(params);

        try {
            if (!response.success) {
                throw response;
            } else {
                this.setState({
                    data: response.body
                });
            }
        } catch (error) {
            Alert.alert(
                'Data Error',
                GENERIC_DATA_ERROR,
                [
                    {
                        text: 'Okay',
                        onPress: () => console.log('Okay Pressed'),
                        style: 'cancel',
                    },
                ]
            );
        }
    }

    getFontSize = (col, key) => {
        switch (key) {
            case "large":
                return base.FONT_SIZE_GIANT;
            case "small":
                return base.FONT_SIZE_EXTRA_LARGE;
            case "very small":
                return base.FONT_SIZE_MEDIUM;
            default:
                return base.FONT_SIZE_SMALL;
        }
    }

    getFormattedNumber = (number, prec = "", dPrec = 0) => {
        if(isNaN(number)) {
            return 0.0;
        }        
        return nFormatter(number, prec, dPrec);
    }

    getText = (item, col) => {
        switch (col.renderer) {
            case "basic":
                return (
                    <Text style={[
                        {
                            color: this.props.theme.theme.PRIMARY_TEXT_COLOR,
                            fontSize: this.getFontSize(col, col.layout.value.size),
                            textAlign: 'center'
                        },
                        styles.keyStyle]}
                        numberOfLines={1}>
                        {
                            col.layout.value.type === "number" ?
                                this.getFormattedNumber(item[col.keyField], col.layout.value.numberFormat, col.layout.value.decimalPrecision) :
                                item[col.keyField]
                        }
                    </Text>)

            default:
                break;
        }
    }

    formatText = (text, col) => {
        if(col.layout && col.layout.value && col.layout.value.from) {
            
            switch (col.layout.value.from) {
                case "config":                    
                    return col.valueField;
                case "data": 
                    return text[col.valueField];            
                default:
                    break;
            }
        }else{
            return text[col.valueField];
        }
    }

    getSubText = (item, col) => {
        switch (col.renderer) {
            case "basic":
                return (
                    <Text style={[
                        {
                            color: this.props.theme.theme.PRIMARY_TEXT_COLOR_LIGHT,
                            fontSize: this.getFontSize(col, col.layout.label.size),
                            textAlign: 'center'
                        },
                        styles.keyStyle]}
                        numberOfLines={2}>
                        {this.formatText(item, col)}
                    </Text>)

            default:
                break;
        }
    }

    getCardViews = (item) => {
        return this.props.wConfig.columns.map((col, id) => {
            return (
                <View key={id} style={[{ flex: col.width || 1, paddingLeft: 5 }, styles.columnStyle]}>
                    {this.getText(item, col)}
                    {this.getSubText(item, col)}
                </View>
            )
        })
    }

    getColorForColumns = (data, config) => {        
        if(config.colorOnField) {
            return config.colorsToDataMap[data[config.colorOnField]] || "#000";
        }else{
            return this.props.theme.theme.PRIMARY_BORDER_COLOR || "#000";
        }
    }

    async getKeyHash(key) {
        if(typeof key !== "object") {
            return key;
        }     
        return hash(key);
    }

    getCards = (item) => {

        return (<TouchableOpacity><View key={this.getKeyHash(item._id)} style={[
            {
                flexDirection: 'row',
                backgroundColor: this.props.theme.theme.PRIMARY_BORDER_COLOR_LIGHT,
                borderRadius: 5,
                borderLeftWidth: 5,
                borderLeftColor: this.getColorForColumns(item, this.props.wConfig),
            },
            styles.cardContainer]}>
            {this.getCardViews(item)}
        </View></TouchableOpacity>)

    }

    render() {
        return (
            this.state.data.length > 0 &&
            <SwipeListView style={[styles.container]}
                data={this.state.data}
                renderItem={(data, rowMap) => (
                    this.getCards(data.item)
                )}
                keyExtractor={(data, index) => index}
                // renderHiddenItem={(data, rowMap) => (
                //     <View style={styles.rowBack} key={this.getKeyHash(data.item._id)}>

                //         <Text></Text>
                //         <Text></Text>
                //     </View>
                // )}
                // leftOpenValue={1}
                // rightOpenValue={-1}
            />


        );
    }
}

const styles = StyleSheet.create({
    container: {
        margin: 5
    },
    cardContainer: {
        margin: 1,
        paddingVertical: 20
    },
    columnStyle: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'baseline'
    },
    keyStyle: {
        alignItems: 'baseline',
    },
    forwardArrow: {
        marginRight: 20,
        marginTop: 30
    },
    rowBack: {
        alignItems: 'center',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        margin: 1,
        borderRadius: 5
    }
});

const mapStateToProps = (state) => {
    return {
        data: state.dataDetails.data,
        token: state.authenticationDetails.user_details.token
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        fetchWidgetData: (params) => dispatch(fetchWidgetData(params)),
        dataRequest: () => dispatch(dataRequest())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(ScrollViewWidget);