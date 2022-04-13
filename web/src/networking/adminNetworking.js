import GLOBALS from '../global'
const API_URL = GLOBALS.API_URL;

const getAllPlaces = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/places`,
            {
                method: 'GET',      
                credentials:'include'
            }
        );
        const json = await response.json();
        console.log(json.data)
        return json.data;
    } catch (error) {
        console.log(error)
    }
};
export {getAllPlaces}