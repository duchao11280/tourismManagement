import React, { useState } from 'react';
import {
    View, Text, Image, Pressable, StyleSheet, TextInput,
    SafeAreaView, Alert, ActivityIndicator
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Appbar } from 'react-native-paper';
import { changePassword } from '../networking/usernetworking';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ChangePassWord = ({ navigation }) => {
    const [isLoading, setLoading] = useState(false);

    const [oldPassword, setOldPassWord] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [repeatPassword, setRepeatPassword] = useState('');
    let isValidate = false;
    // quay lại màn hình trước đó
    const goBack = () => {
        navigation.pop();
    }

    // Lấy userID từ store
    let userID;
    const getUserID = async () => {
        try {
            const id = await AsyncStorage.getItem('userID')
            userID = parseInt(id);
        } catch (error) {
            Alert.alert("Thông báo", "Hệ thống xảy ra lỗi, vui lòng thử lại sau")
        }
    }
    // xử lý thay đổi mật khẩu
    const handleChangePassword = () => {
        setLoading(true)
        var params = {
            oldPassword: oldPassword,
            newPassword: newPassword,
            confirmPassword: repeatPassword,
        }
        getUserID()
            .then(() => changePassword(userID, params)
                .then((response) => {
                    setLoading(false);
                    showAlert(response.message, response.status);
                })
                .catch((error) => {
                    Alert.alert("Thông báo", "Xảy ra lỗi, vui lòng thử lại sau");
                })
            )
            .catch(() => Alert.alert("Thông báo", "Hệ thống xảy ra lỗi, vui lòng thử lại sau"));
    }
    const validate = () => {
        if (oldPassword.length < 6 || newPassword.length < 6 || repeatPassword.length < 6) {
            showAlert("Độ dài mật khẩu tối thiểu 6 kí tự", false);
            isValidate = false
        } else if (newPassword != repeatPassword) {
            showAlert("Mật khẩu không khớp", false);
            isValidate = false
        } else isValidate = true
    }
    // truyền vào tin nhắn và trạng thái
    const showAlert = (mess, status) => {
        Alert.alert(
            "Thông báo",
            mess,
            [
                { text: "OK", onPress: () => { if (status != false) { goBack() } } }
            ]
        );
    }
    return (
        <SafeAreaView style={Styles.container}>
            <Appbar.Header statusBarHeight={20}>
                <Appbar.BackAction onPress={() => { goBack() }} />
                <Appbar.Content title="Thay đổi mật khẩu" />
            </Appbar.Header>
            <KeyboardAwareScrollView>
                <View style={Styles.logo}>
                    <Image
                        source={require('../resources/imgs/Logo.png')}
                        style={Styles.logo}
                    />
                </View>

                <View style={Styles.cardInfo}>
                    <Text style={Styles.title}>Mật khẩu cũ</Text>
                    <TextInput
                        secureTextEntry
                        style={Styles.inputText}
                        onChangeText={setOldPassWord}
                        placeholder="Mật khẩu cũ..."
                    />
                    <Text style={Styles.title}>Mật khẩu mới</Text>
                    <TextInput
                        secureTextEntry
                        style={Styles.inputText}
                        onChangeText={setNewPassword}
                        placeholder="Mật khẩu mới..."
                    />
                    <Text style={Styles.title}>Nhập lại mật khẩu mới</Text>
                    <TextInput
                        secureTextEntry
                        style={Styles.inputText}
                        onChangeText={setRepeatPassword}
                        placeholder="Nhập lại mật khẩu..."
                    />
                </View>

                <View style={Styles.button}>
                    {isLoading ? <ActivityIndicator size="large" color='blue' /> :
                        <Pressable
                            onPress={() => {
                                validate()
                                if (isValidate) {
                                    handleChangePassword();
                                    isValidate = false;
                                }
                            }}
                            style={Styles.buttonUpdate}
                        >
                            <Text style={Styles.textButton}>Xác nhận</Text>
                        </Pressable>}
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}

const Styles = StyleSheet.create({
    container: {
        backgroundColor: '#ADD8E6',
        flex: 1,
    },
    logo: {
        alignItems: "center",
    },
    cardInfo: {
        padding: 25,
        backgroundColor: 'white',
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 7,
        },
        shadowOpacity: 0.41,
        shadowRadius: 9.11,
        justifyContent: 'center',
        elevation: 14,
    },
    button: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    buttonUpdate: {
        borderRadius: 20,
        padding: 18,
        backgroundColor: 'white',
        width: '70%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textButton: {
        fontSize: 18,
    },
    inputText: {
        margin: 10,
        borderRadius: 20,
        borderColor: "black",
        padding: 15,
        borderWidth: 1,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ChangePassWord;