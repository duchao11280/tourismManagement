import React from 'react'
import { View, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

import HomeNavigator from './HomeNavigator'
import UserNavigator from './UserNavigator'
import SearchNavigator from './SearchNavigator'
import NotificationNavigator from './NotificationNavigator'
import { useIsFocused } from '@react-navigation/native'
const Tab = createBottomTabNavigator();
const TabNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name='HomeNavigator' component={HomeNavigator}
                options={{
                    tabBarLabel:'Trang chủ',
                    tabBarIcon: ({focused}) => (
                        focused?
                        <Icon
                            name='home' type='font-awesome'
                            color='blue' size={32}
                        />
                        :<Icon
                        name='home' type='font-awesome'
                        color='black' size={24}
                    />
                    ),
                }} 
            />
            <Tab.Screen name='Tìm kiếm'
                component={SearchNavigator}
                options={{
                    tabBarIcon: ({focused}) => (
                        focused?
                        <Icon
                            name='search' type='font-awesome'
                            color='blue' size={32}
                        />:
                        <Icon
                            name='search' type='font-awesome'
                            color='black' size={24}
                        />
                    ),
                }}
            />
            <Tab.Screen name='Thông báo'
                component={NotificationNavigator}
                options={{
                    tabBarIcon: ({focused}) => (
                        focused?
                        <Icon
                            name='bell' type='font-awesome'
                            color='blue' size={32}
                        />:
                        <Icon
                            name='bell' type='font-awesome'
                            color='black' size={24}
                        />
                    ),
                }}
            />
            <Tab.Screen name='Tài khoản'
                component={UserNavigator}
                options={{
                    tabBarIcon: ({focused}) => (
                        focused?
                        <Icon
                            name='user' type='font-awesome'
                            color='blue' size={32}
                        />:
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
