import React, { Component, useEffect, useState } from 'react';
import {
    View, Text, Pressable, StyleSheet, FlatList, RefreshControl,
    ActivityIndicator, SafeAreaView, ScrollView, Modal, TextInput, Alert
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { SearchBar } from "react-native-elements";
import { getAllServiceByPlaceID } from '../networking/servicesNetworking'
import { hotelvalue } from '../resources/values/hotelvalue'
import ServiceList from '../components/child/place/HotelList'

const PlaceInfoServices = ({ navigation, route }) => {

    const [listService, setListService] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [searchfield, setSearchfield] = useState('');




    const handleGotoDetailService = (item) => {
        navigation.push("DetailService", { item: item });
    }

    useEffect(() => {
        getServiceFromServer();

    }, []);

    const getServiceFromServer = () => {
        getAllServiceByPlaceID(route.params.place.placeID, "Dịch vụ khác").then((response) => { setListService(response.data); })
            .catch((err) => { Alert.alert("Thông báo", "Kết nối thất bại"); setListService([]) })
            .finally(() => { setLoading(false), setRefreshing(false); });
    }
    const onRefresh = () => { setRefreshing(true); getServiceFromServer(); }
    const handleSearch = (text) => {
        setSearchfield(text);

    };
    const filteredService = listService == undefined ? [] : listService.filter(item => {
        var searchName = item.serviceName.toLowerCase().includes(searchfield.toLowerCase());
        return searchName;
    })


    return (

        <View>
            <SearchBar
                placeholder="Tìm địa điểm"
                lightTheme
                round // bo góc
                onChangeText={handleSearch}
                value={searchfield}
            />


            <View>
                {isLoading ? <ActivityIndicator size="large" color='blue' /> :
                    <FlatList
                        data={filteredService}
                        ListFooterComponent={<View style={{ paddingBottom: 400 }} />}
                        keyExtractor={item => item.serviceID.toString()}
                        renderItem={({ item, index }) => {
                            return (
                                // <View><Text>{item.provinceName}</Text></View>
                                <Pressable onPress={() => { handleGotoDetailService(item) }}><ServiceList services={item} /></Pressable>
                            )
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => onRefresh()}
                            />
                        }
                    ></FlatList>
                }
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
export default PlaceInfoServices;