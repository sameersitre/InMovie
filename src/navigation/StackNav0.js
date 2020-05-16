import * as React from 'react';
import { View, Animated, } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import Dashboard from '../components/screens/dashboard/Dashboard';
import Details from '../components/screens/details/Details';
import Recommendations from '../components/screens/recommends'
import WebViewScreen from '../components/commonComponents/WebViewScreen'
import LinearGradient from 'react-native-linear-gradient'
const Stack = createStackNavigator();

function StackNav0() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          height: 80,

        },
        headerTintColor: '#fff',
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
        name="Home"
        options={{
          title: 'Trending',
          headerShown: true,
        }}

        component={Dashboard} />

      <Stack.Screen
        name="Details"
        options={{
          title: 'Details',
        }}
        component={Details} />

      <Stack.Screen
        name="recommendations"
        options={{
          title: 'Recommendations',
        }}
        component={Recommendations} />

      <Stack.Screen
        name="webview"
        options={{
          title: '',
          headerBackground: () => <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height: 90 }} />

        }}
        component={WebViewScreen} />

    </Stack.Navigator>
  );
}

export default StackNav0;