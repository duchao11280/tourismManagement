import React, { Component } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Dimensions, ImageBackground } from 'react-native';
import MapView, { Marker } from 'react-native-maps';


const ProvinceLocation = (props) => {
    var long = parseFloat(props.long);
    var lat = parseFloat(props.lat);


    const windowHeight = Dimensions.get('window').height;
    return (
        <View style={Styles.container}>

            <MapView
                liteMode={true}

                style={{ flex: 1 }}
                initialRegion={
                    {
                        latitude: isNaN(lat) ? 10.850731929292637 : lat,
                        longitude: isNaN(long) ? 106.77191156833454 : long,
                        latitudeDelta: 0.0922 / 60,
                        longitudeDelta: 0.0421 / 50,
                    }
                }
            >
                <Marker
                    coordinate={{
                        latitude: isNaN(lat) ? 10.850731929292637 : lat,
                        longitude: isNaN(long) ? 106.77191156833454 : long,
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