import React, { useEffect, useState } from 'react'
import '../css/editplace.css'
import Scroll from '../../component/Scroll'
import { BsTrash } from 'react-icons/bs'
import { province } from '../../assets/values/province'
import { useParams } from 'react-router-dom'
import { AiOutlinePlus } from 'react-icons/ai'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { getPlaceAndImageByPlaceID, updateInfoPlace, disableImage, uploadImageInEdit } from '../../networking/adminNetworking'
const EditPlace = () => {
    const [imgs, setImgs] = useState([])
    const [currImg, setCurrImg] = useState({ id: null, imgURL: "" })
    const [values, setValues] = useState({
        placeName: "",
        city: "",
        description: "",
        tips: ""
    })
    const [showModal, setShowModal] = useState(false);
    const [imagesAdd, setImagesAdd] = useState([])
    const [imageURLs, setImageURLs] = useState([])
    const [refresh, setRefresh] = useState(true)
    let { id } = useParams()
    useEffect(() => {
        getPlaceAndImageByPlaceID(id)
            .then((response) => {
                setValues({
                    placeName: response.data.placeName,
                    city: response.data.city,
                    description: response.data.description,
                    tips: response.data.tips
                });
                setImgs(response.data.images);
                setCurrImg(response.data.images[0])
            })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }, [id,refresh])

    useEffect(() => {
        setURLListImage(imagesAdd);

    }, [imagesAdd])
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
    const handleClickImage = (imgObj) => {
        setCurrImg({ id: imgObj.id, imgURL: imgObj.imgURL });
    }
    const handleDeleteImage = (id) => {
        disableImage(id)
            .then((response) => { alert(response.message) })
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
    const handleUploadImage = () =>{
        uploadImageInEdit(id,imagesAdd)
            .then((response)=>{
                console.log(response)
                alert(response?.message);
                setRefresh(!refresh)
            })
            .catch(()=>{
                alert("Xảy ra lỗi, vui lòng thử lại sau!")
            })
    }
    const handleOnEdit = () =>{
        updateInfoPlace(id,values)
            .then((response)=>{if(response!== undefined) alert(response.message)})
            .catch(()=>{alert("Xảy ra lỗi, vui lòng thử lại sau")})
    }
    return (
        <div className="container">
            <h2>Chỉnh sửa địa điểm</h2>
            <div className="edit_place">

                <div className="box_edit_place">
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
                        <select id="province" name="city" value={values.city} onChange={handleChange}>
                            {province.map((item) =>
                                <option
                                    key={item.id}
                                    value={item.provinceName}
                                >{item.provinceName}</option>
                            )}
                        </select>
                    </div>
                    <div className="input_text">
                        <label htmlFor="description">Mô tả</label>

                        <textarea
                            id="description"
                            name="description"
                            aria-multiline="true"
                            value={values.description}
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
                            value={values.tips}
                            rows="5"
                            onChange={handleChange}
                        />
                    </div>
                    <div className="box_btn_edit">
                        <button onClick={() => {handleOnEdit()}} className="btn_edit_place">Chỉnh sửa</button>
                        <button className="btn_back">Quay lại</button>
                    </div>
                </div>
                <div className="section_image_editplace">
                    <div className="header_add_image">
                        <h3>Ảnh</h3>
                        <label htmlFor="input_image_place" className="button_add_image">
                            <AiOutlinePlus />
                            Thêm ảnh
                            <input id="input_image_place" type="file" name="images" style={{ display: "none" }} multiple accept="image/*" onChange={handleChangeImage} />

                        </label>
                    </div>

                    {
                        imgs.length === 0 ?

                            <div>

                                <h1>Chưa có hình ảnh</h1>
                            </div>
                            :
                            <div className="box_edit_image_place">
                                <div className="expanded_image">
                                    <span className="btn_delete_img" onClick={() => { handleDeleteImage(currImg.id) }}><BsTrash /></span>
                                    <img className="image" src={currImg.imgURL} alt="" />
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
                            </div>
                    }
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
    )
}

export default EditPlace