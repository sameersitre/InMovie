import * as React from 'react';
import { Text, View, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Dashboard from '../components/screens/dashboard/Dashboard'

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createMaterialTopTabNavigator();

export default function App() {
    return (
        <Tab.Navigator
            tabBarOptions={{
                lazyLoad: true,
                style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.8)',
                    borderTopWidth: 0,
                    paddingTop: 20,
                    height: 60,
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    top: 0,
                    zIndex: 8
                },
                // HeaderBackground: () =>
                //     <LinearGradient
                //         colors={["black", "#00000999", '#00000000']}
                //         start={{ x: 0, y: 0 }}
                //         end={{ x: 0, y: 1 }}
                //         style={{ height: 80 }}
                //     />,

            } 
        }
        >
            <Tab.Screen name="Movies" component={HomeScreen} />
            <Tab.Screen name="TV Shows" component={SettingsScreen} />
        </Tab.Navigator>
    );
}

