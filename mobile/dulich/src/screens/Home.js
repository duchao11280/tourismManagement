import * as React from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, Pressable } from 'react-native';
import { FontAwesome5 } from 'react-native-vector-icons';
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';



const Home = ({ navigation}) => {
    return (
        <View style={styles.container}>
            <View style={styles.BeachImage}>
                <Image source={require('../resources/imgs/Beach.png')} />
            </View>

            <View style={styles.firstHeadButtonView}>
                <View style={styles.ServiceButton}>
                    <Pressable onPress={() => navigation.navigate("PlacesInfo")}>
                        <Entypo name="location" size={40} color="black" style={styles.icon} />
                        <Text style={styles.FontButton}>Địa điểm</Text>
                    </Pressable>
                </View>

                <View style={styles.ServiceButton} >
                    <Pressable onPress={() => navigation.navigate("Hotel")}>
                        <FontAwesome5 name={'hotel'} size={40} style={styles.icon} />
                        <Text style={styles.FontButton}>Khách sạn</Text>
                    </Pressable>
                </View>


                <View style={styles.ServiceButton}>
                    <Pressable onPress={() => navigation.navigate("Restaurant")}>
                        <FontAwesome5 name={'utensils'} size={40} style={styles.icon} />
                        <Text style={styles.FontButton}>Nhà Hàng</Text>
                    </Pressable>
                </View>
            
                <View style={styles.ServiceButton} >
                    <Pressable onPress={() => console.log("Receipt")}>
                        <MaterialIcons name="receipt-long" size={40} color="black" style={styles.icon} />
                        <Text style={styles.FontButton}>Hóa đơn Phòng </Text>
                    </Pressable>
                </View>

                <View style={styles.ServiceButton}>
                    <Pressable onPress={() => console.log("ReceiptTable")}>
                        <MaterialIcons name="receipt-long" size={40} color="black" style={styles.icon} />
                        <Text style={styles.FontButton}>Hóa đơn Bàn </Text>
                    </Pressable>
                </View>


            </View>

        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e6f2ff',
    },
    BeachImage: {
        flexDirection: 'column',
        alignItems: 'center',

    },

    firstHeadButtonView: {
        flexDirection: 'row',
        paddingTop: 40,
        justifyContent:'space-around',
        flexWrap:'wrap'

    },
    FontButton: {
        fontSize: 16,
    },

    ServiceButton: {
        marginHorizontal: 20,
        marginTop:20,
    },
    icon: {
        justifyContent:'center',
        alignSelf:'center'
    },
})




export default Home;