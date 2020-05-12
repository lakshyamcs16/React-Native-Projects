import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
} from 'react-native';

import { Provider } from "react-redux";
import store from "./src/redux/config/store";
import Main from './src/Main';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <SafeAreaView style={styles.container}>
          <Main />
        </SafeAreaView>
      </Provider>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  }
});