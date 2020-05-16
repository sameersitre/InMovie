import * as React from 'react';
import { View, Text } from 'react-native'

import { createStackNavigator } from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient'

import Settings from '../components/screens/settings/Settings';

const Stack = createStackNavigator();

function StackNav3() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    headerTintColor: '#FFFFFF',

                },
                headerTransparent: true,

                // headerBackground: () =>
                //     <LinearGradient
                //         colors={["rgba(0, 0, 0, 0.8)", "#00000999", '#00000000']}
                //         start={{ x: 0, y: 0 }}
                //         end={{ x: 0, y: 1 }}
                //         style={{ height: 80 }}
                //     />,
            }}
        >
            <Stack.Screen
                name="settings"
                options={{
                    headerTintColor:"#FFFFFF",
                    title: 'Settings',
                    headerBackground: () => <View style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)', height:90 }}>
                     </View>


                }}
                component={Settings} />

        </Stack.Navigator>
    );
}

export default StackNav3;