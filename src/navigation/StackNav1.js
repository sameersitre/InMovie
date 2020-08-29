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
import Search from '../components/screens/search/Search';
import Details from '../components/screens/details/';
import Episodes from '../components/screens/seasonEpisodes';
import Recommends from '../components/screens/recommends/Recommends';
import AllCast from '../components/screens/allCast/AllCast';
import WebViewScreen from '../components/common/WebViewScreen';

const Stack = createStackNavigator();

function StackNav1() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#FFFFFF',
        headerStyle: {
          backgroundColor: 'transparent',
        },
        headerTransparent: true,
        headerBackground: () => <GradientHeader />,
        headerTitleStyle: {},
      }}>
      <Stack.Screen name="search" component={Search} options={{ title: '', headerBackground: null }} />

      <Stack.Screen name="details" component={Details} options={{ title: '' }} />

      <Stack.Screen name="recommendations" component={Recommends} options={{ title: '' }} />

      <Stack.Screen name="episodes" component={Episodes} options={{ title: '' }} />
      
      <Stack.Screen name="allcast" component={AllCast} options={{ title: '' }} />

      <Stack.Screen
        name="webview"
        component={WebViewScreen}
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

export default StackNav1;
