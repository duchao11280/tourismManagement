import AsyncStorage from '@react-native-async-storage/async-storage';
import { GLOBALS } from '../resources/values/globals'

const API_URL = GLOBALS.API_URL;

const getToken = async () => {
    try {
        const token = await AsyncStorage.getItem('keytoken')
        return token
    } catch (error) {
        return;
    }
}

// get notification
const getAllNotification = async () => {
    try {
        let accessToken = await getToken();
        const response = await fetch(
            API_URL + `/api/v1/notification`,
            {
                method: 'GET',
                headers: {
                    "x-access-token": accessToken,
                }
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {

    }
};
export {
    getAllNotification,
}