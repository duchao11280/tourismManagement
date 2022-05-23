import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native'

import SearchAround from '../../screens/SearchAround'
import PlaceInfoDetail from '../../screens/PlaceInfoDetail'
import DetailHotel from '../../screens/DetailHotel'
const Stack = createNativeStackNavigator();
const UserNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="SearchAround" component={SearchAround} options={{headerShown:false}}/>
            <Stack.Screen
                name="DetailPlaceWithSearch"
                component={PlaceInfoDetail}
                options={{headerShown:true, title:"Chi tiết địa điểm"}}
            />
            <Stack.Screen
                name="DetailServiceWithSearch"
                component={DetailHotel}
                options={{headerShown:false}}
            />
        </Stack.Navigator>
    )
}

export default UserNavigator
