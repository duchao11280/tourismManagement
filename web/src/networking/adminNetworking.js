import GLOBALS from '../global'
const API_URL = GLOBALS.API_URL;

const getAllPlaces = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/places`,
            {
                method: 'GET',
                credentials: 'include'
            }
        );
        const json = await response.json();
        return json.data;
    } catch (error) {
        console.log(error)
    }
};
// get place and image by place id
const getPlaceAndImageByPlaceID = async (id) => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/place/${id}`,
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
// add place
const addPlace = async (values, images) => {
    try {
        var data = new FormData();
        data.append("placeName", values.placeName);
        data.append("description", values.description);
        data.append("tips", values.tips);
        data.append("city", values.city);
        data.append("address", values.address);
        data.append("latitude", values.latitude);
        data.append("longitude", values.longitude);
        for (let i = 0; i < images.length; i++) {
            data.append("placeImgs", images[i]);
        }
        const response = await fetch(
            API_URL + `/api/v1/admin/place`,
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
//  Cập nhật thông tin địa điểm du lịch
const updateInfoPlace = async (id, params) => {
    try {
        if (params === undefined) return;
        const respone = await fetch(API_URL + `/api/v1/admin/place/update/${id}`, {
            method: 'PUT',
            credentials: "include",
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                placeName: params.placeName,
                description: params.description,
                tips: params.tips,
                city: params.city,
                address: params.address,
                latitude: params.latitude,
                longitude: params.longitude
            })
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}
const deletePlace = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/place/delete/${id}`, {
            method: 'PUT',
            credentials: 'include',
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}
const enablePlace = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/place/enable/${id}`, {
            method: 'PUT',
            credentials: 'include',
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}
// disable image
const disableImage = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/place/image/delete/${id}`, {
            method: 'PUT',
            credentials: 'include'
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }
}
// upload image place in edit
const uploadImageInEdit = async (id, images) => {
    try {
        var data = new FormData();
        for (let i = 0; i < images.length; i++) {
            data.append("files", images[i]);
        }
        const response = await fetch(
            API_URL + `/api/v1/admin/place/image/upload/${id}`,
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
// user management
const getAllUsers = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/admin/users`,
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

//  vô hiệu hóa người dùng
const disableUser = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/disableuser/${id}`, {
            method: 'PUT',
            credentials: 'include'
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }

}
// kích hoạt người dung
const enableUser = async (id) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/admin/enableuser/${id}`, {
            method: 'PUT',
            credentials: 'include'
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }

}
export {
    getAllPlaces,
    addPlace,
    deletePlace,
    enablePlace,
    getPlaceAndImageByPlaceID,
    disableImage,
    updateInfoPlace,
    uploadImageInEdit,
    getAllUsers,
    disableUser,
    enableUser,
}