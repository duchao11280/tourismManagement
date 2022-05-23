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

const getHotelByCity = async (city) => {
    try {
        let accessToken = await getToken();
        const response = await fetch(
            API_URL + `/api/v1/service/hotel/searchbycity`,
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

        return json.data;
    } catch (error) {
    }
};

const getOtherServicesByCity = async (city) => {

    try {
        let accessToken = await getToken();
        const response = await fetch(
            API_URL + `/api/v1/service/otherservices/searchbycity`,
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

        return json.data;
    } catch (error) {
    }
};

export { getAllServiceByPlaceID, getHotelByCity, getOtherServicesByCity }