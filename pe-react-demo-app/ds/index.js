/**
 * @format
 */

import {AppRegistry, YellowBox} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {APPLICATION_URL, APPLICATION_CLASS} from 'react-native-dotenv';

// YellowBox.ignoreWarnings([
//   'componentWillMount',
//   'componentWillReceiveProps',
//   'componentWillUpdate',
//   'Module RCTImageLoader requires',
//   'useNativeDriver'
// ]);

console.disableYellowBox = true;

export let application = null;
import(`./${APPLICATION_URL}`).then(module => {
  application = new module[APPLICATION_CLASS]();
  register(application);
}); 

AppRegistry.registerComponent(appName, () => App);
