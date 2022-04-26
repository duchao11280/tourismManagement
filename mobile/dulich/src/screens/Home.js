import React, { Component, useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, Pressable, FlatList, SafeAreaView } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { province } from '../resources/values/province'
import Province from '../components/child/place/Province'
import { Appbar } from 'react-native-paper';
import { SearchBar } from "react-native-elements";



const Home = ({ navigation }) => {
    const [searchfield, setSearchfield] = useState('');
    // const [listProvince, setListProvinceName] = useState(province);

    const handleSearch = (text) => {
        setSearchfield(text);

    };
    const filteredProvince = province == undefined ? [] : province.filter(item => {
        var searchName = item.provinceName.toLowerCase().includes(searchfield.toLowerCase());
        return searchName;
    })
    const gotoPlaceByProvince = (province) => {
        navigation.push('PlacesInfo', { province: province })
    }
    return (
        <SafeAreaView style={{ flex: 1 }}>
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
                <FlatList
                    data={filteredProvince}
                    numColumns={2}
                    // ListFooterComponent={<View style={{ paddingBottom: 300 }} />}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            // <View><Text>{item.provinceName}</Text></View>
                            <Province province={item.provinceName} gotoPlace={gotoPlaceByProvince} />
                        )
                    }}
                ></FlatList>
            </View >
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
    }
})




export default Home;