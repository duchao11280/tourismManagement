import React, { useState, useEffect } from 'react'
import { getAllTypeService, searchAllPlaceByCity } from '../../networking/servicesNetworking'
import { province } from '../../assets/values/province'
import '../css/addservice.css'
const AddService = () => {
    const [values, setValues] = useState({
        serviceName: "",
        typeID: null,
        description: "",
        placeID: null,
        address: "",
        hotline: "",
        latitude: null,
        longitude: null
    })
    const [types, setTypes] = useState([])
    const [currProvince, setCurrProvince] = useState('')
    const [placesByCity, setPlacesByCity] = useState([])
    useEffect(() => {
        getAllTypeService()
            .then((response) => {
                setTypes(response?.data)
            })
            .catch(() => { setTypes([]) })
    }, [])
    useEffect(() => {
        searchAllPlaceByCity(currProvince)
            .then((response) => {
                setPlacesByCity(response?.data)
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
    const handleChangeProvince = (e) => {
        setCurrProvince(e.target.value)
    }
    return (
        <div className="container">
            <h2>Thêm mới dịch vụ</h2>
            <div className="add_place">
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
                        <div>
                            <label htmlFor="placeName">Địa điểm</label>
                            <br />
                            <select id="placeName" name="placeID" onChange={handleChange}>
                                {placesByCity.map((item) =>
                                    <option
                                        key={item.placeID}
                                        value={item.placeID}
                                    >{item.placeName}</option>
                                )}
                            </select>
                        </div>
                    </div>


                </div>
                <div>

                </div>
            </div>

        </div>
    )
}

export default AddService
