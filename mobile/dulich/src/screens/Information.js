import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Button, Image, TextInput, TouchableOpacity, Alert } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { FontAwesome5 } from 'react-native-vector-icons';
import { Appbar } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';

const Information = ({ navigation }) => {

  const getUserName = async () => {
    try {
      const fullname = await AsyncStorage.getItem('fullName')
      return fullname
    } catch (error) {
      return
    }
  }

  const [fullName, setfullName] = useState('');
  useEffect(() => {
    getUserName().then((response) => {
      setfullName(response);
    }).catch(() => { Alert.alert("Thông báo", "Có lỗi xảy ra vui lòng thử lại") });
  })
  const Line = () => {
    return (
      <View style={{ height: 1, backgroundColor: 'black' }} />
    )
  }
  const onLogOut = () => {
    navigation.navigate("LogIn")
    AsyncStorage.clear();
  }
  return (
    <View style={[styles.container]}>
      <Appbar.Header statusBarHeight={20}>
        <Appbar.Content title="Thông tin tài khoản" />
      </Appbar.Header>

      <View style={styles.HeadContainer}>
        <View style={styles.AvartarView}>
          <Image source={require('../resources/imgs/avatar.png')} style={{ width: 50, height: 50 }} />
        </View>

        <View style={styles.WelcomeView}>
          <Text style={styles.TextWelcome} > Xin Chào! {"\n "}
            {fullName}</Text>
        </View>

        <TouchableOpacity style={styles.LogoutButton} onPress={() => onLogOut()} >
          <Text style={styles.LogOutText} > Thoát</Text>
        </TouchableOpacity>
      </View>



      <View style={styles.BodyContainer}>
        <Text style={styles.headTitle} > Tài khoản của tôi</Text>
        <Line />

        <View style={styles.TitleView}>
          <TouchableOpacity style={[{ flex: 0.5, flexDirection: 'row', paddingLeft: 10 }]} onPress={() => navigation.push('Profile')}>
            <FontAwesome5 name={'user'} size={20} />
            <Text style={styles.Title}>Thông tin của bạn</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.TitleView}>
          <TouchableOpacity style={[{ flex: 0.5, flexDirection: 'row', paddingLeft: 10 }]} onPress={() => navigation.push('Feedback')}>
            <AntDesign name="mail" size={20} color="black" />
            <Text style={styles.Title}>Gửi góp ý</Text>
          </TouchableOpacity>
        </View>


        {/* <View style={styles.TitleView}>
          <TouchableOpacity style={[{ flex: 0.5, flexDirection: 'row' }]} onPress={() => navigation.push('Feedback')}>
            <FontAwesome5 name={'envelope'} size={20} />
            <Text style={styles.Title}>Gửi thư góp ý</Text>
          </TouchableOpacity>
        </View> */}




        <Text style={styles.headTitle}> Thông tin</Text>
        <Line />
        <View style={styles.TitleView}>
          <TouchableOpacity style={[{ flex: 0.5, flexDirection: 'row', paddingLeft: 14 }]} onPress={() => alert('Ứng dụng thực hiện cho Khóa Luận tốt nghiệp')} >
            <FontAwesome5 name={'info'} size={30} />
            <Text style={styles.Title}>  Về ứng dụng</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.TitleView}>
          <TouchableOpacity style={[{ flex: 0.5, flexDirection: 'row', paddingLeft: 9 }]} onPress={() => alert('Ứng dụng thực hiện bởi Đức Hảo và Thanh Hoàng')}>
            <FontAwesome5 name={'users'} size={20} />
            <Text style={styles.Title}>Về chúng tôi</Text>
          </TouchableOpacity>
        </View>





      </View>
    </View>
  );

}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  HeadContainer: {
    flexDirection: 'row',
    flex: 0.4,
    backgroundColor: '#ccccff'
  },
  BodyContainer: {
    flex: 3,
    backgroundColor: '#e6f2ff'

  },
  WelcomeView: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 50
  },
  AvartarView: {
    width: 10,
    height: 10,
    paddingTop: 15,
    paddingLeft: 5
  },
  TextWelcome: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1
  },
  LogoutButton: {
    flex: 1,
    alignItems: 'flex-end',
    paddingTop: 30,
    paddingRight: 10

  },
  LogOutText: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
  },
  TitleView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 5
  },
  Title: {
    fontSize: 20,
    paddingLeft: 10
  },
  headTitle: {
    fontSize: 15,
    paddingBottom: 5,
    paddingTop: 15,

  }

})

export default Information;