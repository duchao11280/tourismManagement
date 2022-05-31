import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Trip from '../../screens/Trip'
import PlaceInfoDetail from '../../screens/PlaceInfoDetail'
import DetailHotel from '../../screens/DetailHotel'
import DetailsTrip from '../../screens/DetailsTrip'
const Stack = createNativeStackNavigator();
const TripNavigator = () => {
    return (
        <Stack.Navigator >
            <Stack.Screen name="Trip" component={Trip} options={{ headerShown: false }} />
            <Stack.Screen
                name="DetailPlaceInTrip"
                component={PlaceInfoDetail}
                options={{ headerShown: true, title: "Chi tiết địa điểm" }}
            />
            <Stack.Screen
                name="DetailsTrip"
                component={DetailsTrip}
                options={{ headerShown: true, title: "Chi tiết lịch trình" }}
            />

            <Stack.Screen
                name="DetailServiceInTrip"
                component={DetailHotel}
                options={{ headerShown: false }}
            />

        </Stack.Navigator>
    )
}

export default TripNavigator
