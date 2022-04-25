import GLOBALS from '../global'
const API_URL = GLOBALS.API_URL;

const getAllServices = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/services`,
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
const getServiceAndImageByServiceID = async (id) => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/service/${id}`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {
        console.log(error)
    }
};
const enableService = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/service/enable/${id}`, {
            method: 'PUT',
            credentials: 'include',
        });
        const json = await respone.json();
        return json;
    } catch (error) {
    }
}
const disableService = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/service/disable/${id}`, {
            method: 'PUT',
            credentials: 'include',
        });
        const json = await respone.json();
        return json;
    } catch (error) {
    }
}
const getAllTypeService = async () =>{
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/typeservice`,
            {
                method: 'GET',
                credentials: "include"
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {

    }
}
const searchAllPlaceByCity = async (city) =>{
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/places/bycity`,
            {
                method: 'POST',
                credentials: "include",
                headers: {
                    "Accept": 'application/json',
                    'Content-Type': 'application/json',
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
}
export {
    getAllServices,
    getServiceAndImageByServiceID,
    enableService,
    disableService,
    getAllTypeService,
    searchAllPlaceByCity,
}