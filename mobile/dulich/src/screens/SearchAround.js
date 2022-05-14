import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Dimensions, ActivityIndicator, ScrollView, Pressable, Animated, Image } from 'react-native'
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';
import { getAllPlaceAround } from '../networking/placeNetworking'
import { getAllServiceAround } from '../networking/servicesNetworking'
import { useIsFocused } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');

const SearchAround = ({ navigation }) => {
    const [initialRegion, setInitialRegion] = useState({ latitude: 10.8836, longitude: 106.7815, latitudeDelta: 0.03, longitudeDelta: 0.03, });
    const [listPlace, setListPlace] = useState([])
    const [listService, setListService] = useState([])
    const isFocused = useIsFocused();
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Quyền truy cập vị trí bị từ chối!');
                return;
            }
            setRefresh(true)
            let location = await Location.getCurrentPositionAsync({accuracy: Location.Accuracy.Highest, maximumAge: 10000});
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03
            })
            getAllPlaceAround(location?.coords?.latitude||initialRegion.latitude, location?.coords?.longitude||initialRegion.longitude, 20)
                .then((response) => { setListPlace(response.data) })
                .catch((err) => { setListPlace([]) })
            getAllServiceAround(location?.coords?.latitude||initialRegion.latitude, location?.coords?.longitude||initialRegion.longitude, 200)
                .then((response) => { setListService(response.data) })
                .catch((err) => { setListService([]) })

            setRefresh(false)
        })();
    }, []);
    return (
        refresh ? <View style={styles.refresh} ><ActivityIndicator size="large" color='blue' /></View>
            : <View style={styles.container}>
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
                        return (
                            <Marker
                                key={"place"+i}
                                coordinate={{
                                    latitude: parseFloat(place.latitude),
                                    longitude: parseFloat(place.longitude),
                                }}
                                title={place.placeName}

                            />
                        )
                    })
                        : <View></View>
                    }
                    {listService != undefined ? listService.map((service, i) => {
                        return (
                            <Marker
                                key={"service"+i}
                                coordinate={{
                                    latitude: parseFloat(service.latitude),
                                    longitude: parseFloat(service.longitude),
                                }}
                                title={service.serviceName}

                            />
                        )
                    })
                        : <View></View>
                    }
                </MapView>
                <ScrollView horizontal height={50} style={styles.filter}>
                    <Pressable style={styles.itemFilter}>
                        <Text>Địa điểm</Text>
                    </Pressable>
                    <Pressable style={styles.itemFilter}>
                        <Text>Nơi ở</Text>
                    </Pressable>
                    <Pressable style={styles.itemFilter}>
                        <Text>Dịch vụ</Text>
                    </Pressable>
                </ScrollView>
                <Animated.ScrollView
                    horizontal
                    style={styles.scrollView}
                >
                    {listPlace.map((item, i) => {
                        return (
                            <View style={styles.card} key={i}>
                                <Image
                                    source={item.images.length != 0 ? { uri: item.images[0].image } : require('../resources/imgs/Logo.png')}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardTitle}>{item.placeName}</Text>
                                    <View style={styles.buttonView}>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => { navigation.navigate('DetailPlaceWithSearch', { place: item }) }}
                                        >
                                            <Text style={styles.textButton}>Xem chi tiết</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                    {listService.map((item, i) => {
                        return (
                            <View style={styles.card} key={i}>
                                <Image
                                    source={item.images.length != 0 ? { uri: item.images[0].image } : require('../resources/imgs/Logo.png')}
                                    style={styles.cardImage}
                                    resizeMode="cover"
                                />
                                <View style={styles.textContent}>
                                    <Text numberOfLines={1} style={styles.cardTitle}>{item.serviceName}</Text>
                                    <View style={styles.buttonView}>
                                        <Pressable
                                            style={styles.button}
                                            onPress={() => { navigation.navigate('DetailHotelWithSearch', { item: item }) }}
                                        >
                                            <Text style={styles.textButton}>Xem chi tiết</Text>
                                        </Pressable>
                                    </View>
                                </View>
                            </View>
                        )
                    })}
                </Animated.ScrollView>
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
    },
    refresh: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filter: {
        position: 'absolute',
        top: 50,
        paddingHorizontal: 10,
    },
    itemFilter: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        alignItems: 'center',
        height: 35,
        shadowColor: '#ccc',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    card: {
        elevation: 2,
        backgroundColor: "#FFF",
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        marginHorizontal: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 2, y: -2 },
        height: 200,
        width: width * 0.7,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        alignSelf: "center",
    },
    cardTitle: {
        fontWeight: 'bold',
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    buttonView: {
        alignItems: 'center',
        marginTop: 5
    },
    button: {
        width: '100%',
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: 3,
    },
    textButton: {
        color: "red",
        fontWeight: "bold",
    }
});
export default SearchAround
