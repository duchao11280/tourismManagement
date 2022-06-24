import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StyleSheet, Pressable, Dimensions, FlatList, ActivityIndicator, RefreshControl } from 'react-native'
import { Picker } from '@react-native-picker/picker';
import { getAllTripByCity } from '../networking/tripNetworking'
import { Card, Button, Icon } from 'react-native-elements'

const Trip = ({ navigation }) => {
    const [nameFilter, setNameFilter] = useState("Đồng Nai");
    const [listTrip, setListTrip] = useState([])
    const [isLoading, setLoading] = useState(true);
    const [refresh, setRefresh] = useState(false)
    useEffect(() => {

        getTripFromServer()

    }, [nameFilter])
    const getTripFromServer = () => {
        setLoading(true)
        getAllTripByCity(nameFilter)
            .then((response) => { setListTrip(response.data) })
            .catch(() => setListTrip([]))
            .finally(() => { setLoading(false); setRefresh(false); })
    }
    const onRefresh = () => { setRefresh(true); getTripFromServer(); }
    function getRndInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    const renderItemTrip = ({ item }) => {
        let randomNumber = getRndInteger(1, 2)
        let imageDefault
        if (nameFilter === "Đồng Nai") {
            if (randomNumber === 1) {
                imageDefault = require(`../resources/imgs/default_1.jpg`)
            } else {
                imageDefault = require(`../resources/imgs/default_2.jpg`)
            }
        } else {
            if (randomNumber === 1) {
                imageDefault = require(`../resources/imgs/default_3.jpg`)
            } else {
                imageDefault = require(`../resources/imgs/default_4.jpg`)
            }
        }
        return (
            <Pressable style={styles.cardTrip} onPress={() => { navigation.push('DetailsTrip', { trip: item }) }}>
                < Card >
                    <Card.Image style={styles.image} source={imageDefault} />
                    <Card.Divider />
                    {
                        item.tripName.length > 18 ?
                            <Text style={styles.nameTrip}>{item.tripName.slice(0, 18)}...</Text> :
                            <Text style={styles.nameTrip}>{item.tripName}</Text>
                    }

                    <Text style={styles.description}>
                        Lịch trình {item.numberOfDays > 0 ? item.numberOfDays : "ngắn"} ngày
                    </Text>
                </Card >
            </Pressable>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeaderFirst}>
                    Gợi ý các lịch trình cho bạn ☺
                </Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
                <Text style={styles.contentTitle} > Lịch trình theo tỉnh thành :</Text>

                <View style={styles.pickerStyle}>
                    <Picker
                        selectedValue={nameFilter}
                        onValueChange={(itemValue, itemIndex) => {
                            setNameFilter(itemValue)
                        }}
                    >
                        <Picker.Item label="T.p Hồ Chí Minh" value="Thành Phố Hồ Chí Minh" />
                        <Picker.Item label="Đồng Nai" value="Đồng Nai" />

                    </Picker>
                </View>

            </View>
            <View>
                {isLoading ? <ActivityIndicator size="large" color='blue' /> :
                    <FlatList
                        data={listTrip}
                        ListFooterComponent={<View style={{ paddingBottom: 400 }} />}
                        keyExtractor={item => item.tripID.toString()}
                        numColumns={2}
                        renderItem={renderItemTrip}
                        refreshControl={
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={() => onRefresh()}
                            />
                        }
                    >
                    </FlatList>}
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',

    },
    header: {

        height: Dimensions.get('window').height * 0.2,
        backgroundColor: "#61a5dc",
        borderBottomRightRadius: 150,
        justifyContent: "center",
    },
    textHeaderFirst: {
        fontSize: 27,
        marginVertical: 20,
        marginHorizontal: "20%",
        color: "white",
        textAlign: "center",
    },
    textHeaderSecond: {
        fontSize: 20,
        color: "white",
        marginVertical: 10,
        marginHorizontal: 50,
    },
    pickerStyle: {
        paddingLeft: 10,
        width: 230,
        height: 50,
    },
    contentTitle: {
        paddingTop: 17,
        fontSize: 13,
        fontWeight: "800"
    },
    description: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        fontSize: 10,
    },
    cardTrip: {
        flex: 1 / 2,
    },
    nameTrip: {
        fontWeight: "bold",
        fontSize: 13,
    }
})
export default Trip
