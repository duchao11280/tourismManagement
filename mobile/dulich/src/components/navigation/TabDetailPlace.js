import React from 'react'
import { View, Text, Pressable, StyleSheet, Dimensions } from 'react-native'
import { Icon } from 'react-native-elements'
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeNavigator from './HomeNavigator'
import UserNavigator from './UserNavigator'
import { useIsFocused } from '@react-navigation/native'
import PlaceInfoDetail from '../../screens/PlaceInfoDetail'
import PlaceInfoHotel from '../../screens/PlaceInfoHotel'
import PlaceInfoServices from '../../screens/PlaceInfoServices'
import HotelNavigator from '../../components/navigation/HotelNavigator'
import { Appbar } from 'react-native-paper';
const Tab = createMaterialTopTabNavigator();

const TabDetailPlace = ({ navigation, route }) => {

    return (
        <Tab.Navigator tabBar={(props) =>
            <View>
                <Appbar.Header statusBarHeight={20}>
                    <Appbar.BackAction onPress={() => { navigation.pop() }} />
                    <Appbar.Content title="Thông tin du lịch" />
                </Appbar.Header>
                <View style={styles.tabBarButton}>
                    <View style={props.state.index == 0 ? styles.buttonPressed : styles.button}>
                        <Pressable
                            onPress={() => {
                                if (props.state.index != 0) {
                                    navigation.navigate(props.state.routes[0].name);
                                }
                            }}
                        ><Text style={styles.longText}>Thông tin du lịch</Text></Pressable>
                    </View>


                    <View style={props.state.index == 1 ? styles.buttonPressed : styles.button}>
                        <Pressable
                            onPress={() => {
                                if (props.state.index != 1) {
                                    navigation.navigate(props.state.routes[1].name, {});
                                }
                            }}
                        ><Text style={styles.shortText}>Nơi ở</Text></Pressable>
                    </View>

                    <View style={props.state.index == 2 ? styles.buttonPressed : styles.button}>
                        <Pressable
                            onPress={() => {
                                if (props.state.index != 2) {
                                    navigation.navigate(props.state.routes[2].name);
                                }
                            }}
                        ><Text style={styles.shortText}>Tiện ích</Text></Pressable>
                    </View>

                </View>

            </View>
        } >
            <Tab.Screen name="PlaceInfoDetail" component={PlaceInfoDetail} initialParams={route.params} options={{ title: "Thông tin Du lịch" }} />
            <Tab.Screen name="HotelNavigator" component={HotelNavigator} initialParams={route.params} options={{ title: "Thông tin Khách sạn" }} />
            <Tab.Screen name="PlaceInfoServices" component={PlaceInfoServices} initialParams={route.params} options={{ title: "Thông tin tiện ích" }} />
        </Tab.Navigator>
    )
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#e8ffee',
        marginBottom: 10,
    },
    tabBarButton: {
        flexDirection: "row",
        backgroundColor: '#e8ffee',
    },
    button: {
        width: Dimensions.get('window').width * 0.3333,
        height: 50,
        borderRadius: 4,
        borderLeftWidth: 1
    },
    buttonPressed: {
        width: Dimensions.get('window').width * 0.3333,
        height: 50,
        borderRadius: 4,
        borderLeftWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: 'red',
    },
    longText: {
        fontSize: 14,
        marginLeft: 10,
        marginTop: 15,
        letterSpacing: 0.25,
    },
    shortText: {
        fontSize: 18,
        marginLeft: 40,
        marginTop: 13,
        letterSpacing: 0.25,
    }
})


export default TabDetailPlace
