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



const Home = ({ navigation }) => {
    const [searchfield, setSearchfield] = useState('');
    const [listHotel, setListHotel] = useState([]);
    const [listOtherServices, setListOtherServices] = useState([])
    // const [listProvince, setListProvinceName] = useState(province);

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
                    {/* <View style={styles.BeachImage}>
                <Image source={require('../resources/imgs/Beach.png')} />
            </View>

            <View style={styles.firstHeadButtonView}>
                <View style={styles.ServiceButton}>
                    <Pressable onPress={() => navigation.navigate("PlacesInfo")}>
                        <Entypo name="location" size={40} color="black" style={styles.icon} />
                        <Text style={styles.FontButton}>Địa điểm</Text>
                    </Pressable>
                </View>

                <View style={styles.ServiceButton} >
                    <Pressable onPress={() => navigation.navigate("Hotel")}>
                        <FontAwesome5 name={'hotel'} size={40} style={styles.icon} />
                        <Text style={styles.FontButton}>Khách sạn</Text>
                    </Pressable>
                </View>


                <View style={styles.ServiceButton}>
                    <Pressable onPress={() => navigation.navigate("Restaurant")}>
                        <FontAwesome5 name={'utensils'} size={40} style={styles.icon} />
                        <Text style={styles.FontButton}>Nhà Hàng</Text>
                    </Pressable>
                </View>
            
                <View style={styles.ServiceButton} >
                    <Pressable onPress={() => console.log("Receipt")}>
                        <MaterialIcons name="receipt-long" size={40} color="black" style={styles.icon} />
                        <Text style={styles.FontButton}>Hóa đơn Phòng </Text>
                    </Pressable>
                </View>

                <View style={styles.ServiceButton}>
                    <Pressable onPress={() => console.log("ReceiptTable")}>
                        <MaterialIcons name="receipt-long" size={40} color="black" style={styles.icon} />
                        <Text style={styles.FontButton}>Hóa đơn Bàn </Text>
                    </Pressable>
                </View>


            </View> */}
                    {/* <Appbar.Header statusBarHeight={1}>
                    <Appbar.Content title="Các tỉnh thành Việt Nam" />
                </Appbar.Header> */}
                    <View>
                        <SearchBar
                            placeholder="Tìm địa điểm"
                            lightTheme
                            round // bo góc
                            onChangeText={handleSearch}
                            value={searchfield}
                        />
                    </View>

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
                        <Text style={styles.content}>Khám phá các khách sạn nổi bật:</Text>
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
                        <Text style={styles.content}>Khám phá các tiện ích nổi bật khi du lịch:</Text>
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
    }
})




export default Home;