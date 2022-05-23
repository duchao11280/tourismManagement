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
    const filter = [{ id: 1, name: 'Tất cả' }, { id: 2, name: 'Địa điểm' }, { id: 3, name: 'Nơi ở' }, { id: 4, name: 'Dịch vụ' }]
    const [currentFilter, setCurrentFilter] = useState(1);
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                setErrorMsg('Quyền truy cập vị trí bị từ chối!');
                return;
            }
            setRefresh(true)
            let location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest, maximumAge: 10000 });
            setInitialRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.03,
                longitudeDelta: 0.03
            })
            getAllPlaceAround(location?.coords?.latitude || initialRegion.latitude, location?.coords?.longitude || initialRegion.longitude, 5)
                .then((response) => { setListPlace(response.data) })
                .catch((err) => { setListPlace([]) })
            getAllServiceAround(location?.coords?.latitude || initialRegion.latitude, location?.coords?.longitude || initialRegion.longitude, 5)
                .then((response) => { setListService(response.data) })
                .catch((err) => { setListService([]) })

            setRefresh(false)
        })();
    }, []);

    const filterHotel = listService == undefined ? [] : listService.filter(item => {
        return item.typeID === 1;
    })
    const filterOtherService = listService == undefined ? [] : listService.filter(item => {
        return item.typeID !== 1;
    })
    const _scrollViewCard = React.useRef(null);
    const _map = React.useRef(null);
    const scrollToTop = () => {
        if (_scrollViewCard !== undefined) {
            _scrollViewCard.current.scrollTo({ x: 0, y: 0, animated: true })
        }

    }
    const goToMarker = (lat, long) => {
        _map.current.animateToRegion({
            latitude: isNaN(parseFloat(lat)) ? 0 : parseFloat(lat),
            longitude: isNaN(parseFloat(long)) ? 0 : parseFloat(long),
            latitudeDelta: 0.02,
            longitudeDelta: 0.02,
        }, 300)
    }
    const renderCardService = (listItem) => (
        listItem.map((item, i) => {
            return (
                <Pressable
                    style={styles.card}
                    key={i}
                    onPress={() => { goToMarker(item.latitude, item.longitude) }}
                >
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
                                onPress={() => { navigation.navigate('DetailServiceWithSearch', { item: item }) }}
                            >
                                <Text style={styles.textButton}>Xem chi tiết</Text>
                            </Pressable>
                        </View>
                    </View>
                </Pressable>
            )
        })
    )
    return (
        refresh ? <View style={styles.refresh} ><ActivityIndicator size="large" color='blue' /></View>
            : <View style={styles.container}>
                <MapView
                    ref={_map}
                    style={styles.container}
                    region={initialRegion}
                    showsUserLocation={true}
                >
                    {/* <Marker
                        coordinate={{
                            latitude: initialRegion.latitude,
                            longitude: initialRegion.longitude,
                        }}
                    /> */}
                    {listPlace != undefined && (currentFilter == filter[0].id || currentFilter == filter[1].id) ? listPlace.map((place, i) => {
                        return (
                            <Marker.Animated
                                key={"place" + i}
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
                            <View key={i}>
                                {
                                    ((service.typeID === 1 && currentFilter == filter[0].id) || (service.typeID === 1 && currentFilter == filter[2].id)) ?
                                        <Marker.Animated
                                            key={"service" + i}
                                            coordinate={{
                                                latitude: parseFloat(service.latitude),
                                                longitude: parseFloat(service.longitude),
                                            }}
                                            title={service.serviceName}

                                        /> : ((service.typeID === 2 && currentFilter == filter[0].id) || (service.typeID === 2 && currentFilter == filter[3].id)) ?
                                            <Marker.Animated
                                                key={"service" + i}
                                                coordinate={{
                                                    latitude: parseFloat(service.latitude),
                                                    longitude: parseFloat(service.longitude),
                                                }}
                                                title={service.serviceName}
                                            />
                                            : <View></View>
                                }
                            </View>
                        )
                    })
                        : <View></View>
                    }
                </MapView>
                <ScrollView horizontal height={50} style={styles.filter} showsHorizontalScrollIndicator={false}>
                    {filter.map((item) => {
                        return (
                            <Pressable
                                style={currentFilter == item.id ? styles.filterFocused : styles.itemFilter}
                                onPress={() => {
                                    setCurrentFilter(item.id)
                                    scrollToTop()
                                }}
                                key={item.id}
                            >
                                <Text>{item.name}</Text>
                            </Pressable>
                        )
                    })}
                </ScrollView>
                <Animated.ScrollView
                    ref={_scrollViewCard}
                    horizontal
                    style={styles.scrollView}
                    showsHorizontalScrollIndicator={false}
                >
                    {(currentFilter == filter[0].id || currentFilter == filter[1].id) ? listPlace.map((item, i) => {
                        return (
                            <Pressable
                                style={styles.card}
                                key={i}
                                onPress={() => { goToMarker(item.latitude, item.longitude) }}
                            >
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
                            </Pressable>
                        )
                    }) : <View></View>}
                    {
                        currentFilter == filter[0].id
                            ? renderCardService(listService) : currentFilter == filter[2].id
                                ? renderCardService(filterHotel) : currentFilter == filter[3].id
                                    ? renderCardService(filterOtherService)
                                    : <View></View>}
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
        top: 60,
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
    filterFocused: {
        backgroundColor: "#e5c51a",
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
