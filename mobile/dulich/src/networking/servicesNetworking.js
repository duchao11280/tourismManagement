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

const getAllServiceByPlaceID = async (id, typeService) => {
    try {
        let accessToken = await getToken();
        const response = await fetch(
            API_URL + `/api/v1/service/${id}`,
            {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    "x-access-token": accessToken,
                },
                body: JSON.stringify({
                    typeService: typeService
                })
            }
        );
        const json = await response.json();
        // console.log(json);
        return json;
    } catch (error) {
    }
};

const getAllHotel = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/service/services/1`,
            {
                method: 'GET',
                credentials: "include"
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {

    }
};

const getAllOtherServices = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/service/services/2`,
            {
                method: 'GET',
                credentials: "include"
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {

    }
};

export { getAllServiceByPlaceID, getAllHotel, getAllOtherServices }