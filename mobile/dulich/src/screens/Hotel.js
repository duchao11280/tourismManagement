import React, { useEffect, useState } from 'react';
import {
    View, Text, Pressable, StyleSheet, FlatList, RefreshControl,
    ActivityIndicator, SafeAreaView, ScrollView, Modal, TextInput, Alert
} from 'react-native';
import { Appbar } from 'react-native-paper';
import { SearchBar } from "react-native-elements";
import ListRoomAtPlace from '../components/child/room/ListRoomAtPlace'
import { data } from '../resources/values/datatest'
const Hotel = ({ navigation }) => {
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);

    const [searchfield, setSearchfield] = useState('');
    const [listPlacehaveRooms, setListPlacehaveRooms] = useState(data);

    useEffect(() => {
        getRoomFromServer();
    }, []);

    const getRoomFromServer = async () => {
        setLoading(false)
        setRefreshing(false);

    }
    const handleSearch = (text) => {
        setSearchfield(text);
        console.log(listPlacehaveRooms)
    };
    const onRefresh = () => { setRefreshing(true); getRoomFromServer() }
    const handleDetail = () => {
        console.log("Chuyển tới chi tiết")
    }
    // const filteredRoom = listPlacehaveRooms == undefined ? []
    //     : listPlacehaveRooms.filter(placeHaveRooms => {
    //         var searchNameRoom = placeHaveRooms.listRoom.roomName.toLowerCase()
    //             .includes(searchfield.toLowerCase());
    //         var searchPlace = placeHaveRooms?.placeName.toLowerCase()
    //             .includes(searchfield.toLowerCase());
    //         var search = searchNameRoom || searchPlace;
    //         return search;
    //     })
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Appbar.Header statusBarHeight={20}>
                <Appbar.BackAction onPress={() => navigation.pop()} />
                <Appbar.Content title="Thông tin khách sạn" />
            </Appbar.Header>
            <SearchBar
                placeholder="Nhập tại đây..."
                lightTheme
                round // bo góc
                onChangeText={handleSearch}
                value={searchfield}
            />
            <View>
                {isLoading ? <ActivityIndicator size="large" color='blue' /> :
                    <FlatList
                        data={listPlacehaveRooms}
                        ListFooterComponent={<View style={{ paddingBottom: 400 }} />}
                        keyExtractor={item => item.placeID.toString()}

                        renderItem={({ item, index }) => {
                            return (
                                <ListRoomAtPlace item={item} index={index}
                                    action={handleDetail}
                                >

                                </ListRoomAtPlace>

                            );
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => onRefresh()}
                            />
                        }
                    >
                    </FlatList>}
            </View>

        </SafeAreaView>
    )
}

export default Hotel
