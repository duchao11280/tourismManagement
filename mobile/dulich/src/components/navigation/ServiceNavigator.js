import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import Home from '../../screens/Home'
import PlacesInfo from '../../screens/PlacesInfo'
import PlaceInfoServices from '../../screens/PlaceInfoServices';
import DetailService from '../../screens/DetailService'
const Stack = createNativeStackNavigator();
const ServiceNavigator = ({ route }) => {

    return (
        <Stack.Navigator initialRouteName='PlaceInfoServices' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PlaceInfoServices" component={PlaceInfoServices} initialParams={route.params} />
            <Stack.Screen name="DetailService" component={DetailService} />
        </Stack.Navigator>
    )
}

export default ServiceNavigator
