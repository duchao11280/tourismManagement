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

const addTrip = async (info, detailTrip) => {
    try {
        const respone = await fetch(
            API_URL + `/api/v1/admin/trip/addtrip`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tripName: info.tripName,
                city: info.city,
                tripDetail: detailTrip,
            })
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}

const getTripDetailByTripID = async (id) => {
    try {
        const respone = await fetch(
            API_URL + `/api/v1/admin/trip/${id}`, {
            method: 'GET',
            credentials: 'include',
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}
// update basic info trip
const updateBasicInfoTrip = async (id, tripName, city) => {
    try {
        const respone = await fetch(
            API_URL + `/api/v1/admin/trip/updatebasicinfo/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                tripName: tripName,
                city: city,
            })
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}
// update detail trip
const updateDetailTrip = async (id, placeID, note, timeClock) => {
    try {
        const respone = await fetch(
            API_URL + `/api/v1/admin/trip/updatedetailtrip/${id}`, {
            method: 'PUT',
            credentials: 'include',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                placeID: placeID,
                note: note,
                timeClock: timeClock,
            })
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}
// delete detail trip by id
const deleteDetailTripItem = async (id) => {
    try {
        const respone = await fetch(
            API_URL + `/api/v1/admin/trip/deletedetailtripitem/${id}`, {
            method: 'DELETE',
            credentials: 'include',

        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}
const addPlaceToDetailTrip = async (id, day, placeID, note, timeClock) => {
    try {
        const respone = await fetch(
            API_URL + `/api/v1/admin/detailtrip/addnew/${id}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                day: day,
                placeID: parseInt(placeID),
                note: note,
                timeClock: timeClock,
            })
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
    addTrip,
    getTripDetailByTripID,
    updateBasicInfoTrip,
    updateDetailTrip,
    deleteDetailTripItem,
    addPlaceToDetailTrip,
}