import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Login from './pages/authentication/Login';

class Main extends Component<{}> {
  render() {
    return (
      <Login />
    );
  }
};

const styles = StyleSheet.create({

});


export default connect(null, null)(Main);