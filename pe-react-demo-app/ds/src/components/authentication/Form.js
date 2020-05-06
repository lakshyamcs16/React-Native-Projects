import React, { Component } from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from 'react-native';

class Form extends Component<{}> {
    render() {
        return (
            <View style={styles.container}>
                <TextInput 
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Username or email id"
                style={styles.inputBox}/>
                <TextInput 
                underlineColorAndroid='rgba(0,0,0,0)'
                placeholder="Password"
                secureTextEntry={true}
                style={styles.inputBox}/>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Log In</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
        alignSelf: 'stretch',
        marginTop: 20
    },
    inputBox:{
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
    buttonText:{
        fontSize: 16,
        fontWeight: 'bold',
        color: '#ffffff',
        textAlign: 'center'
    },
    button:{
        backgroundColor: 'rgba(14, 110, 173, 0.7)',
        borderRadius: 6,
        alignSelf: 'stretch',
        marginVertical: 8,
        paddingVertical: 15,
        
    }
});

export default Form;