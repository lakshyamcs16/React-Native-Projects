import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { base } from '../../themes/theme';
import { nFormatter } from '../../utilities/Utilities';
import { StyledIonicons } from '../../themes/styling';

export class ScrollViewWidget extends Component<{}> {

    constructor(props) {
        super(props);
        console.log(props.theme.theme.PRIMARY_TEXT_COLOR);

        this.state = {
            data: [
                {
                    _id: "1",
                    countOfDeals: 16,
                    stageName: 'Due Diligence',
                    faceValueNumeric: 218000000,
                    faceValueText: 'Face Value',
                    equityNumeric: 86900000,
                    equityText: 'Equity',
                    stageColor: '#4c00a8'
                },
                {
                    _id: "2",
                    countOfDeals: 3,
                    stageName: 'Pending Close',
                    faceValueNumeric: 25300000,
                    faceValueText: 'Face Value',
                    equityNumeric: 17500000,
                    equityText: 'Equity',
                    stageColor: '#6b432e'
                },
                {
                    _id: "3",
                    countOfDeals: 5,
                    stageName: 'Active',
                    faceValueNumeric: 104600000,
                    faceValueText: 'Face Value',
                    equityNumeric: 45500000,
                    equityText: 'Equity',
                    stageColor: '#00ccb4'
                },
                {
                    _id: "4",
                    countOfDeals: 18,
                    stageName: 'Initial Review',
                    faceValueNumeric: 453300000,
                    faceValueText: 'Face Value',
                    equityNumeric: 161000000,
                    equityText: 'Equity',
                    stageColor: '#b587d4'
                },
                {
                    _id: "5",
                    countOfDeals: 3,
                    stageName: 'Dead',
                    faceValueNumeric: 4800000,
                    faceValueText: 'Face Value',
                    equityNumeric: 1200000,
                    equityText: 'Equity',
                    stageColor: '#cf6132'
                },
                {
                    _id: "6",
                    countOfDeals: 12,
                    stageName: 'Initial Review',
                    faceValueNumeric: 863300000,
                    faceValueText: 'Face Value',
                    equityNumeric: 231000000,
                    equityText: 'Equity',
                    stageColor: '#b587d4'
                },
                
            ]
        }
    }

    componentDidMount() {
        //make data service request

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

    getFormattedNumber = (number, prec) => {
        switch (prec) {
            case "M":
                return nFormatter(number, 1)
            default:
                break;
        }
    }

    getText = (item, col) => {
        switch (col.renderer) {
            case "basic":
                return (
                    <Text style={[
                        {
                            color: this.props.theme.theme.PRIMARY_TEXT_COLOR,
                            fontSize: this.getFontSize(col, col.layout.value.size)
                        },
                        styles.keyStyle]}>
                        {
                            col.layout.value.type === "number" ?
                                this.getFormattedNumber(item[col.keyField], "M") :
                                item[col.keyField]
                        }
                    </Text>)

            default:
                break;
        }
    }

    getSubText = (item, col) => {
        switch (col.renderer) {
            case "basic":
                return (
                    <Text style={[
                        {
                            color: this.props.theme.theme.PRIMARY_TEXT_COLOR_LIGHT,
                            fontSize: this.getFontSize(col, col.layout.label.size)
                        },
                        styles.keyStyle]}>
                        {item[col.valueField]}
                    </Text>)

            default:
                break;
        }
    }

    getCardViews = (item) => {
        return this.props.wConfig.columns.map((col, id) => {
            return (
                <View key={id} style={[{ flex: col.width || 1 }, styles.columnStyle]}>
                    {this.getText(item, col)}
                    {this.getSubText(item, col)}
                </View>
            )
        })
    }

    getCards = () => {
        return this.state.data.map(item => {
            return (<View key={item._id} style={[
                { 
                    flexDirection: 'row',
                    backgroundColor: this.props.theme.theme.PRIMARY_BORDER_COLOR_LIGHT,
                    borderRadius: 5,
                    borderLeftWidth: 5,
                    borderLeftColor: item.stageColor
                }, 
                styles.cardContainer]}>
                {this.getCardViews(item)}
                <TouchableOpacity><StyledIonicons
                        size={30}
                        name="ios-arrow-forward"
                        style={styles.forwardArrow}
                        /></TouchableOpacity>
            </View>)
        })
    }

    render() {
        return (
            <ScrollView style={[styles.container]}>
                {
                    this.getCards()
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container:{
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
    forwardArrow:{ 
        marginRight: 20,
        marginTop: 30
    }
})