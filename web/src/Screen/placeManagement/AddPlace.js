import React, { useState, useEffect } from 'react'
import '../css/addplace.css'
import { province } from '../../assets/values/province'
import { addPlace } from '../../networking/adminNetworking'
import Admin from '../admin'
import { ToastContainer, toast } from 'react-toastify';
import { useHistory } from 'react-router-dom'
const AddPlace = () => {
    const [images, setImages] = useState([])
    const [typeErr, setTypeErr] = useState("")
    const [isValidate, setIsValidate] = useState(false)
    const [imageURLs, setImageURLs] = useState([])
    const [values, setValues] = useState({
        placeName: "",
        city: province[0].provinceName,
        description: "",
        tips: "",
        address: "",
        latitude: "",
        longitude: ""

    })
    const history = useHistory();

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

    const checkAddPlace = () => {
        if (values.placeName.length === 0) {
            setIsValidate(false);
            setTypeErr("placeName")
            toast.error(" Bạn chưa nhập tên địa điểm", {
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
            toast.error(" Bạn chưa nhập địa chỉ", {
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
            toast.error(" Bạn chưa nhập vĩ độ", {
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
            toast.error(" Bạn chưa nhập kinh độ", {
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
            toast.error(" Bạn chưa nhập mô tả", {
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
        else if (values.tips.length === 0) {
            setIsValidate(false);
            setTypeErr("tips")
            toast.error(" Bạn chưa nhập gợi ý", {
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
            toast.error(" Bạn chưa thêm hình ảnh", {
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
    const handleGoback = () => {
        history.goBack();
    }

    const handleAdd = () => {
        const check = checkAddPlace();

        if (check === true) {
            addPlace(values, images).then((res) => { alert(res.message); history.goBack(); }).catch((err) => { console.log(err) })
        }
    }

    const handleChangeImage = (e) => {
        setImages([...e.target.files]);
    }
    return (
        <div className="containerWithsideBar">
            <div><Admin /></div>
            <div className="container-manager">
                <ToastContainer />
                <h2>Thêm mới địa điểm</h2>
                <div className="container_box">
                    <div className="input_text">
                        <label htmlFor="placeName">Tên địa điểm(*)</label>

                        <input
                            style={{ padding: "10px" }}
                            id="placeName"
                            type="text"
                            name="placeName"
                            value={values.placeName}
                            placeholder="Nhập tên địa điểm"
                            autoFocus
                            onChange={handleChange} />
                    </div>
                    <div>
                        <label htmlFor="province">Tỉnh thành(*)</label>
                        <br />
                        <select id="province" name="city" onChange={handleChange}>
                            {province.map((item) => <option
                                key={item.id}
                                value={item.provinceName}
                            >{item.provinceName}</option>
                            )}
                        </select>
                    </div>
                    <div className="input_text">
                        <label htmlFor="address">Địa chỉ(*)</label>
                        <input
                            style={{ padding: "10px" }}
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
                            style={{ padding: "10px" }}
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
                            style={{ padding: "10px" }}
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
                            style={{ padding: "10px" }}
                            id="description"
                            name="description"
                            aria-multiline="true"
                            rows="5"
                            onChange={handleChange} />
                    </div>
                    <div className="input_text">
                        <label htmlFor="tips">Gợi ý</label>
                        <textarea
                            style={{ padding: "10px" }}
                            id="tips"
                            name="tips"
                            aria-multiline="true"
                            rows="5"
                            onChange={handleChange} />
                    </div>
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
                    <div className="box_btn">
                        <button onClick={() => handleAdd()} className="btn_add_place">Thêm mới</button>
                        <button className="btn_back" onClick={() => handleGoback()} >Quay lại</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddPlace
