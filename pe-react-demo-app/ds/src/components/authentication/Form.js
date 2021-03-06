import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
    Alert
} from 'react-native';
import { connect } from 'react-redux';
import {ThemeProvider} from "styled-components";
import { authenticateUser, authenticateUserRequest } from '../../redux/actions/authentication/auth.actions'
import {LoginTextInput} from '../../themes/styling';

class Form extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            buttonOpacity: 0.2
        },

            this.handleChange = this.handleChange.bind(this);
    }

    validateInput = () => {
        if (this.state.username.length > 0 && this.state.password.length > 0) {
            this.setState({
                buttonOpacity: 0.7
            })
            return true;
        } else {
            this.setState({
                buttonOpacity: 0.2
            })
            return false;
        }
    }

    handleChange(value, name) {
        this.setState({ [name]: value }, this.validateInput);
    }

    authenticate = async () => {
        if (!this.validateInput()) return;
        this.props.authenticateUserRequest();
        var params = {
            username: this.state.username,
            password: this.state.password
        }
        const response = await this.props.authenticateUserDetails(params)

        try {
            if (!response.success) {
                throw response;
            }
        } catch (error) {
            Alert.alert(
                'Login error',
                ((error && error.body && error.body.message) || this.props.userAuth.error),
                [
                    {
                        text: 'Okay',
                        onPress: () => console.log('Cancel Pressed'),
                        style: 'cancel',
                    },
                ]
            );
        }
    }

    render() {
        
        return (
            <ThemeProvider theme={this.props.theme}>
                <View style={styles.container}>
                    <LoginTextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Username or email id"
                        onChangeText={e => this.handleChange(e, "username")}
                        value={this.state.username}
                        keyboardType="email-address"
                        onSubmitEditing={() => this.password.focus()}
                    />
                    <LoginTextInput
                        underlineColorAndroid='rgba(0,0,0,0)'
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={e => this.handleChange(e, "password")}
                        value={this.state.password}
                        ref={(input) => this.password = input}
                        onSubmitEditing={this.authenticate}
                    />
                    <TouchableOpacity
                        style={[styles.button, { backgroundColor: `rgba(14, 110, 173, ${this.state.buttonOpacity})` }]}
                        onPressOut={this.authenticate}
                        disabled={this.state.username.length < 1 || this.state.password.length < 1}
                    >
                        {this.props.userAuth.loading ?
                            (<ActivityIndicator
                                animating={true}
                                style={styles.buttonText}
                                size={21}
                                color="#fff">
                            </ActivityIndicator>
                            ) :
                            (
                                <Text style={styles.buttonText}>
                                    Log In
                                </Text>

                            )
                        }
                    </TouchableOpacity>
                </View>
            </ThemeProvider>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 20
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center'
    },
    button: {
        backgroundColor: 'rgba(14, 110, 173, 0.7)',
        borderRadius: 6,
        alignSelf: 'stretch',
        marginVertical: 8,
        paddingVertical: 15,

    }
});

const mapStateToProps = (state) => {
    return {
        userAuth: state.authenticationDetails,
        theme: state.themeDetails
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        authenticateUserDetails: (params) => dispatch(authenticateUser(params)),
        authenticateUserRequest: () => dispatch(authenticateUserRequest())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Form);