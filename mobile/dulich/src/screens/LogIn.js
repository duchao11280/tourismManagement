import React, { useState } from 'react'
import {
  StyleSheet, Text, View, Pressable,
  ActivityIndicator, Alert, Image, TextInput,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from 'react-native-elements'
import { COLORS } from '../resources/values/colors'
import { login } from '../networking/usernetworking'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogIn = ({ navigation }) => {
  const [userName, setUsername] = useState("Admin");
  const [password, setPassword] = useState('123456');
  const [isLoading, setLoading] = useState(false);
  let isValidate = false;
  const validate = () => {
    if (userName.length == 0 || password.length < 6) {
      Alert.alert(
        "Thông báo", "Vui lòng nhập thông tin"),
        [{ text: "Ok", onPress: () => { return; } }];
      isValidate = false;
    } else isValidate = true;
  }
  
  const onLogin = async () => {
    const response = await login(userName, password);
    if (response.status == true) {
      setUsername('')
      setPassword('')
      try {
        await AsyncStorage.setItem("userID", response.data.user.userID.toString());
        await AsyncStorage.setItem("role", response.data.user.role.toString());
        await AsyncStorage.setItem("userName", response.data.user.userName.toString());
        await AsyncStorage.setItem("keytoken", response.data.accessToken);
        await AsyncStorage.setItem("fullName", response.data.user.fullName.toString());
        console.log(response.data.user.userName.toString())
        navigation.navigate("TabNavigator")

      } catch (e) {
      }
    } else {
      Alert.alert("Thông báo", response.message), [{ text: "Ok", onPress: () => { } }];
    }

    setLoading(false);
  }

  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <View style={styles.logo}>
        <Image
          source={require('../resources/imgs/Logo.png')} />
      </View>
      <View>
        <Text style={styles.title}>ĐĂNG NHẬP TÀI KHOẢN</Text>

        <View style={styles.Input}>
          <Icon
            name='user' type='font-awesome'
            color='black' size={24} containerStyle={styles.icon}
          />
          <TextInput placeholder="Tên đăng nhập"
            style={styles.inputText}
            onChangeText={setUsername}
            value={userName}
          />
        </View>
        <View style={styles.Input}>
          <Icon
            name='lock' type='font-awesome'
            color='black' size={24} containerStyle={styles.icon}
          />
          <TextInput placeholder="Mật Khẩu"
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={setPassword}
            value={password}
          />
        </View>
        <View>
          {isLoading ? <ActivityIndicator size="large" color='blue' /> :
            <Pressable
              onPress={() => {
                
                validate();
                if (isValidate == true) {
                  setLoading(true);
                  onLogin()
                  isValidate = false;
                }

              }}
              style={styles.buttonLogin}>
              <Text style={styles.buttonTextLogin}>ĐĂNG NHẬP</Text>
            </Pressable>
          }
        </View>

        <View style={styles.viewSignUp}>
          <Text>Bạn chưa có tài khoản?</Text>
          <Pressable
            onPress={() => { navigation.navigate("SignUp") }}
          >
            <Text style={styles.textSignUp}>Đăng Kí</Text>
          </Pressable>
        </View>

      </View>
    </KeyboardAwareScrollView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primarybackground,
  },
  logo: {
    marginTop: '20%',
    alignItems: 'center'
  },
  title: {
    textAlign: 'center',
    fontSize: 15,
    fontWeight: 'bold',
    marginTop: 30,
  },
  Input: {
    flexDirection: 'row',
    height: 60,
    padding: 10,
    paddingLeft: 20,
    marginTop: 20,
    marginLeft: 30,
    marginRight: 30,
    fontSize: 18,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#48BBEC',
    backgroundColor: 'white',
  },
  inputText: {
    marginLeft: 10,

    flex: 1,
  },
  icon: {
    alignSelf: 'center',
  },
  buttonLogin: {
    elevation: 8,
    backgroundColor: COLORS.primarybutton,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 40,
    margin: 30
  },
  buttonTextLogin: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  viewSignUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  textSignUp: {
    marginLeft: 10,
    color: 'red',
    fontWeight: 'bold',
    fontSize: 15,
  },
});

export default LogIn;
