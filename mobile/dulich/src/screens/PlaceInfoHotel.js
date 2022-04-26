import React, { Component, useEffect, useState } from 'react';
import {
    View, Text, Pressable, StyleSheet, FlatList, RefreshControl,
    ActivityIndicator, SafeAreaView, ScrollView, Modal, TextInput, Alert
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { SearchBar } from "react-native-elements";
import {
    getAllPlaces
} from '../networking/placeNetworking'
import PlaceInfoItem from '../components/child/place/PlaceInfoItem'
import { hotelvalue } from '../resources/values/hotelvalue'
import HotelList from '../components/child/place/HotelList'

const PlaceInfoHotel = ({ navigation, route }) => {

    const [place, setPlace] = useState(route.params.place)
    const [isLoading, setLoading] = useState(true);
    const [listComment, setListComment] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [content, setContent] = useState('noi dung ');

    const [listPlaces, setListPlaces] = useState([]);
    const [searchfield, setSearchfield] = useState('');

    let userID;

    const handleGotoDetailHotel = () => {
        navigation.push("DetailHotel", { content: content });
    }

    useEffect(() => {
        getPlaceFromServer();

    }, []);

    const getPlaceFromServer = () => {
        getAllPlaces(route.params.province).then((listPlaces) => { setListPlaces(listPlaces); })
            .catch((err) => { Alert.alert("Thông báo", "Kết nối thất bại") })
            .finally(() => { setLoading(false), setRefreshing(false); });
    }
    const onRefresh = () => { setRefreshing(true); getPlaceFromServer() }
    const handleSearch = (text) => {
        setSearchfield(text);

    };
    // const filteredProvince = province == undefined ? [] : province.filter(item => {
    //     var searchName = item.provinceName.toLowerCase().includes(searchfield.toLowerCase());
    //     return searchName;
    // })
    const gotoDetail = (place) => {
        navigation.push('TabDetailPlace', { place: place })
    }





    return (

        <View>
            <SearchBar
                placeholder="Tìm địa điểm"
                lightTheme
                round // bo góc
                onChangeText={handleSearch}
                value={searchfield}
            />
            <Pressable
                onPress={() => { handleGotoDetailHotel() }}
            ><Text>"Noi o"</Text></Pressable>

            <View>
                <FlatList
                    data={hotelvalue}
                    ListFooterComponent={<View style={{ paddingBottom: 400 }} />}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            // <View><Text>{item.provinceName}</Text></View>
                            <HotelList services={item.serviceName} />
                        )
                    }}
                ></FlatList>
            </View>



        </View>

    )
}
const styles = StyleSheet.create({
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 10,
        marginLeft: 15,
    },
    content: {
        fontSize: 18,
        lineHeight: 25,
        marginHorizontal: 18,
        textAlign: 'justify',
    },
    inputText: {
        margin: 10,
        width: '80%',
        borderRadius: 20,
        borderColor: "black",
        padding: 15,
        borderWidth: 1,
    },
    buttonSend: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#6d84b6',
        paddingHorizontal: 10,
        borderWidth: 1,
        borderRadius: 20,
        marginVertical: 10,
    },
})
export default PlaceInfoHotel;