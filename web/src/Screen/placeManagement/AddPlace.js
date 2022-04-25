import React, { useState, useEffect } from 'react'
import '../css/addplace.css'
import { province } from '../../assets/values/province'
import {addPlace} from '../../networking/adminNetworking'
const AddPlace = () => {
    const [images, setImages] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [values, setValues] = useState({
        placeName:"",
        city:province[0].provinceName,
        description:"",
        tips:"",
        address:"",
        latitude: "",
        longitude: ""
    })
    
    useEffect(() => {
        setURLListImage(images);

    }, [images])
    const setURLListImage = (images) => {
        if (images.length < 1) return;
        const newImageURL = [];
        images.forEach(image => newImageURL.push(URL.createObjectURL(image)));
        setImageURLs(newImageURL);
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
          ...values,
          [name]: value,
        });
    };

    const handleAdd =()=>{
        addPlace(values,images).then((res)=>{alert(res.message)}).catch((err)=>{console.log(err)})
    }

    const handleChangeImage = (e) => {
        setImages([...e.target.files]);
    }
    return (
        <div className="container">

            <h2>Thêm mới địa điểm</h2>
            <div className="container_box">
                <div className="input_text">
                    <label htmlFor="placeName">Tên địa điểm(*)</label>
                    
                    <input 
                        id="placeName"
                        type="text" 
                        name="placeName" 
                        value={values.placeName}
                        placeholder="Nhập tên địa điểm" 
                        autoFocus 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="province">Tỉnh thành(*)</label>
                    <br />
                    <select id="province" name="city" onChange={handleChange}>
                        {province.map((item) =>
                            <option 
                                key={item.id} 
                                value={item.provinceName} 
                            >{item.provinceName}</option>
                        )}
                    </select>
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
                        onChange={handleChange}
                    />
                </div>
                <div className="input_text">
                    <label htmlFor="tips">Gợi ý</label>
                    <textarea 
                        id="tips" 
                        name="tips" 
                        aria-multiline="true" 
                        rows="5" 
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <input type="file" name="images" multiple accept="image/*" onChange={handleChangeImage}  />
                    <br/>
                    {imageURLs.map((imageURL, i) => {return (
                        <div className="box_image">
                            <img key={i} src={imageURL} alt="" className="image"/>
                            <br/>
                        </div>
                    )}
                    )}
                </div>
                <div className="box_btn">
                    <button onClick={()=>handleAdd()} className="btn_add_place">Thêm mới</button>
                    <button className="btn_back">Quay lại</button>
                </div>
            </div>
        </div>
    )
}

export default AddPlace
