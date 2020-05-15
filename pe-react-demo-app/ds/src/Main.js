import React, { Component } from 'react';
import { connect } from 'react-redux';
import Routes from '../src/pages/Routes';
import {
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from "./themes/styling";
import { ThemeProvider } from "styled-components";

class Main extends Component<{}> {
  render() {
    const loggedin = this.props.loginDetail;

    return (
      <ThemeProvider theme={this.props.theme}>
        <SafeAreaView style={styles.container}>
          <Routes isLoggedIn={loggedin} tab={""}/>
        </SafeAreaView>
      </ThemeProvider>
    )
  }
};

mapStateToProps = state => ({
  loginDetail: state.authenticationDetails.loggedin,
  theme: state.themeDetails
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});

export default connect(mapStateToProps, null)(Main);