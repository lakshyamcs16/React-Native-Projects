import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity
} from 'react-native';
import Logo from '../../components/authentication/Logo';
import Form from '../../components/authentication/Form';

class Login extends Component<{}> {
  render() {
    return (
      <>
      <View style={styles.container}>
        <Logo logo={{ text: "[ Ds ]" }} />
        <Form />
        <View style={styles.signupTextCont}>
          <Text style={styles.signupText}>
            Don't remember the login details?
          </Text>
          <TouchableOpacity  style={{alignSelf: 'flex-start'}}>
            <Text style={styles.helpText}> Get help.</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.tabBar}>
          <Text style={styles.signupText}>
            Don't have an account?
          </Text>
          <TouchableOpacity>
            <Text style={styles.helpText}> Sign up.</Text>
          </TouchableOpacity>
      </View>
    </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'stretch',
    marginHorizontal: 25
  },
  signupTextCont: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginVertical: 10,
  },
  signupText: {
    color: 'rgba(100,100,100,1)',
    fontWeight: '200'
  },
  helpText: {
    color: 'rgba(14, 110, 193, 1)',
    fontWeight: 'bold'
  },
  tabBar: {
    justifyContent: 'center',
    flexDirection: 'row',
    borderTopWidth: 1,
    alignSelf: 'stretch',
    paddingVertical: 15,
    borderTopColor: 'rgba(232, 232, 232, 1)'
  },
});

export default Login;