import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import Information from '../../screens/Information'
import Profile from '../../screens/Profile'
import ChangeInfo from '../../screens/ChangeInfo'
import ChangePassword from '../../screens/ChangePassword'
import Feedback from '../../screens/FeedBack'
const Stack = createNativeStackNavigator();
const UserNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Information' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Information" component={Information} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="ChangeInfo" component={ChangeInfo} />
            <Stack.Screen name="ChangePassword" component={ChangePassword} />
            <Stack.Screen name="Feedback" component={Feedback} />
        </Stack.Navigator>
    )
}

export default UserNavigator
