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

// add place
const addPlace = async (values,images) =>{
    try {
        var data = new FormData();
        data.append("placeName",values.placeName);
        data.append("description",values.description);
        data.append("tips",values.tips);
        data.append("city",values.city);
        console.log(images)
        data.append("placeImgs",images);
        const response = await fetch(
            API_URL + `/api/v1/admin/place`,
            {
                method: 'POST',      
                credentials:'include',
                body: data
            }
        );
        const json = await response.json();
        console.log(json)
        return json.data;    
    } catch (error) {
        
    }
}
export {getAllPlaces, addPlace}