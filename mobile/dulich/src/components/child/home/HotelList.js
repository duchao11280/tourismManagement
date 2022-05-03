import React, { Component } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Dimensions, ImageBackground } from 'react-native';



const ServicesList = (props) => {
    const hotel = props.hotels;

    const windowHeight = Dimensions.get('window').height;

    return (
        <View style={Styles.container}>
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

            <Pressable >
                <View >
                    <ImageBackground style={Styles.image}
                        source={require('../../../resources/imgs/defau.jpg')}>
                        <View style={{ position: 'absolute', top: 51, left: 0, right: 0, bottom: 0, marginLeft: 8 }}>
                            <Text style={Styles.nameProvince}>{hotel.serviceName}</Text>
                        </View>
                    </ImageBackground>
                </View>
            </Pressable>
        </View>
    );
}

const Styles = StyleSheet.create({

    container: {
        alignItems: 'center',
        backgroundColor: "#e8ffee",
        borderRadius: 20,
        marginTop: 10,
        marginBottom: 20,
        marginRight: 15,
        elevation: 10,
        flexDirection: "row",
        paddingLeft: 8,
    },
    containerInfo: {
        flexDirection: "column",
        width: "60%",
        paddingTop: 5,
        paddingLeft: 10,

    },
    image: {
        width: Dimensions.get('window').width * 0.4,
        height: 80,
        borderRadius: 15,

    },
    nameHotel: {
        fontSize: 16,
        color: `#000080`,
        fontWeight: 'bold',
        lineHeight: 20,
        marginRight: 15,
    },
    infoText: {
        fontSize: 13,
        color: `#000080`,
        lineHeight: 20,
        marginRight: 15,
    },
    nameProvince: {
        fontSize: 17,
        color: `#000080`,
    }
})
export default ServicesList;