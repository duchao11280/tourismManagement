import React, { Component, useEffect, useState } from 'react';
import {
    View, Text, Image, Pressable, RefreshControl, Alert,
    ActivityIndicator, StyleSheet, FlatList, SafeAreaView, TouchableHighlight
} from 'react-native';
import RoomCard from './RoomCard';
const ListRoomAtPlace = (props) => {
    return (
        <View style={Styles.container} >
            <Text style={Styles.textPlaceName}>{props.item.placeName}</Text>
            <FlatList
                data={props.item.listRoom}

                keyExtractor={item => item.roomID.toString()}
                renderItem={({ item, index }) => {
                    return (
                        <RoomCard 
                            item={item} 
                            index={index}
                            action={props.action}
                        >
                        </RoomCard>


                    );
                }}
            >
            </FlatList>
        </View>
    )
}
const Styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: "#e8ffee",
        borderRadius: 15,
        padding: 10,
        marginTop: 10,
        marginHorizontal: 5,
    },

    textPlaceName: {
        fontSize: 20,
        textAlign: "center",
    }

})
export default ListRoomAtPlace
