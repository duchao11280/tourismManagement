import React, { Component, useEffect, useState } from 'react';
import {
    View, Text, Pressable, StyleSheet, FlatList, RefreshControl,
    ActivityIndicator, SafeAreaView, ScrollView, Modal, TextInput, Alert, Image,
} from 'react-native';
import { Appbar } from 'react-native-paper';
import ImageCard from '../components/child/place/ImageCard'
import TabDetailPlace from '../components/navigation/TabDetailPlace'
import CommentItem from '../components/child/place/CommentItem'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getAllCommentByPlaceID, deleteCommentByUser, addComment } from '../networking/commentNetworking'
import ProvinceLocation from '../components/child/place/ProvinceLocation'



const PlaceInfoDetail = ({ navigation, route }) => {

    const [place, setPlace] = useState(route.params.place)
    const [isLoading, setLoading] = useState(true);
    const [listComment, setListComment] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    const [content, setContent] = useState('');

    const [defaultRating, setdefaultRating] = useState(3)
    const [maxRating, setMaxRating] = useState([1, 2, 3, 4, 5])


    useEffect(() => {

        getCommentFromServer();
    }, [])

    const getUserID = async () => {
        try {
            const id = await AsyncStorage.getItem('userID')
            userID = parseInt(id);
        } catch (error) {
            Alert.alert("Thông báo", "Hệ thống xảy ra lỗi, vui lòng thử lại sau")
        }
    }
    const getCommentFromServer = () => {
        getAllCommentByPlaceID(place.placeID).then((response) => { setListComment(response.data); })
            .catch((err) => { Alert.alert("Thông báo", "Kết nối thất bại") })
            .finally(() => { setLoading(false), setRefreshing(false); });
    }
    const deleteComment = (id) => {
        getUserID()
            .then(() => deleteCommentByUser(id, userID)
                .then((response) => {
                    if (response !== undefined)
                        Alert.alert("Thông báo", response.message)

                    onRefresh();
                })
                .catch(() => {
                    Alert.alert("Thông báo", "Hệ thống xảy ra lỗi, vui lòng thử lại sau")
                })
            )
            .catch(() => { Alert.alert("Thông báo", "Hệ thống xảy ra lỗi, vui lòng thử lại sau") });
    }
    const onSendComment = () => {
        if (content.trim().length == 0) {
            Alert.alert("Thông báo", "Vui lòng nhập nội dung")
            return;
        } else {
            getUserID()
                .then(() => addComment(userID, content, place.placeID, defaultRating).then((response) => {

                    onRefresh();
                    setContent('');
                }).catch((error) => {
                    Alert.alert("Thông báo", "Xảy ra lỗi, vui lòng thử lại sau");
                })
                )
                .catch(() => { Alert.alert("Thông báo", "Hệ thống xảy ra lỗi, vui lòng thử lại sau") });
        }
    }

    const onRefresh = () => { setRefreshing(true); getCommentFromServer() }
    const getHeader = () => (
        <View>
            <Text style={styles.title}>Tên địa điểm:</Text>
            <Text style={styles.content}>{place.placeName}</Text>
            <Text style={styles.title}>Địa chỉ:</Text>
            <Text style={styles.content}>{place.address}</Text>
            <ProvinceLocation lat={place.latitude} long={place.longitude} />
            <Text style={styles.title}>Mô tả:</Text>
            <Text style={styles.content}>{place.description}</Text>
            <FlatList
                data={place.images}
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
            <Text style={styles.title}>Có thể bạn chưa biết:</Text>
            <Text style={styles.content}>{place.tips}</Text>


            <Text style={{ fontWeight: 'bold', margin: 15 }}>Bình luận: </Text>

        </View>
    )


    const CustomRating = () => {
        return (
            <View style={{
                paddingLeft: 17,
                paddingBottom: 10
            }}>
                <Text>Đánh giá của bạn:</Text>
                <View style={styles.containerStar}>
                    {
                        maxRating.map((item, key) => {
                            return (
                                <Pressable
                                    activeOpacity={0.7}
                                    key={key}
                                    onPress={() => { setdefaultRating(item) }}
                                >
                                    <Image
                                        style={{
                                            width: 25,
                                            height: 25,
                                        }}
                                        source={

                                            // item <= defaultRating ? { uri: starFill } : { uri: starUnFill }
                                            item <= defaultRating ?
                                                require('../resources/imgs/star_filled.png') :
                                                require('../resources/imgs/star_corner.png')

                                        }
                                    />
                                </Pressable>
                            )
                        })
                    }
                </View>
            </View>

        )
    }


    return (
        <SafeAreaView>
            {/* <Appbar.Header statusBarHeight={20} >
                <Appbar.BackAction onPress={() => { navigation.pop() }} />
                <Appbar.Content title="Thông tin du lịch" />
            </Appbar.Header> */}
            <View>
                {isLoading ? <ActivityIndicator size="large" color='blue' /> :
                    <FlatList
                        data={listComment}
                        keyExtractor={item => item.id.toString()}

                        ListHeaderComponent={getHeader}
                        ListFooterComponent={
                            <View style={{ backgroundColor: 'white', flexDirection: 'column' }}>
                                <View style={{ flexDirection: 'row' }}>
                                    <TextInput
                                        style={styles.inputText}
                                        multiline
                                        onChangeText={(value) => { setContent(value) }}
                                        placeholder="Để lại bình luận..."
                                        value={content}

                                    />

                                    <Pressable
                                        onPress={() => { onSendComment() }}
                                        style={styles.buttonSend}>
                                        <Text>Gửi</Text>
                                    </Pressable>

                                </View>
                                <CustomRating />
                            </View>

                        }
                        contentContainerStyle={{ paddingBottom: 400 }}
                        renderItem={({ item, index }) => {
                            return (
                                <View>
                                    <CommentItem
                                        item={item} index={index}
                                        handleDelete={deleteComment}
                                    >
                                    </CommentItem>

                                </View>

                            );
                        }}
                        refreshControl={
                            <RefreshControl
                                refreshing={refreshing}
                                onRefresh={() => onRefresh()}
                            />
                        }
                    >
                    </FlatList>
                }
            </View>
            {/* <TabDetailPlace /> */}
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
    containerStar: {
        flex: 1,
        flexDirection: 'row'
    },
})
export default PlaceInfoDetail;