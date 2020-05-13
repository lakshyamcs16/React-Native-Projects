import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import Logo from '../../components/authentication/Logo';
import Form from '../../components/authentication/Form';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { ThemeProvider } from "styled-components";
import { LoginBackground, BottomBar, NormalText } from "../../themes/styling";

class Login extends Component<{}> {
  moveToSignUp = () => {
    console.log("Sign up page")
    Actions.signup();
  }
  render() {
    return (
      <>
        <ThemeProvider theme={this.props.theme}>
          <LoginBackground contentContainerStyle={{ flexGrow: 1 }} style={{ alignSelf: 'stretch'}}>
            <View style={styles.container}>
              <Logo logo={{ text: "[ Ds ]" }} theme={this.props.theme}/>
              <Form />
              <View style={styles.signupTextCont}>
                <NormalText style={styles.signupText}>
                  Don't remember the login details?
                </NormalText>
                <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                  <Text style={styles.helpText}> Get help.</Text>
                </TouchableOpacity>
              </View>
            </View>
          </LoginBackground>
          <BottomBar style={styles.tabBar}>
            <NormalText style={styles.signupText}>
              Don't have an account?
          </NormalText>
            <TouchableOpacity onPress={this.moveToSignUp}>
              <Text style={styles.helpText}> Sign up.</Text>
            </TouchableOpacity>
          </BottomBar>
        </ThemeProvider>

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
    flexGrow: 1,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  signupText: {
    fontWeight: '500'
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
  },
});

const mapStateToProps = (state) => {
  return {
    theme: state.themeDetails
  }
}

export default connect(mapStateToProps, null)(Login);