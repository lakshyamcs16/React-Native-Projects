import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
} from 'react-native';

class Logo extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                {
                    this.props.logo.text ?
                        <Text style={styles.textContainer}>{this.props.logo.text}</Text>
                    :
                        <Image />
                }
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    textContainer: {
        fontSize: 100,
        fontWeight: 'bold',
        color: '#555555'
    }
});

export default Logo;