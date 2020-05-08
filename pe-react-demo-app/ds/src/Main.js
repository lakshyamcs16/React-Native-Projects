import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  Text
} from 'react-native';
import Routes from '../src/pages/Routes';

class Main extends Component<{}> {
  render() {
    return (
      <Routes />
    );
  }
};

const styles = StyleSheet.create({

});


export default connect(null, null)(Main);