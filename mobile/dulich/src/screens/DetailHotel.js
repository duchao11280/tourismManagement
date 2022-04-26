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

const DetailHotel = ({ navigation, route }) => {

    console.log(route);
    // const [place, setPlace] = useState(route.params.place)
    // const [isLoading, setLoading] = useState(true);
    const [listComment, setListComment] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [content, setContent] = useState('');
    const goBack = () => {
        navigation.pop();
    }

    // useEffect(() => {


    // }, [])






    return (
        <SafeAreaView>

            <View>
                <Pressable onPress={() => { goBack() }}>
                    <Icon name="arrow-back-outline" size={40} color="#000" /></Pressable>

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
})
export default DetailHotel;