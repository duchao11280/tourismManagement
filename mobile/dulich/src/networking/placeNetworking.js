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

const getAllPlaces = async (city) => {
  try {
    let accessToken = await getToken();
    const response = await fetch(
      API_URL + `/api/v1/place/`,
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

// get place for picker
const getAllPlaceIDandName = async () => {
  try {
    let accessToken = await getToken();
    const response = await fetch(
      API_URL + `/api/v1/place/idandname`,
      {
        method: 'GET',
        headers: {
          "x-access-token": accessToken,
        }
      }
    );
    const json = await response.json();
    return json.data;
  } catch (error) {

  }
};
export { getAllPlaces, getAllPlaceIDandName }