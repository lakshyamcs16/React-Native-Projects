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
            <View style={styles.container}>
                {
                    this.props.logo.text ?
                        <Animatable.Text 
                            style={{
                            fontSize: 100, 
                            fontWeight: 'bold',
                            color: '#555555'
                        }}>{this.props.logo.text}</Animatable.Text>

                        :
                        <Image />
                }
            </View>
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