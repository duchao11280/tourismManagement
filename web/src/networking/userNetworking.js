
import GLOBALS from '../global'
const API_URL = GLOBALS.API_URL;

// get data cho màn hình profile
const getProfile = async (id) => {
    try {

        const response = await fetch(
            API_URL + `/api/v1/user/${id}`,
        );
        const json = await response.json();
        return json.data;
    } catch (error) {
    }
};

// edit profile
const editProfile = async (id, params) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/user/${id}`, {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName: params.fullName,
                email: params.email,
                phonenumber: params.phonenumber
            })
        });
        const json = await respone.json();
        return json.message;
    } catch (error) {

    }

}

// change password
const changePassword = async (id, params) => {
    try {

        const respone = await fetch(API_URL + `/api/v1/user/changepassword/${id}`, {
            method: 'PUT',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                oldPassword: params.oldPassword,
                newPassword: params.newPassword,
                confirmPassword: params.confirmPassword
            })
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }

}

const login = async (userName, password) => {
    try {
        const respone = await fetch(API_URL + `/api/v1/user/login`, {
            method: 'POST',
            credentials:'include',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
                
            },
            body: JSON.stringify({
                userName: userName,
                password: password
            })
        });
        console.log(respone);
        const json = await respone.json();
        console.log(JSON.stringify(json));
        return json;
    } catch (error) {

    }
}



const signUp = async (params) => {
    try {
        const respone = await fetch(API_URL + '/api/v1/user/signup', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userName: params.userName,
                fullName: params.fullName,
                password: params.password,
                email: params.email,
                phonenumber: params.phonenumber,
                role: params.role
            })
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }

}


const sendFeedback = async (id, params) => {
    try {

        const respone = await fetch(API_URL + `/api/v1/user/sendfeedback/${id}`, {
            method: 'POST',
            headers: {
                "Accept": 'application/json',
                'Content-Type': 'application/json',

            },
            body: JSON.stringify({
                content: params.content,
                title: params.title,
                userName: params.userName
            })
        });
        const json = await respone.json();
        return json;
    } catch (error) {

    }

}


// eslint-disable-next-line import/no-anonymous-default-export
export { getProfile, editProfile, changePassword, login, signUp, sendFeedback };