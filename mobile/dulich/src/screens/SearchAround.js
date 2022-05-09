import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions } from 'react-native'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { getAllPlaceAround } from '../networking/placeNetworking'

const { width, height } = Dimensions.get('window');
const SearchAround = () => {
    const [location, setLocation] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [initialRegion, setInitialRegion] = useState({ latitude: 10, longitude: 106, latitudeDelta: 0.0922 / 30, longitudeDelta: 0.0421 / 30, });
    const [listPlace, setListPlace] = useState([])
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Quyền truy cập vị trí bị từ chối!');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.0922 / 30,
                longitudeDelta: 0.0421 / 30
            });

        })();
    }, []);
    useEffect(() => {
        getAllPlaceAround(initialRegion.latitude, initialRegion.longitude, 20)
            .then((response) => {
                setListPlace(response.data)
            })
            .catch((error) => {
                setListPlace([])
            })
    }, [initialRegion])
    let text = 'Đang Xử lý..';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location);
    }

    return (
        <View style={styles.container}>
            <MapView
                style={styles.container}
                region={initialRegion}

            >
                <Marker
                    coordinate={{
                        latitude: initialRegion.latitude,
                        longitude: initialRegion.longitude,
                    }}
                />
                {listPlace != undefined ? listPlace.map((place, i) => {
                    console.log(place);
                    return (
                        <Marker
                            key={i}
                            coordinate={{
                                latitude: parseFloat(place.latitude),
                                longitude: parseFloat(place.longitude),
                            }}
                        />
                    )
                }) : <View></View>}
            </MapView>


        </View >
    );
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ADD8E6',
        flex: 1,
        width: "100%",
        height: "80%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {

        textAlign: 'center',
    }
});
export default SearchAround
