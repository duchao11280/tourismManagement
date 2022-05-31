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

const getAllTripByCity = async (city) => {
    try {
        let accessToken = await getToken();
        const response = await fetch(
            API_URL + `/api/v1/trip/getbycity`,
            {
                method: 'POST',
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
                    "x-access-token": accessToken,
                },
                body: JSON.stringify({
                    city: city
                })
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {

    }
};
const getTripDetailById = async (id) => {
    try {
        let accessToken = await getToken();
        const response = await fetch(
            API_URL + `/api/v1/trip/getdetailbyid/${id}`,
            {
                method: 'GET',
                headers: {
                    "x-access-token": accessToken,
                },
            }
        );
        let json
        if (response.status === 200) {
            json = await response.json();
        } else {
            json = { message: "Không có dữ liệu", data: {} }
        }

        return json;
    } catch (error) {

    }
};
export {
    getAllTripByCity,
    getTripDetailById,
}