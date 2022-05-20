import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, Pressable, FlatList, SafeAreaView, ScrollView } from 'react-native';

import { FontAwesome5 } from 'react-native-vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { province } from '../resources/values/province'
import Province from '../components/child/place/Province'
import ServicesList from '../components/child/home/HotelList'
import { Appbar } from 'react-native-paper';
import { SearchBar } from "react-native-elements";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { getAllHotel, getAllOtherServices } from '../networking/servicesNetworking'
import SelectDropdown from 'react-native-select-dropdown'
import { AntDesign } from '@expo/vector-icons';

const Home = ({ navigation }) => {

    const [searchfield, setSearchfield] = useState('');
    const [listHotel, setListHotel] = useState([]);
    const [listOtherServices, setListOtherServices] = useState([])
    const [role, setrole] = useState([]);

    // const [listProvince, setListProvinceName] = useState(province);
    const [isShowfilter, setIsShowfilter] = useState(false)
    const handleSearch = (text) => {
        setSearchfield(text);

    };

    const handleGotoDetailHotel = (item) => {
        navigation.push("DetailHotel", { item: item });
    }
    const handleGotoDetailService = (item) => {
        navigation.push("DetailService", { item: item });
    }

    useEffect(() => {
        getHotelFromServer();
        getOtherServicesFromServer();

    }, []);

    const getHotelFromServer = () => {
        getAllHotel().then((response) => { setListHotel(response.data); })
            .catch((err) => { Alert.alert("Thông báo", "Kết nối thất bại"); setListHotel([]) })
        // .finally(() => { setLoading(false), setRefreshing(false); });
    }
    const getOtherServicesFromServer = () => {
        getAllOtherServices().then((response) => { setListOtherServices(response.data); })
            .catch((err) => { Alert.alert("Thông báo", "Kết nối thất bại"); setListOtherServices([]) })
        // .finally(() => { setLoading(false), setRefreshing(false); });
    }

    const filteredProvince = province == undefined ? [] : province.filter(item => {
        var searchName = item.provinceName.toLowerCase().includes(searchfield.toLowerCase());
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
    const gotoPlaceByProvince = (province) => {
        navigation.push('PlacesInfo', { province: province })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAwareScrollView>
                <View style={styles.container}>

                    <View style={styles.containerSearch}>
                        <View style={{ flex: 5 }}>
                            <SearchBar
                                placeholder="Tìm địa điểm"
                                lightTheme
                                round // bo góc
                                onChangeText={handleSearch}
                                value={searchfield}
                            />
                        </View>
                        <View >
                            <Pressable
                                onPress={() => {
                                    setIsShowfilter(!isShowfilter);
                                }}
                            >
                                <AntDesign name="filter" size={60} color="black" />
                            </Pressable>
                        </View>


                    </View>
                    {isShowfilter ?
                        <View>
                            <SelectDropdown
                                data={province}
                                // defaultValue={province}
                                onSelect={(selectedItem, index) => {
                                    console.log('selected Country name ->>>>', selectedItem.provinceName)
                                    console.log('selected Country Id ->>>>', selectedItem.id)
                                }}
                                buttonTextAfterSelection={(selectedItem, index) => {
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    return selectedItem.provinceName
                                }}
                                rowTextForSelection={(item, index) => {
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    return item.provinceName
                                }}
                            />
                        </View> : <View></View>}





                    <View >
                        <Text style={styles.content}>Khám phá các địa điểm tại các thành phố:</Text>
                    </View>
                    <View style={styles.flatlistview}>
                        <ScrollView
                            horizontal
                            // showsVerticalScrollIndicator={true}
                            showsHorizontalScrollIndicator={true}
                            contentContainerStyle={{ paddingVertical: 10 }}>

                            <FlatList
                                data={filteredProvince}
                                numColumns={32}
                                // ListFooterComponent={<View style={{ paddingBottom: 300 }} />}
                                // flexDirection:rows
                                keyExtractor={item => item.id.toString()}
                                renderItem={({ item, index }) => {
                                    return (
                                        // <View><Text>{item.provinceName}</Text></View>
                                        <Province province={item.provinceName} gotoPlace={gotoPlaceByProvince} />
                                    )
                                }}
                            ></FlatList>
                        </ScrollView>

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

                    {/* <View >
                        <Text style={styles.content}>Khám phá các địa điểm tại các thành phố:</Text>
                    </View>
                    <View style={styles.flatlistview}>
                        <FlatList
                            data={filteredProvince}
                            horizontal
                            keyExtractor={item => item.id.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    // <View><Text>{item.provinceName}</Text></View>
                                    <Province province={item.provinceName} gotoPlace={gotoPlaceByProvince} />
                                )
                            }}
                        ></FlatList>
                    </View> */}
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
    flatlistview: {
        // height: 100,
        // backgroundColor: 'red',
        flexGrow: 0
    },
    containerSearch: {
        flex: 1,
        flexDirection: 'row',
    }
})




export default Home;