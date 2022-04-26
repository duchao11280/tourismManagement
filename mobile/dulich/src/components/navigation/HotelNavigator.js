import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import Home from '../../screens/Home'
import PlacesInfo from '../../screens/PlacesInfo'
import PlaceInfoHotel from '../../screens/PlaceInfoHotel';
import DetailHotel from '../../screens/DetailHotel'
const Stack = createNativeStackNavigator();
const HotelNavigator = ({ route }) => {

    return (
        <Stack.Navigator initialRouteName='PlaceInfoHotel' screenOptions={{ headerShown: false }}>
            <Stack.Screen name="PlaceInfoHotel" component={PlaceInfoHotel} initialParams={route.params} />
            <Stack.Screen name="DetailHotel" component={DetailHotel} />

        </Stack.Navigator>
    )
}

export default HotelNavigator
