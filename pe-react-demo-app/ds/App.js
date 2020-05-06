/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import { Provider } from "react-redux";
import store from "./src/redux/config/store";
import Login from './src/pages/authentication/Login';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <Login />
        </View>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});