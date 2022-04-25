import React, { Component } from 'react';
import { View, Text, Image, Pressable, StyleSheet, Alert, Dimensions, ImageBackground } from 'react-native';



const Province = (props) => {
    const nameProvince = props.province;

    const windowHeight = Dimensions.get('window').height;
    return (
        <View style={Styles.container}>
            <Pressable onPress={() => props.gotoPlace(nameProvince)}>
                <View >
                    <ImageBackground style={Styles.image}
                        source={require('../../../resources/imgs/defau.jpg')}>
                        <View style={{ position: 'absolute', top: 51, left: 0, right: 0, bottom: 0, marginLeft: 8 }}>
                            <Text style={Styles.nameProvince}>{nameProvince}</Text>
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
        borderRadius: 15,
        marginTop: 10,
        marginBottom: 20,
        marginRight: 15,
        elevation: 10,
    },
    image: {
        width: Dimensions.get('window').width * 0.475,
        height: 80,
        borderRadius: 15,

    },
    nameProvince: {
        fontSize: 17,
        color: `#000080`,

    }
})
export default Province;