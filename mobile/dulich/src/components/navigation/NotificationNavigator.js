import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import Notification from '../../screens/Notification'
import DetailNotification from '../../screens/DetailNotification'
const Stack = createNativeStackNavigator();
const UserNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Notification' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Notification" component={Notification} />
            <Stack.Screen name="DetailNotification" component={DetailNotification} />
        </Stack.Navigator>
    )
}

export default UserNavigator
