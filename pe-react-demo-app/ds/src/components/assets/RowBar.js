import React, { Component } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'

export default class Bar extends Component{
    render() {
        return (
            <View style={styles.barContainer}>
                <View style={[styles.greenBar, {width: this.props.barWidths.greenBarWidth}]}></View>
                <View style={[styles.redBar, {width: this.props.barWidths.redBarWidth}]}></View>
            </View>
        );
    }
    
}

const styles = StyleSheet.create({

    barContainer: {
        flexDirection: 'row'
    },
    greenBar:{
        backgroundColor: 'rgba(31,202,128, 1)',
        borderRightWidth: 2,
        borderRightColor: '#fff',
        height: 10
    },
    redBar:{
        backgroundColor: 'rgba(237, 84, 73, 1)',
        height: 10
    }
});