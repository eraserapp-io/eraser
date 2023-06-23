import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import 'intl';
import 'intl/locale-data/jsonp/en';
import {App} from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent('EraserApp', () => App);
