import * as React from 'react';
 import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons';
import  MaterialIcons  from 'react-native-vector-icons/MaterialIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Search from '../components/screens/Search'
import Settings from '../components/screens/settings/Settings'
import LoadingScreen from '../components/commonComponents/LoadingScreen'
import StackNav0 from './StackNav0';
import StackNav1 from './StackNav1';
import StackNav2 from './StackNav2';
import StackNav3 from './StackNav3';

// const Tab = createMaterialBottomTabNavigator();
const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
      activeColor="#FFFFFF"
      labelStyle={{ fontSize: 12 }}
      tabBarOptions={{
        tabBarButton: (props) => <TouchableOpacity {...props} />,
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={StackNav0}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="view-dashboard" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="Search"
        component={StackNav1}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="search" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="upcoming"
        component={StackNav2}
        options={{
          tabBarLabel: 'Upcoming',
          tabBarIcon: ({ color }) => (
            <MaterialIcons name="movie-filter" color={color} size={26} />
          ),
        }}
      />
       <Tab.Screen
        name="settings"
        component={StackNav3}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="settings" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}