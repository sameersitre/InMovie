/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React from 'react';
import {View} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../components/screens/settings/Settings';
const Stack = createStackNavigator();
function StackNav3() {
  return (
    <Stack.Navigator screenOptions={{headerTransparent: true}}>
      <Stack.Screen
        name="settings"
        options={{
          headerTintColor: '#FFFFFF',
          title: 'Settings',
          headerBackground: () => (
            <View style={{backgroundColor: 'rgba(0, 0, 0, 0.8)', height: 70}} />
          ),
        }}
        component={Settings}
      />
    </Stack.Navigator>
  );
}

export default StackNav3;
