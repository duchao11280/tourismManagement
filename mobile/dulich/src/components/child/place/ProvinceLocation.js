import React, { Component } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Dimensions, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const ProvinceLocation = (props) => {
    var long = parseFloat(props.long);
    var lat = parseFloat(props.lat);
    // var lat = Double.parseDouble(props.lat);
    // var long = Double.parseDouble(props.long);
    const windowHeight = Dimensions.get('window').height;
    return (
        <View style={Styles.container}>
            {/* <Text>{long}</Text>
            <Text>{lat}</Text> */}
            <MapView
                liteMode={true}

                style={{ flex: 1 }}
                initialRegion={
                    {
                        latitude: lat,
                        longitude: long,
                        latitudeDelta: 0.0922 / 60,
                        longitudeDelta: 0.0421 / 50,
                    }
                }
            >
                <Marker
                    coordinate={{
                        latitude: lat,
                        longitude: long,
                    }}
                />
            </MapView>


        </View >
    );
}

const Styles = StyleSheet.create({

    container: {
        padding: 10,
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height * 0.35,

    },
    image: {
        width: Dimensions.get('window').width * 0.8,
        height: 80,
        borderRadius: 15,

    },
    nameMap: {
        fontSize: 17,
        color: `#000080`,

    }
})
export default ProvinceLocation;