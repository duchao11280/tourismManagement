import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import Home from '../../screens/Home'
import Profile from '../../screens/Profile'
import UserNavigator from './UserNavigator'
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='Home' component={Home}
                options={{
                    tabBarIcon: () => (
                        <Icon
                            name='home' type='font-awesome'
                            color='black' size={24}
                        />
                    ),
                }} />
            <Tab.Screen name='Người dùng'
                component={UserNavigator}
                options={{
                    tabBarIcon: () => (
                        <Icon
                            name='user' type='font-awesome'
                            color='black' size={24}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    )
}

export default TabNavigator