import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import SearchAround from '../../screens/SearchAround'
const Stack = createNativeStackNavigator();
const UserNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='SearchAround' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="SearchAround" component={SearchAround} />
        </Stack.Navigator>
    )
}

export default UserNavigator
