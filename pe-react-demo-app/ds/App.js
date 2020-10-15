import React, { Component } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import { Provider } from "react-redux";
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import persist from "./src/redux/config/store";
import Main from './src/Main';
import { PersistGate } from 'redux-persist/integration/react'
import Application from './src/context/Application';
import registerAllWidgets from './src/context/Register';
import registerApplication from './external_modules/index';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#797979',
  },
};

const persistStore = persist();

export let application = new Application();
registerAllWidgets(application);
registerApplication(application);

export default class App extends Component<{}> {
  render() {
    return (
      <Provider store={persistStore.store}>
        <PersistGate loading={null} persistor={persistStore.persistor}>
          <PaperProvider theme={theme}>
            <View style={styles.container}>
              <Main />
            </View>
          </PaperProvider>
        </PersistGate>
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
