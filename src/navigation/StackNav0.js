/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React from 'react';
import { View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import GradientHeader from '../components/common/GradientHeader'
import Dashboard from '../components/screens/dashboard/Dashboard';
import Details from '../components/screens/details/';
import Episodes from '../components/screens/seasonEpisodes';
import Recommends from '../components/screens/recommends/Recommends';
import AllCast from '../components/screens/allCast/AllCast';
import WebViewScreen from '../components/common/WebViewScreen';

const Stack = createStackNavigator();

function StackNav0() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#FFFFFF',
        headerTransparent: true,
        headerBackground: () => <GradientHeader />
      }}>
       <Stack.Screen
        name="home"
        component={Dashboard}
        options={{
          title: 'Trending', headerShown: true, zindex: 8,
        }}
      />

      <Stack.Screen name="details" component={Details} options={{ title: '' }} />

      <Stack.Screen name="recommendations" component={Recommends} options={{ title: '' }} />

      <Stack.Screen name="episodes" component={Episodes} options={{ title: '' }} />

      <Stack.Screen name="allcast" component={AllCast} options={{ title: '' }} />

      <Stack.Screen name="webview" component={WebViewScreen}
        options={{
          title: '',
          headerBackground: () => (
            <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 70 }} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNav0;
