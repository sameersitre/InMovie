/*
 * Author: Sameer Sitre
 * https://www.linkedin.com/in/sameersitre/
 * https://github.com/sameersitre
 * File Description:
 */

import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../components/screens/settings/Settings';
import GradientHeader from '../components/common/GradientHeader'

const Stack = createStackNavigator();
function StackNav3() {
  return (
    <Stack.Navigator screenOptions={{headerTransparent: true}}>
      <Stack.Screen
        name="settings"
        options={{
          headerTintColor: '#FFFFFF',
          title: 'Settings',
          headerBackground: () => <GradientHeader />
        }}
        component={Settings}
      />
    </Stack.Navigator>
  );
}

export default StackNav3;
