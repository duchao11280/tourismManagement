import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import LogIn from '../../screens/LogIn'
import SignUp from '../../screens/SignUp'
import TabNavigator from './TabNavigator'
const Stack = createNativeStackNavigator();
const MainNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='LogIn'  screenOptions={{ headerShown: false }}>
                <Stack.Screen name="LogIn" component={LogIn} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="TabNavigator" component={TabNavigator} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator
