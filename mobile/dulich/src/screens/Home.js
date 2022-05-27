import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, Pressable, FlatList, SafeAreaView, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { province } from '../resources/values/province'
import Province from '../components/child/place/Province'
import ServicesList from '../components/child/home/HotelList'
import PlaceList from '../components/child/home/PlaceList'
import { Appbar } from 'react-native-paper';
import { SearchBar } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getHotelByCity, getOtherServicesByCity } from '../networking/servicesNetworking'
import SelectDropdown from 'react-native-select-dropdown'
import { AntDesign } from '@expo/vector-icons';
import {
    getAllPlaces
} from '../networking/placeNetworking'

const Home = ({ navigation }) => {

    const [searchfield, setSearchfield] = useState('');
    const [listHotel, setListHotel] = useState([]);
    const [listOtherServices, setListOtherServices] = useState([])
    // const [role, setrole] = useState([]);
    const [nameFilter, setNameFilter] = useState("Đồng Nai");
    const [listPlaces, setListPlaces] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        getPlaceFromServer();
        getHotelFromServer();
        getOtherServicesFromServer();

    }, [nameFilter]);


    const getPlaceFromServer = () => {
        getAllPlaces(nameFilter).then((listPlaces) => { setListPlaces(listPlaces); })
            .catch((err) => { Alert.alert("Thông báo", "Kết nối thất bại") })
            .finally(() => { setLoading(false), setRefreshing(false); });
    }
    const getHotelFromServer = () => {
        getHotelByCity(nameFilter).then((response) => { setListHotel(response); })
            .catch((err) => { Alert.alert("Thông báo", "Kết nối thất bại"); setListHotel([]) })
            .finally(() => { setLoading(false), setRefreshing(false); });
    }
    const getOtherServicesFromServer = () => {
        getOtherServicesByCity(nameFilter).then((response) => { setListOtherServices(response); })
            .catch((err) => { Alert.alert("Thông báo", "Kết nối thất bại"); setListOtherServices([]) })
            .finally(() => { setLoading(false), setRefreshing(false); });
    }

    const handleSearch = (text) => {
        setSearchfield(text);

    };

    const handleGotoDetailHotel = (item) => {
        navigation.push("DetailHotel", { item: item });
    }
    const handleGotoDetailService = (item) => {
        navigation.push("DetailService", { item: item });
    }

    const handleGotoDetailPlace = (item) => {

        navigation.push("TabDetailPlace", { place: item });
    }


    const filteredProvince = province == undefined ? [] : province.filter(item => {
        var searchName = item.provinceName.toLowerCase().includes(searchfield.toLowerCase());
        return searchName;
    })

    const filteredPlace = listPlaces == undefined ? [] : listPlaces.filter(item => {
        var searchName = item.placeName.toLowerCase().includes(searchfield.toLowerCase());
        return searchName;
    })
    const filteredHotel = listHotel == undefined ? [] : listHotel.filter(item => {
        var searchName = item.serviceName.toLowerCase().includes(searchfield.toLowerCase());
        return searchName;
    })

    const filteredOtherServices = listOtherServices == undefined ? [] : listOtherServices.filter(item => {
        var searchName = item.serviceName.toLowerCase().includes(searchfield.toLowerCase());
        return searchName;
    })
    // const gotoPlaceByProvince = (province) => {
    //     navigation.push('TabDetailPlace', { province: province })
    // }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>
                    <View >
                        <SearchBar
                            placeholder="Tìm địa điểm"
                            lightTheme
                            round // bo góc
                            onChangeText={handleSearch}
                            value={searchfield}
                        />
                    </View>

                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.contentTitle} > Tìm kiếm tỉnh thành :</Text>

                        <View style={styles.pickerStyle}>
                            <Picker
                                selectedValue={nameFilter}
                                onValueChange={(itemValue, itemIndex) => {
                                    setNameFilter(itemValue)

                                }

                                }>
                                <Picker.Item label="Đồng Nai" value="Đồng Nai" />
                                <Picker.Item label="Thành Phố Hồ Chí Minh" value="Thành Phố Hồ Chí Minh" />
                            </Picker>
                        </View>

                    </View>







                    <View >
                        <Text style={styles.content}>{filteredPlace.length != 0 ? "Khám phá các địa điểm khi du lịch:" : ""} </Text>
                    </View>
                    <View style={styles.flatlistview}>
                        <FlatList
                            data={filteredPlace}
                            horizontal

                            keyExtractor={item => item.placeID.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    // <View><Text>{item.provinceName}</Text></View>
                                    <Pressable onPress={() => { handleGotoDetailPlace(item) }}><PlaceList hotels={item} /></Pressable>
                                )
                            }}

                        ></FlatList>
                    </View>

                    <View >
                        <Text style={styles.content}>{filteredHotel.length != 0 ? "Khám phá các khách sạn nổi bật:" : ""}</Text>
                    </View>
                    <View style={styles.flatlistview}>
                        <FlatList
                            data={filteredHotel}
                            horizontal

                            keyExtractor={item => item.serviceID.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    // <View><Text>{item.provinceName}</Text></View>
                                    <Pressable onPress={() => { handleGotoDetailHotel(item) }}><ServicesList hotels={item} /></Pressable>
                                )
                            }}

                        ></FlatList>
                    </View>

                    <View >
                        <Text style={styles.content}>{filteredOtherServices.length != 0 ? "Khám phá các tiện ích nổi bật khi du lịch:" : ""}</Text>
                    </View>
                    <View style={styles.flatlistview}>
                        <FlatList
                            data={filteredOtherServices}
                            horizontal

                            keyExtractor={item => item.serviceID.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <Pressable onPress={() => { handleGotoDetailService(item) }}><ServicesList hotels={item} /></Pressable>
                                    // <ServicesList hotels={item} />
                                )
                            }}

                        ></FlatList>
                    </View>


                </View >
            </KeyboardAwareScrollView>

        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6f2ff',
        paddingTop: 40,
        paddingLeft: 5,
        paddingRight: 5,
    },
    BeachImage: {
        flexDirection: 'column',
        alignItems: 'center',

    },

    firstHeadButtonView: {
        flexDirection: 'row',
        paddingTop: 40,
        justifyContent: 'space-around',
        flexWrap: 'wrap'

    },
    FontButton: {
        fontSize: 16,
    },

    ServiceButton: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    icon: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
    content: {
        fontSize: 15,
        fontWeight: "bold"
    },
    contentTitle: {
        paddingTop: 17,
        fontSize: 13,
        fontWeight: "800"
    },
    flatlistview: {
        // height: 100,
        // backgroundColor: 'red',
        flexGrow: 0
    },
    // containerSearch: {
    //     flex: 1,
    //     flexDirection: 'row',
    // }
    pickerStyle: {
        paddingLeft: 30,
        width: 260,
        height: 50,
    }
})




export default Home;