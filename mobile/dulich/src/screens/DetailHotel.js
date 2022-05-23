import React, { Component, useEffect, useState } from 'react';
import {
    View, Text, Pressable, StyleSheet, FlatList, RefreshControl,
    ActivityIndicator, SafeAreaView, ScrollView, Modal, TextInput, Alert, Linking
} from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageCard from '../components/child/place/ImageCard'

import ProvinceLocation from '../components/child/place/ProvinceLocation'
import { AntDesign } from '@expo/vector-icons';
const DetailHotel = ({ navigation, route }) => {

    const [service, setService] = useState(route.params.item)
    const [isLoading, setLoading] = useState(true);
    const [content, setContent] = useState('');

    const goBack = () => {
        navigation.pop();
    }

    const makeCall = () => {
        let phone = service.hotline;
        let phoneNumber = '';
        if (Platform.OS == 'android') {

            phoneNumber = 'tel:${'.concat(service.hotline, '}');
        }
        else {
            phoneNumber = 'telprompt:${0934164220}';
            phoneNumber = 'telprompt:${'.concat(service.hotline, '}');
        }

        Linking.openURL(phoneNumber);
    }
    /////////////////////////////////////


    useEffect(() => {

        // getCommentFromServer();
    }, [])

    const getHeader = () => (
        <View>
            <Text style={styles.title}>Tên địa điểm:</Text>
            <Text style={styles.content}>{service.serviceName}</Text>
            <Text style={styles.title}>Số điện thoại:</Text>
            {/* <View style={styles.phone}>
                <Pressable onPress={makeCall}>
                    <AntDesign name="phone" size={24} color="black" />
                    <Text style={styles.content}>{service.hotline}</Text>
                </Pressable>
            </View> */}
            <Pressable style={[{ flex: 0.5, flexDirection: 'row', paddingLeft: 15 }]} onPress={makeCall}>
                <AntDesign name="phone" size={20} color="black" />
                <Text style={styles.phone}>{service.hotline}</Text>
            </Pressable>

            <Text style={styles.title}>Địa chỉ:</Text>
            <Text style={styles.content}>{service.address}</Text>
            <ProvinceLocation lat={service.latitude} long={service.longitude} />

            <Text style={styles.title}>Mô tả:</Text>
            <Text style={styles.content}>{service.description}</Text>
            <FlatList
                data={service.images}
                horizontal
                keyExtractor={item => item.id.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable
                            onPress={() => { }}
                        >
                            <ImageCard item={item} index={index}>
                            </ImageCard>
                        </Pressable>
                    );
                }}
            >
            </FlatList>
        </View>
    )


    return (
        <SafeAreaView>
            <View>

                <View style={styles.paddingTop}>
                    <Pressable onPress={() => { goBack() }}>
                        <Icon name="arrow-back-outline" size={40} color="#000" /></Pressable>
                </View>

                <FlatList
                    // data={listComment}
                    keyExtractor={item => item.id.toString()}
                    ListHeaderComponent={getHeader}
                    contentContainerStyle={{ paddingBottom: 400 }}

                >
                </FlatList>

            </View>


        </SafeAreaView>
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
    paddingTop: {
        paddingTop: 25,
    },
    phone: {
        fontSize: 18,
        lineHeight: 25,
        // marginHorizontal: 18,
        textAlign: 'justify',
        marginLeft: 10
    }
})
export default DetailHotel;