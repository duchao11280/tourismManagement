import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import Home from '../../screens/Home'
import PlacesInfo from '../../screens/PlacesInfo'
import TabDetailPlace from '../navigation/TabDetailPlace'
// import PlaceInfoDetail from '../../screens/PlaceInfoDetail'
import Hotel from '../../screens/Hotel'
import Restaurant from '../../screens/Restaurant'
import DetailHotel from '../../screens/DetailHotel'
import DetailService from '../../screens/DetailService'
import PlaceInfoDetail from '../../screens/PlaceInfoDetail';
const Stack = createNativeStackNavigator();
const HomeNavigator = () => {
    return (
        <Stack.Navigator initialRouteName='Home' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PlacesInfo" component={PlacesInfo} />
            <Stack.Screen name="TabDetailPlace" component={TabDetailPlace} />
            <Stack.Screen name="Hotel" component={Hotel} />
            <Stack.Screen name="Restaurant" component={Restaurant} />
            <Stack.Screen name="DetailHotel" component={DetailHotel} />
            <Stack.Screen name="DetailService" component={DetailService} />
            <Stack.Screen name="DetailPlace" component={PlaceInfoDetail} />
        </Stack.Navigator>
    )
}

export default HomeNavigator
