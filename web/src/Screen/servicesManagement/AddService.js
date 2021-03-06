import React, { useState, useEffect } from 'react'
import { getAllTypeService, searchAllPlaceByCity, addService } from '../../networking/servicesNetworking'
import { province } from '../../assets/values/province'
import { useHistory } from 'react-router-dom'
import '../css/addservice.css'
import { ToastContainer, toast } from 'react-toastify';
import Admin from '../admin'
const AddService = () => {
    const [values, setValues] = useState({
        serviceName: "",
        typeID: null,
        description: "",
        placeID: null,
        address: "",
        hotline: "",
        latitude: "",
        longitude: ""
    })
    const [typeErr, setTypeErr] = useState("")
    const [isValidate, setIsValidate] = useState(false)
    const [types, setTypes] = useState([])
    const [currProvince, setCurrProvince] = useState('')
    const [placesByCity, setPlacesByCity] = useState([])
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const history = useHistory();
    useEffect(() => {
        getAllTypeService()
            .then((response) => {
                setTypes(response?.data)
                setValues({ ...values, typeID: response?.data[0].typeID })
            })
            .catch(() => { setTypes([]) })
    }, [])
    useEffect(() => {
        searchAllPlaceByCity(currProvince)
            .then((response) => {
                setPlacesByCity(response?.data)
                setValues({
                    ...values,
                    placeID: response?.data[0].placeID
                })
            })
            .catch(() => { setPlacesByCity([]) })
    }, [currProvince])
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    useEffect(() => {
        setURLListImage(images);

    }, [images])
    const setURLListImage = (images) => {
        if (images.length < 1) return;
        const newImageURL = [];
        images.forEach(image => newImageURL.push(URL.createObjectURL(image)));
        setImageURLs(newImageURL);
    }
    const handleChangeProvince = (e) => {
        setCurrProvince(e.target.value)
    }
    const handleChangeImage = (e) => {
        setImages([...e.target.files]);
    }
    const handleAdd = () => {
        const check = checkAddService();
        if (check === true) {
            addService(values, images)
                .then((res) => { alert(res.message); handleGoback() })
                .catch((err) => { console.log(err) })
        }

    }
    const handleGoback = () => {
        history.goBack();
    }


    const checkAddService = () => {
        if (values.serviceName.length === 0) {
            setIsValidate(false);
            setTypeErr("placeName")
            toast.error(" B???n ch??a nh???p t??n d???ch v???", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            return false
        }
        else if (values.address.length === 0) {
            setIsValidate(false);
            setTypeErr("address")
            toast.error(" B???n ch??a nh???p ?????a ch???", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            return false
        }
        else if (values.latitude.length === 0) {
            setIsValidate(false);
            setTypeErr("latitude")
            toast.error(" B???n ch??a nh???p v?? ?????", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            return false
        }
        else if (values.longitude.length === 0) {
            setIsValidate(false);
            setTypeErr("longitude")
            toast.error(" B???n ch??a nh???p kinh ?????", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            return false
        }
        else if (values.description.length === 0) {
            setIsValidate(false);
            setTypeErr("description")
            toast.error(" B???n ch??a nh???p m?? t???", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            return false
        }

        else if (images.length === 0) {
            setIsValidate(false);
            setTypeErr("tips")
            toast.error(" B???n ch??a th??m h??nh ???nh", {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,

            });
            return false
        }
        else {
            setIsValidate(true);
            setTypeErr("")
            return true
        }
    }
    return (
        <div className="containerWithsideBar">
            <Admin />
            <div className="container-manager">
                <h2>Th??m m???i d???ch v???</h2>
                <ToastContainer />
                <div className="add_service">
                    <div className="box_add_service">
                        <div className="input_text">
                            <label htmlFor="serviceName">T??n d???ch v???(*)</label>
                            <input
                                style={{ padding: "10px" }}
                                id="serviceName"
                                type="text"
                                name="serviceName"
                                value={values.serviceName}
                                placeholder="Nh???p t??n d???ch v???"
                                autoFocus
                                onChange={handleChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="typeService">Lo???i d???ch v???(*)</label>
                            <br />
                            <select id="typeService" name="typeID" onChange={handleChange}>
                                {types.map((item) =>
                                    <option
                                        key={item.typeID}
                                        value={item.typeID}
                                    >{item.typeService}</option>
                                )}
                            </select>
                        </div>
                        <div className="province_place">
                            <div>
                                <label htmlFor="province">T???nh th??nh(*)</label>
                                <br />
                                <select id="province" name="city" onChange={handleChangeProvince}>
                                    {province.map((item) =>
                                        <option
                                            key={item.id}
                                            value={item.provinceName}
                                        >{item.provinceName}</option>
                                    )}
                                </select>
                            </div>
                            <div className="as_mgl20">
                                <label htmlFor="as_placeName">?????a ??i???m</label>
                                <br />
                                <select id="as_placeName" name="placeID" onChange={handleChange} style={placesByCity.length === 0 ? { width: 200 } : {}}>
                                    {placesByCity.map((item) =>
                                        <option
                                            key={item.placeID}
                                            value={item.placeID}
                                        >{item.placeName}</option>
                                    )}
                                </select>
                            </div>
                        </div>
                        <div className="input_text">
                            <label htmlFor="address">?????a ch???(*)</label>
                            <input
                                style={{ padding: "10px" }}
                                id="address"
                                type="text"
                                name="address"
                                value={values.address}
                                placeholder="Nh???p ?????a ch???"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input_text">
                            <label htmlFor="latitude">V?? ?????(*)</label>
                            <input
                                style={{ padding: "10px" }}
                                id="latitude"
                                type="text"
                                name="latitude"
                                value={values.latitude}
                                placeholder="Nh???p v?? ?????..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input_text">
                            <label htmlFor="longitude">Kinh ?????(*)</label>
                            <input
                                style={{ padding: "10px" }}
                                id="longitude"
                                type="text"
                                name="longitude"
                                value={values.longitude}
                                placeholder="Nh???p kinh ?????..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className="input_text">
                            <label htmlFor="description">M?? t???</label>

                            <textarea
                                style={{ padding: "10px" }}
                                id="description"
                                name="description"
                                aria-multiline="true"
                                rows="5"
                                onChange={handleChange} />
                        </div>
                        <div className="input_text">
                            <label htmlFor="hotline">Li??n l???c:</label>
                            <input
                                style={{ padding: "10px" }}
                                id="hotline"
                                type="text"
                                name="hotline"
                                value={values.hotline}
                                placeholder="Nh???p s??? ??i???n tho???i..."
                                onChange={handleChange}
                            />
                        </div>
                        <div className="box_btn">
                            <button onClick={() => handleAdd()} className="btn_add_service">Th??m m???i</button>
                            <button className="btn_back" onClick={() => handleGoback()} >Quay l???i</button>
                        </div>
                    </div>

                    <div className="box_add_image_service">
                        <div>
                            <input type="file" name="images" multiple accept="image/*" onChange={handleChangeImage} />
                            <br />
                            {imageURLs.map((imageURL, i) => {
                                return (
                                    <div className="box_image">
                                        <img key={i} src={imageURL} alt="" className="image" />
                                        <br />
                                    </div>
                                )
                            }
                            )}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default AddService
