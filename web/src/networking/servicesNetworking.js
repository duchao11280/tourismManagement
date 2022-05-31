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
const getAllServicesEnable = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/services/enable`,
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
const getAllTypeService = async () => {
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
const searchAllPlaceByCity = async (city) => {
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
// add services
const addService = async (values, images) => {
    try {
        var data = new FormData();
        data.append("serviceName", values.serviceName);
        data.append("description", values.description);
        data.append("typeID", values.typeID);
        data.append("placeID", values.placeID);
        data.append("address", values.address);
        data.append("hotline", values.hotline);
        data.append("latitude", values.latitude);
        data.append("longitude", values.longitude);
        for (let i = 0; i < images.length; i++) {
            data.append("files", images[i]);
        }
        const response = await fetch(
            API_URL + `/api/v1/admin/service`,
            {
                method: 'POST',
                credentials: 'include',
                body: data
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {

    }
}
const uploadImageInEditService = async (id, images) => {
    try {
        var data = new FormData();
        for (let i = 0; i < images.length; i++) {
            data.append("files", images[i]);
        }
        const response = await fetch(
            API_URL + `/api/v1/admin/service/image/upload/${id}`,
            {
                method: 'POST',
                credentials: 'include',
                body: data
            }
        );
        const json = await response.json();
        return json;
    } catch (error) {

    }
}
const updateInfoService = async (id, params) => {
    try {
        if (params === undefined) return;
        const respone = await fetch(API_URL + `/api/v1/admin/service/${id}`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                serviceName: params.serviceName,
                typeID: parseInt(params.typeID),
                description: params.description,
                placeID: params.placeID,
                address: params.address,
                hotline: params.hotline,
                latitude: params.latitude,
                longitude: params.longitude,
            })
        });
        const json = await respone.json();
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
    addService,
    uploadImageInEditService,
    updateInfoService,
    getAllServicesEnable,
}