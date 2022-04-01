import React, { useState, useEffect } from 'react'
import {
  StyleSheet, Text, View, Pressable,
  ActivityIndicator, Alert, Image, TextInput,
} from 'react-native';
import { COLORS } from '../resources/values/colors'
import { Appbar } from 'react-native-paper';
import { signUp } from '../networking/usernetworking'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Icon } from 'react-native-elements'

const SignUp = ({navigation}) => {
  const [fullName, setfullName] = useState('');
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [email, setemail] = useState('');
  const [phonenumber, setphonenumber] = useState('');
  const [role, setrole] = useState(0);
  const [isLoading, setLoading] = useState(false);
  let isValidate = false;

  //Signup
  const onSignup = () => {
    var params = {
      fullName: fullName,
      userName: userName.trim(),
      password: password.trim(),
      email: email,
      phonenumber: phonenumber,
      role: role
    };

    signUp(params).then((response) => {
      if (response === undefined) {
        Alert.alert("Thông báo", "Xảy ra lỗi, vui lòng thử lại sau");
        return;
      }
      Alert.alert("Thông báo", response.message, [{ text: "Đồng ý", onPress: () => { goBack(); } }]);
    }).catch((error) => {
      Alert.alert("Thông báo", "Xảy ra lỗi, vui lòng thử lại sau");
    }).finally(() => {
      setLoading(false);
    })
  }
  const validate = () => {
    const reg = new RegExp('^[0-9]+$');
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (fullName.length == 0) {
      showAlert("Tên không được để trống", false);
      isValidate = false
    }
    else if (userName.includes(" ")) {
      showAlert("Tên đăng nhập không được chứa khoảng trống", false);
      isValidate = false
    }
    else if (password.includes(" ")) {
      showAlert("mật khẩu không được chứa khoảng trống", false);
      isValidate = false
    }
    else if (!reg.test(phonenumber)) {
      showAlert("số điện thoại không hợp lệ", false);
      isValidate = false
    }
    else if (reg.test(fullName)) {
      showAlert("tên đầy đủ không hợp lệ", false);
      isValidate = false
    }
    else if (userName.length < 7) {
      showAlert("Tên đăng nhập phải lớn hơn 6 kí tự", false);
      isValidate = false
    }
    else if (phonenumber.length < 10) {
      showAlert("Số điện thoại không hợp lệ", false);
      isValidate = false
    }

    else if ((password.trim()).length < 6) {
      showAlert("Mật khẩu phải từ 6 ký tự trở lên", false);
      isValidate = false
    }
    else if (password != confirmpassword) {
      showAlert("Nhập lại mật khẩu không khớp", false);
      isValidate = false
    }
    else if (!re.test(email)) {
      showAlert("Email sai định dạng", false);
      isValidate = false
    } else isValidate = true
  }
  const showAlert = (mess, status) => {
    Alert.alert(
      "Thông báo",
      mess,
      [
        { text: "Đồng ý", onPress: () => { if (status != false) { goBack() } } }
      ]
    );
  }
  const goBack = () => {
    navigation.pop();
}
  return (
    <KeyboardAwareScrollView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}>
      <Appbar.Header statusBarHeight={20}>
        <Appbar.BackAction onPress={() => { goBack() }} />
        <Appbar.Content title="Đăng ký tài khoản" />
      </Appbar.Header>
      <View style={styles.logo}>
        <Image
          source={require('../resources/imgs/Logo.png')} />
      </View>
      <View>
        <Text style={styles.title}>ĐĂNG KÝ TÀI KHOẢN</Text>
        <View style={styles.Input}>
          <Icon
            name='address-book' type='font-awesome'
            color='black' size={24} containerStyle={styles.icon}
          />
          <TextInput placeholder="Họ và tên"
            style={styles.inputText}
            onChangeText={setfullName}
            value={fullName}
            
          />
        </View>
        
        <View style={styles.Input}>
          <Icon
            name='user' type='font-awesome'
            color='black' size={24} containerStyle={styles.icon}
          />
          <TextInput placeholder="Tên đăng nhập"
            style={styles.inputText}
            onChangeText={setuserName}
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
            onChangeText={setpassword}
            value={password}
          />
        </View>
        <View style={styles.Input}>
          <Icon
            name='lock' type='font-awesome'
            color='black' size={24} containerStyle={styles.icon}
          />
          <TextInput placeholder="Nhập lại mật Khẩu"
            style={styles.inputText}
            secureTextEntry={true}
            onChangeText={setconfirmpassword}
            value={confirmpassword}
          />
        </View>

        <View style={styles.Input}>
          <Icon
            name='envelope-o' type='font-awesome'
            color='black' size={24} containerStyle={styles.icon}
          />
          <TextInput style={styles.inputText} placeholder="Địa chỉ email"
              value={email}
              onChangeText={setemail}
              keyboardType='email-address' />
        </View>
        <View style={styles.Input}>
          <Icon
            name='phone' type='font-awesome'
            color='black' size={24} containerStyle={styles.icon}
          />
          <TextInput style={styles.inputText} placeholder="Số điện thoại"
              value={phonenumber}
              onChangeText={setphonenumber}
              keyboardType='numeric'
            />
        </View>
        <View>
          {isLoading ? <ActivityIndicator size="large" color='blue' /> :
            <Pressable
              onPress={() => {

                validate();
                if (isValidate == true) {
                  setLoading(true);
                  onSignup()
                  isValidate = false;
                }
              }}
              style={styles.buttonSignUp}>
              <Text style={styles.buttonTextSignUp}>ĐĂNG KÝ</Text>
            </Pressable>
          }
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
    marginTop: '10%',
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
  buttonSignUp: {
    elevation: 8,
    backgroundColor: COLORS.primarybutton,
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop: 40,
    margin: 30
  },
  buttonTextSignUp: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
});

export default SignUp;
