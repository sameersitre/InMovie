/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Temporary from '../components/screens/temporary/Temporary';
import Details from '../components/screens/details/Details';
import WebViewScreen from '../components/commonComponents/WebViewScreen';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Temporary} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="webview" component={WebViewScreen} />
    </Stack.Navigator>
  );
}

export default App;
