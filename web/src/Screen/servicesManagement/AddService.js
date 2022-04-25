import React, { useState, useEffect } from 'react'
import { getAllTypeService, searchAllPlaceByCity, addService } from '../../networking/servicesNetworking'
import { province } from '../../assets/values/province'
import { useHistory } from 'react-router-dom'
import '../css/addservice.css'
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
                setValues({...values,typeID:response?.data[0].typeID})
            })
            .catch(() => { setTypes([]) })
    }, [])
    useEffect(() => {
        searchAllPlaceByCity(currProvince)
            .then((response) => {
                setPlacesByCity(response?.data)
                setValues({
                    ...values,
                    placeID:response?.data[0].placeID})
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
        addService(values,images)
            .then((res) => { alert(res.message); handleGoback()})
            .catch((err) => { console.log(err) })
    }
    const handleGoback = () => {
        history.goBack();
    }
    return (
        <div className="container">
            <h2>Thêm mới dịch vụ</h2>
            <div className="add_service">
                <div className="box_add_service">
                    <div className="input_text">
                        <label htmlFor="serviceName">Tên dịch vụ(*)</label>
                        <input
                            id="serviceName"
                            type="text"
                            name="serviceName"
                            value={values.serviceName}
                            placeholder="Nhập tên dịch vụ"
                            autoFocus
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="typeService">Loại dịch vụ(*)</label>
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
                            <label htmlFor="province">Tỉnh thành(*)</label>
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
                            <label htmlFor="as_placeName">Địa điểm</label>
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
                        <label htmlFor="address">Địa chỉ(*)</label>
                        <input
                            id="address"
                            type="text"
                            name="address"
                            value={values.address}
                            placeholder="Nhập địa chỉ"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input_text">
                        <label htmlFor="latitude">Vĩ độ(*)</label>
                        <input
                            id="latitude"
                            type="text"
                            name="latitude"
                            value={values.latitude}
                            placeholder="Nhập vĩ độ..."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input_text">
                        <label htmlFor="longitude">Kinh độ(*)</label>
                        <input
                            id="longitude"
                            type="text"
                            name="longitude"
                            value={values.longitude}
                            placeholder="Nhập kinh độ..."
                            onChange={handleChange}
                        />
                    </div>
                    <div className="input_text">
                        <label htmlFor="description">Mô tả</label>

                        <textarea
                            id="description"
                            name="description"
                            aria-multiline="true"
                            rows="5"
                            onChange={handleChange} />
                    </div>
                    <div className="input_text">
                        <label htmlFor="hotline">Liên lạc:</label>
                        <input
                            id="hotline"
                            type="text"
                            name="hotline"
                            value={values.hotline}
                            placeholder=""
                            onChange={handleChange}
                        />
                    </div>
                    <div className="box_btn">
                        <button onClick={() => handleAdd()} className="btn_add_service">Thêm mới</button>
                        <button className="btn_back" onClick={() => handleGoback()} >Quay lại</button>
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
    )
}

export default AddService
