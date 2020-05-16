import * as React from 'react';
import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack'; 
import Temporary from '../components/screens/temporary/Temporary'
import Details from '../components/screens/details/Details'
import WebViewScreen from '../components/commonComponents/WebViewScreen'

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