import React, { useEffect, useState } from 'react'
import '../css/editservice.css'
import Admin from '../admin'
import Scroll from '../../component/Scroll'
import { BsTrash } from 'react-icons/bs'
import { province } from '../../assets/values/province'
import { useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import {
    getServiceAndImageByServiceID,
    getAllTypeService,
    searchAllPlaceByCity,
    updateInfoService,
    uploadImageInEditService
} from '../../networking/servicesNetworking'
import {
    disableImage
} from '../../networking/adminNetworking'
const EditService = () => {
    const [imgs, setImgs] = useState([])
    const [types, setTypes] = useState([])
    const [placesByCity, setPlacesByCity] = useState([])
    const [currImg, setCurrImg] = useState({ id: null, imgURL: "" })
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
    const [showModal, setShowModal] = useState(false);
    const [imagesAdd, setImagesAdd] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [currProvince, setCurrProvince] = useState('')
    const [refresh, setRefresh] = useState(true)
    let { id } = useParams()
    const history = useHistory();
    useEffect(() => {

        getServiceAndImageByServiceID(id)
            .then((response) => {
                setValues({
                    serviceName: response.data.serviceName,
                    typeID: response.data.typeID,
                    description: response.data.description,
                    placeID: response.data.placeID,
                    address: response.data.address,
                    hotline: response.data.hotline,
                    latitude: response.data.latitude,
                    longitude: response.data.longitude
                });
                setCurrProvince(response.data.city)
                setImgs(response.data.images);
                setCurrImg(response.data.images[0])
                getAllTypeService()
                    .then((resType) => {
                        setTypes(resType?.data)
                    })
                    .catch(() => { setTypes([]) })
            })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }, [id, refresh])
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
    useEffect(() => {
        setURLListImage(imagesAdd);

    }, [imagesAdd])
    const setURLListImage = (images) => {
        if (images.length < 1) return;
        const newImageURL = [];
        images.forEach(image => newImageURL.push(URL.createObjectURL(image)));
        setImageURLs(newImageURL);
    }

    const handleGoback = () => {
        history.goBack();
    }

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
    const handleClickImage = (imgObj) => {
        setCurrImg({ id: imgObj.id, imgURL: imgObj.imgURL });
    }
    const handleDeleteImage = (id) => {
        disableImage(id)
            .then((response) => { alert(response.message); setRefresh(!refresh) })
            .catch(() => { alert("Err") })
    }
    const handleClose = () => {
        setImagesAdd([]);
        setShowModal(false);
    }
    const handleShow = () => setShowModal(true);
    const handleChangeImage = (e) => {
        setImagesAdd([...e.target.files]);
        if (e.target.files.length !== 0) {
            handleShow()
        }
    }
    const handleUploadImage = () => {
        uploadImageInEditService(id, imagesAdd)
            .then((response) => {
                console.log(response)
                alert(response?.message);
                setRefresh(!refresh)
                setShowModal(false)
            })
            .catch((err) => {
                alert(err)
            })
    }
    const handleOnEdit = () => {
        updateInfoService(id, values)
            .then((response) => { if (response !== undefined) { alert(response.message); setRefresh(!refresh) } })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau") })
    }
    return (
        <div className="containerWithsideBar">
            <Admin />
            <div className="container-edit-service">
                <h2>Chỉnh sửa dịch vụ</h2>
                <div className="edit_service">

                    <div className="box_edit_service">
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
                            <select id="typeService" name="typeID" value={values.typeID} onChange={handleChange}>
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
                                <select id="province" name="city" value={currProvince} onChange={handleChangeProvince}>
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
                                <select id="as_placeName" name="placeID" value={values.placeID} onChange={handleChange} style={placesByCity.length === 0 ? { width: 200 } : {}}>
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
                            <textarea
                                id="address"
                                name="address"
                                aria-multiline="true"
                                value={values.address}
                                placeholder="Nhập địa chỉ"
                                rows="2"
                                onChange={handleChange} />
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
                            <label htmlFor="description">Mô tả:</label>

                            <textarea
                                id="description"
                                value={values.description}
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
                            <button onClick={() => handleOnEdit()} className="btn_edit_service">Chỉnh sửa</button>
                            <button className="btn_back" onClick={() => handleGoback()} >Quay lại</button>
                        </div>
                    </div>

                    <div className="section_image_editservice">
                        <div className="header_add_image">
                            <h3>Ảnh</h3>
                            <label htmlFor="input_image_service" className="button_add_image">
                                <AiOutlinePlus />
                                Thêm ảnh
                                <input id="input_image_service" type="file" name="images" style={{ display: "none" }} multiple accept="image/*" onChange={handleChangeImage} />

                            </label>
                        </div>

                        {imgs.length === 0 ?

                            <div>

                                <h1>Chưa có hình ảnh</h1>
                            </div>
                            :
                            <div className="box_edit_image_service">
                                <div className="expanded_image_service">
                                    <span className="btn_delete_img" onClick={() => { handleDeleteImage(currImg?.id) }}><BsTrash /></span>
                                    <img className="image" src={currImg?.imgURL} alt="" />
                                </div>
                                <div className="list_image">
                                    <Scroll>
                                        {imgs.map((item, i) => {
                                            return (
                                                <img key={i} src={item.imgURL} alt={item.id} onClick={() => { handleClickImage(item) }} />
                                            )
                                        })}
                                    </Scroll>
                                </div>
                            </div>}
                        <Modal
                            show={showModal}
                            onHide={handleClose}
                            backdrop="static"
                            keyboard={false}
                        >
                            <Modal.Header closeButton>
                                <Modal.Title>Đồng ý tải ảnh này lên?</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div className="box_image_inmodal">
                                    {imageURLs.map((imageURL, i) => {
                                        return (

                                            <img key={i} src={imageURL} alt="" className="image_inmodal" />

                                        )
                                    }
                                    )}
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={handleClose}>
                                    Hủy bỏ
                                </Button>
                                <Button variant="primary" onClick={handleUploadImage}>Đồng ý</Button>
                            </Modal.Footer>
                        </Modal>
                    </div>

                </div>

            </div>
        </div>


    )
}

export default EditService
