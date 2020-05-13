import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    Animated,
    Keyboard,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ThemeProvider } from "styled-components";
import { NormalText } from '../../themes/styling';

class Logo extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            transition: "zoomIn"
        }
    }

    UNSAFE_componentWillMount() {
        this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
        this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
    }

    componentWillUnmount() {
        this.keyboardDidShowListener.remove();
        this.keyboardDidHideListener.remove();
    }

    _keyboardDidShow = (event) => {
        this.setState({
            transition: "zoomOut"
        })
    };

    _keyboardDidHide = (event) => {
        this.setState({
            transition: "zoomIn"
        })
    };
    render() {
        return (
            <ThemeProvider theme={this.props.theme.theme}>
            <View style={styles.container}>
                {
                    this.props.logo.text ?
                        <NormalText 
                            style={{
                            fontSize: 100, 
                            fontWeight: 'bold',
                        }}>{this.props.logo.text}</NormalText>

                        :
                        <Image />
                }
            </View>
            </ThemeProvider>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    }
});

export default Logo;