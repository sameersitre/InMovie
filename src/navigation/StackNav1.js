import * as React from 'react';
import { } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Search from '../components/screens/search/Search';
import Details from '../components/screens/details/Details';
import WebViewScreen from '../components/commonComponents/WebViewScreen'

import LinearGradient from 'react-native-linear-gradient'
const Stack = createStackNavigator();

function StackNav1() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: 'transparent',
        },
         headerTransparent: true,
        headerBackground: () =>
          <LinearGradient
            colors={["black", "#00000999", '#00000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ height: 80 }}
          />,
        headerTitleStyle: {
          // fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        options={{
          title: '',
          // headerStyle:{
          //   // height:0
          // },
           headerBackground:null
        }}
        component={Search} />

      <Stack.Screen
        name="Details"
        options={{
          title: 'Details'
        }}
        component={Details} />

      <Stack.Screen
        name="webview"
        options={{
          // title: 'webview'
        }}
        component={WebViewScreen} />

    </Stack.Navigator>
  );
}

export default StackNav1;