/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { YellowBox } from 'react-native';

YellowBox.ignoreWarnings([
  'componentWillMount',
  'componentWillReceiveProps',
  'componentWillUpdate',
  'Module RCTImageLoader requires',
  'useNativeDriver'
]);

AppRegistry.registerComponent(appName, () => App);
