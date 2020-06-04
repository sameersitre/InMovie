/*
  * Author: Sameer Sitre
  * https://www.linkedin.com/in/sameersitre/
  * https://github.com/sameersitre
  * File Description:  
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';

import StackNav0 from './StackNav0';
import StackNav1 from './StackNav1';
import StackNav2 from './StackNav2';
import StackNav3 from './StackNav3';

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="dashboard" labelStyle={{ fontSize: 12 }}
      tabBarOptions={{
        tabBarButton: (props) => <TouchableOpacity {...props} />,
      }}
    >
      <Tab.Screen name="dashboard" component={StackNav0}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
        }}
      />
      <Tab.Screen name="search" component={StackNav1}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => <MaterialIcons name="search" color={color} size={28} />
        }}
      />
      <Tab.Screen name="upcoming" component={StackNav2}
        options={{
          tabBarLabel: 'Upcoming',
          tabBarIcon: ({ color }) => <MaterialIcons name="movie-filter" color={color} size={28} />
        }}
      />
      <Tab.Screen name="settings" component={StackNav3}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="settings" color={color} size={26} />
        }}
      />
    </Tab.Navigator>
  );
}