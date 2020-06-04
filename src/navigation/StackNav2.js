/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

import Upcoming from '../components/screens/upcoming/Upcoming';
import Details from '../components/screens/details/';
import Episodes from '../components/screens/seasonEpisodes';
import Recommends from '../components/screens/recommends';
import AllCast from '../components/screens/allCast/AllCast';
import WebViewScreen from '../components/commonComponents/WebViewScreen';

const Stack = createStackNavigator();
function StackNav2() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: '#FFFFFF',
        headerStyle: {
          height: 80,
        },
        headerTransparent: true,
        headerBackground: () => (
          <LinearGradient
            colors={['black', '#00000999', '#00000000']}
            start={{x: 0, y: 0}}
            end={{x: 0, y: 1}}
            style={{height: 80}}
          />
        ),
      }}>
      <Stack.Screen
        name="upcoming"
        component={Upcoming}
        options={{title: 'Upcoming'}}
      />

      <Stack.Screen name="details" component={Details} options={{title: ''}} />

      <Stack.Screen
        name="recommendations"
        component={Recommends}
        options={{title: ''}}
      />

      <Stack.Screen
        name="episodes"
        component={Episodes}
        options={{title: ''}}
      />
      <Stack.Screen name="allcast" component={AllCast} options={{title: ''}} />

      <Stack.Screen
        name="webview"
        component={WebViewScreen}
        options={{
          title: '',
          headerBackground: () => (
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)', height: 70}} />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default StackNav2;
