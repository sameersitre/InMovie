import * as React from 'react';
import { View, Animated,  } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Upcoming from '../components/screens/upcoming/Upcoming';
import Details from '../components/screens/details/Details';
import WebViewScreen from '../components/commonComponents/WebViewScreen'
import LinearGradient from 'react-native-linear-gradient'

const Stack = createStackNavigator();
function StackNav2() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle:{
          height:80,
        },
        headerTransparent: true,
        headerBackground: () =>
          <LinearGradient
            colors={["black", "#00000999", '#00000000']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ height: 80 }}
          />,
      }}
    >
      <Stack.Screen
        name="upcoming"
        options={{
          title: 'Upcoming',
        }}
        component={Upcoming} />

      <Stack.Screen
        name="Details"
        options={{
          title: 'Details',
        }}
        component={Details} />

      <Stack.Screen
        name="webview"
        options={{
         title: ''
        }}
        component={WebViewScreen} />

    </Stack.Navigator>
  );
}

export default StackNav2;