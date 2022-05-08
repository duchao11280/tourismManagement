import React, { Component, useEffect, useState } from 'react';
import {
    View, Text, Pressable, StyleSheet, FlatList, RefreshControl,
    ActivityIndicator, SafeAreaView, ScrollView, Modal, TextInput, Alert
} from 'react-native';
import { Appbar } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import ImageCard from '../components/child/place/ImageCard'
import TabDetailPlace from '../components/navigation/TabDetailPlace'
import CommentItem from '../components/child/place/CommentItem'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCommentByPlaceID, deleteCommentByUser, addComment } from '../networking/commentNetworking'
import ProvinceLocation from '../components/child/place/ProvinceLocation'

const DetailService = ({ navigation, route }) => {

    console.log(route.params.item);
    const [service, setService] = useState(route.params.item)
    const [isLoading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [content, setContent] = useState('');

    const goBack = () => {
        navigation.pop();
    }




    useEffect(() => {


    }, [])




    const onRefresh = () => { setRefreshing(true); }
    const getHeader = () => (
        <View>
            <Text style={styles.title}>Tên địa điểm:</Text>
            <Text style={styles.content}>{service.serviceName}</Text>
            <Text style={styles.title}>Địa chỉ:</Text>
            <Text style={styles.content}>{service.address}</Text>
            <ProvinceLocation lat={service.latitude} long={service.longitude} />
            <Text style={styles.title}>Số điện thoại:</Text>
            <Text style={styles.content}>{service.hotline}</Text>
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
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => onRefresh()}
                        />
                    }
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
    }
})
export default DetailService;