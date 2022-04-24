import GLOBALS from '../global'
const API_URL = GLOBALS.API_URL;

const getAllTableByUserID = async () => {
    try {
        const response = await fetch(
            API_URL + `/api/v1/restaurant/table/byuserid`,
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
export {
    getAllTableByUserID
}