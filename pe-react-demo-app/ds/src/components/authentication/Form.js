import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { authenticateUser } from '../../redux/actions/authentication/auth.actions'
import axios from 'axios'

class Form extends Component<{}> {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        },
        this.handleChange= this.handleChange.bind(this);
    }

    handleChange(value, name) {
        this.setState({[name]: value});
    }

    authenticate = () => {         
        console.log(`${this.state.username} and ${this.state.password}`);
        
        this.props.authenticateUserDetails(this.state.username, this.state.password)
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Username or email id"
                    style={styles.inputBox} 
                    onChangeText={e => this.handleChange(e, "username")}
                    value={this.state.username}
                    keyboardType="email-address"
                    onSubmitEditing={()=> this.password.focus()}
                />
                <TextInput
                    underlineColorAndroid='rgba(0,0,0,0)'
                    placeholder="Password"
                    secureTextEntry={true}
                    style={styles.inputBox} 
                    onChangeText={e => this.handleChange(e, "password")}
                    value={this.state.password}
                    ref={(input) => this.password = input}
                    />
                <TouchableOpacity style={styles.button} onPressOut={this.authenticate}>
                    {this.props.userAuth.loading? 
                    (   <Text style={styles.buttonText}>
                            Loading . . .
                        </Text>
                    ) : this.props.userAuth.loggedin? 
                    (
                        <Text style={styles.buttonText}>
                            Logged In
                        </Text>
                    )
                    : 
                    (
                        <Text style={styles.buttonText}>
                            Log In
                        </Text>
                    )}
                </TouchableOpacity>
            </View>
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
    inputBox: {
        alignSelf: 'stretch',
        backgroundColor: 'rgba(232, 232, 232, 0.4)',
        borderRadius: 6,
        paddingHorizontal: 16,
        fontSize: 16,
        fontFamily: 'Roboto',
        marginVertical: 8,
        borderColor: 'rgba(232, 232, 232, 1)',
        borderWidth: 1
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
        userAuth: state.authenticationDetails
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        authenticateUserDetails: (username, password) => dispatch(authenticateUser(username, password))
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(Form);