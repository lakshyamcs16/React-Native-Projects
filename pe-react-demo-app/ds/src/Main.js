import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import Routes from '../src/pages/Routes';
import {
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from "./themes/styling";
import { ThemeProvider } from "styled-components";
import store from './redux/config/store';
import {application} from '../index';

class Main extends PureComponent<{}> {
   

  constructor(props) {
    super(props);
    this.store = store().persistor;
    this.checkLogin();
  }

  checkLogin = () => {
    const {userDetails} = this.props;
    console.log(userDetails);
    if(userDetails.token) {
        let user = application.getCurrentUser();
        user.setUser(userDetails);
    }
  }

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
  userDetails: state.authenticationDetails.user_details,
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