/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from './src/Store';
import MainNavigation from './src/navigation/MainNavigation';
// import AppNavigation from './src/AppNavigationTemp';

// import setAuthToken from './utils/SetAuthToken';
// import AsyncStorage from '@react-native-community/async-storage';
// Check for token
// if (AsyncStorage.getItem('authKey')) {
//   AsyncStorage.getItem('authKey').then((value) => setAuthToken(value))
// }
// setAuthToken(AsyncStorage.getItem("authKey"));
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    );
  }
}
