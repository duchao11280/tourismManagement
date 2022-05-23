import React, { Component } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Dimensions, ImageBackground } from 'react-native';



const PlaceList = (props) => {

    const hotel = props.hotels;


    const windowHeight = Dimensions.get('window').height;

    return (
        <View >
            {/* <Pressable >
                <Image style={Styles.image}
                    source={require('../../../resources/imgs/defau.jpg')}>
                </Image>
            </Pressable>

            <View style={Styles.containerInfo}>
                <Text style={Styles.nameHotel}>{service.serviceName}</Text>
                <Text style={Styles.infoText}>{service.hotline}</Text>
                <Text style={Styles.infoText}>{service.address}</Text>
            </View> */}


            <View style={Styles.container}>
                <Image style={Styles.image}
                    source={{ uri: hotel.images[0]?.image }}>
                </Image>
                <Text numberOfLines={2} ellipsizeMode="tail" style={Styles.nameProvince}>{hotel.placeName}</Text>
            </View>

        </View>
    );
}

const Styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        justifyContent: "center",
        flexDirection: "column",
        // borderRadius: 15,
        width: 200,
        paddingLeft: 5,
        marginLeft: 10,
        marginTop: 10

    },
    containerInfo: {
        flexDirection: "column",
        width: "60%",


    },
    image: {
        width: Dimensions.get('window').width * 0.5,
        height: 150,
        borderRadius: 15,
    },
    nameHotel: {
        fontSize: 16,
        color: `#000080`,
        fontWeight: 'bold',
        lineHeight: 20,

    },

    nameProvince: {


        fontSize: 17,
        color: `#000080`,
        textAlign: 'justify',
        marginBottom: 15,
    }
})
export default PlaceList;