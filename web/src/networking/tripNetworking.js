import GLOBALS from '../global'
const API_URL = GLOBALS.API_URL;

const getAllTrip = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/trip`,
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

const enableTrip = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/trip/enable/${id}`, {
            method: 'PUT',
            credentials: 'include',
        });
        const json = await respone.json();
        return json;
    } catch (error) {
    }
}
const disableTrip = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/trip/disable/${id}`, {
            method: 'PUT',
            credentials: 'include',
        });
        const json = await respone.json();
        return json;
    } catch (error) {
    }
}
export {
    getAllTrip,
    enableTrip,
    disableTrip,
}