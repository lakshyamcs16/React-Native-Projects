import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import store from "./src/redux/config/store";
import Main from './src/Main';

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider>
          <View style={styles.container}>
            <Main />
          </View>
        </PaperProvider>
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
