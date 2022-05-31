import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, Pressable, StyleSheet, FlatList, Alert } from 'react-native'
import Timeline from 'react-native-timeline-flatlist'
import { getTripDetailById } from '../networking/tripNetworking'
import { getPlaceByID } from '../networking/placeNetworking'
import { getServicebyServiceID } from '../networking/servicesNetworking'
const DetailsTrip = ({ navigation, route }) => {

    let tripID = route.params?.trip.tripID;
    const [detailsTrip, setDetailsTrip] = useState({
        tripID: null,
        tripName: "",
        city: "",
        numberOfDays: 0,
        isDisabled: 1,
        detail: [{ day: 1, detail: [{ id: null, tripID: null, placeID: null, note: "", timeClock: "", type: 0, serviceID: null, placeName: "", latitude: 0, longitude: 0 }] }]
    })
    let arr = []
    let indexArrDistance = -1;
    useEffect(() => {
        getTripDetailById(tripID)
            .then((response) => { setDetailsTrip(response.data); })
            .catch(() => {
                setDetailsTrip({
                    tripID: null,
                    tripName: "",
                    city: "",
                    numberOfDays: 0,
                    isDisabled: 1,
                    detail: [{ day: 1, detail: [{ id: null, tripID: null, placeID: null, note: "", timeClock: "", type: 0, serviceID: null, placeName: "", latitude: 0, longitude: 0 }] }]
                })
            })

    }, [])
    const gotoDetailPlace = (place) => {
        getPlaceByID(place.placeID)
            .then((place) => { navigation.push('DetailPlaceInTrip', { place: place }) })
            .catch(() => { Alert.alert("Thông báo", "Hệ thống xảy ra lỗi, vui lòng thử lại sau") })
    }
    const gotoDetailService = (service) => {
        getServicebyServiceID(service.serviceID)
            .then((services) => { navigation.push('DetailServiceInTrip', { item: services }) })
            .catch(() => { Alert.alert("Thông báo", "Hệ thống xảy ra lỗi, vui lòng thử lại sau") })
    }
    const renderDetailTimeLine = (rowData, sectionID, rowID) => {
        let title = <Text style={[styles.titleTimeLine]}>
            {rowData.type === 0 ? rowData.placeName : rowData.serviceName}
        </Text>
        var desc = null
        if (rowData.note)
            desc = (
                <View style={styles.descriptionContainer}>
                    <Text style={[styles.textDescription]}>{rowData.note}</Text>
                </View>
            )

        return (
            <Pressable style={styles.containerDetailItem} onPress={() => {
                if (rowData.type === 0) {
                    gotoDetailPlace(rowData)
                }
                if (rowData.type === 1) {
                    gotoDetailService(rowData)
                }
            }}
            >
                {title}
                {desc}
            </Pressable>
        )
    }
    const renderTimeinTimeLine = (rowData, sectionID, rowID) => {

        return (
            <View style={styles.containTimeItem}>
                <View >
                    <Text style={styles.timeinTimeLine}>{rowData.timeClock}</Text>
                </View>
                {rowData.distanceToNext > 1 && rowData.distanceToNext < 1000 ?
                    <View style={styles.distanceTimeline}>
                        <Text style={styles.textDistance}> ~{rowData.distanceToNext.toFixed(1)} km</Text>
                    </View>
                    : rowData.distanceToNext > 0 && rowData.distanceToNext < 1000 ?
                        <View style={styles.distanceTimeline}>
                            <Text style={styles.textDistance}> ~{(rowData.distanceToNext * 1000).toFixed(1)} m</Text>

                        </View>
                        : <View></View>
                }

            </View>
        )
    }

    const ItemDayOfDetailTrip = (props) => {
        let item = props.item
        return (
            <View>
                <View style={styles.headerDayOfDetailTrip}>
                    <Text> Ngày {item.day} - {item.detail?.length} địa điểm</Text>
                </View>
                <View style={styles.containerDayOfTimeLine}>
                    <Timeline
                        style={styles.list}
                        data={item.detail}
                        circleSize={14}
                        lineColor='gray'
                        renderDetail={renderDetailTimeLine}
                        renderTime={renderTimeinTimeLine}
                        renderFullLine={true}
                        innerCircle="dot"
                    />
                </View>
            </View>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View>
                <Text style={styles.textTripName}>{detailsTrip?.tripName}</Text>
            </View>
            <View style={styles.containerCity}>
                <Text style={styles.textCity}>{detailsTrip?.city}</Text>
            </View>
            <View>
                <FlatList
                    data={detailsTrip?.detail}
                    keyExtractor={item => item.day.toString()}
                    ListFooterComponent={<View style={{ paddingBottom: 300 }} />}
                    renderItem={({ item, index }) => {
                        return (
                            <Pressable
                                onPress={() => { }}
                            >
                                <ItemDayOfDetailTrip item={item} index={index}>
                                </ItemDayOfDetailTrip>
                            </Pressable>

                        );
                    }}
                >
                </FlatList>
            </View>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        padding: 30,
    },
    textTripName: {

        fontSize: 18,
        fontWeight: 'bold',
    },
    containerCity: {
        flexDirection: 'row',

    },
    textCity: {
        backgroundColor: "#f2f2f2",
        fontSize: 15,
        paddingVertical: 5,
        paddingHorizontal: 10,
        flexShrink: 1,
    },
    headerDayOfDetailTrip: {
        backgroundColor: "#61a5dc",
        paddingVertical: 15,
    },
    list: {
        flex: 1,
    },
    containerDayOfTimeLine: {
        paddingVertical: 10,
    },
    titleTimeLine: {
        fontSize: 18,
    },
    descriptionContainer: {
        flexDirection: 'row',
        paddingRight: 50
    },
    textDescription: {
        marginLeft: 10,
        color: 'gray'
    },
    containerDetailItem: {
        borderTopWidth: 1,
        borderTopColor: "#d1d1d1",
        minHeight: 50,
    },
    containTimeItem: {
        width: 80,
    },
    timeinTimeLine: {

        textAlign: "center",
        fontSize: 18,
    },
    distanceTimeline: {
        textAlign: "right",
        flex: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        right: -20,

    },
    textDistance: {
        color: "#808080"
    }
})
export default DetailsTrip
