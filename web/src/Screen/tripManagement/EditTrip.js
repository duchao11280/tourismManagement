import React, { useState, useEffect } from 'react'
import { } from '../../networking/tripNetworking'
import { province } from '../../assets/values/province'
import { useHistory, useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import { BiPencil } from "react-icons/bi";
import { BsTrash } from 'react-icons/bs'
import '../css/edittrip.css'
import { getAllPlacesEnable } from '../../networking/adminNetworking'
import { getTripDetailByTripID } from '../../networking/tripNetworking'
import Admin from '../admin'
import ModalUpdateInfoTrip from '../../component/ModalUpdateInfoTrip';
import ModalUpdateDetailTrip from '../../component/ModalUpdateDetailTrip';
import ModalAlertDeleteDetailTrip from '../../component/ModalAlertDeleteDetailTrip'
import ModalAddDetailTrip from '../../component/ModalAddDetailTrip'
const EditTrip = () => {
    let { id } = useParams()
    const history = useHistory();
    const [refresh, setRefresh] = useState(true);
    const [tripDetail, setTripDetail] = useState({});
    const [listPlace, setListPlace] = useState([]);
    const [isLoading, setLoading] = useState(true)
    const [showModalUpdateBasicInfo, setShowModalUpdateBasicInfo] = useState(false)
    const [showModalUpdateDetailTripItem, setShowModalUpdateDetailTripItem] = useState(false)
    const [currItemUpdate, setCurrItemUpdate] = useState({})
    const [showModalAlertDelete, setShowModalAlertDelete] = useState(false)
    const [currItemDelete, setCurrItemDelete] = useState({})
    const [showModalAddDetailTrip, setShowModalAddDetailTrip] = useState(false)
    const [dayAddPlaceDetail, setDayAddPlaceDetail] = useState(null)
    useEffect(() => {
        getAllPlacesEnable()
            .then((response) => { setListPlace(response); })
            .catch(() => { setListPlace([]) })
    }, [])
    useEffect(() => {
        getTripDetailByTripID(id)
            .then((response) => { setTripDetail(response.data); })
            .catch((error) => { setTripDetail({}) })
            .finally(() => { setLoading(false) })
    }, [refresh])
    // change info (tripName, city )of trip
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetail({
            ...tripDetail,
            [name]: value,
        });
    }
    //Modal update basic info
    const onUpdateBasicInfo = () => {
        setShowModalUpdateBasicInfo(true);
    }
    const handleCloseModalUpdateBasicTrip = () => {
        setRefresh(!refresh);
        setShowModalUpdateBasicInfo(false);
    }
    // Modal update Detail trip
    const onUpdateDetailTripItem = (detailPerItem) => {
        setCurrItemUpdate(detailPerItem)
        setShowModalUpdateDetailTripItem(true);
    }
    const handleCloseModalUpdateDetailTripItem = () => {
        setRefresh(!refresh);
        setShowModalUpdateDetailTripItem(false);
    }

    //Modal Alert Delete Item detail trip
    const onDeleteDetailTripItem = (detailPerItem) => {
        setCurrItemDelete(detailPerItem)
        setShowModalAlertDelete(true);
    }

    const handleCloseModalAlertDeleleDetailTrip = () => {
        setRefresh(!refresh);
        setShowModalAlertDelete(false);
    }
    // Modal add place for detail trip 
    const onAddPlaceDetailTripItem = (day) => {
        setDayAddPlaceDetail(day)
        setShowModalAddDetailTrip(true);
    }
    const handleCloseModalAddDetailTrip = () => {
        setRefresh(!refresh);
        setShowModalAddDetailTrip(false);
    }
    const handleGoback = () => {
        history.goBack();
    }
    return (
        <div className="containerWithsideBar">
            <Admin />
            {isLoading ? <div className="container-manager">Đang lấy dữ liệu...</div> :
                <div className="container-manager">
                    <h2>Chỉnh sửa lịch trình</h2>
                    <hr />
                    <div className="box_add_trip">
                        <div style={{ marginInline: "15px" }}>
                            <div className="d-flex flex-row align-content-center justify-content-between">
                                <div>Thông tin cơ bản:</div>
                                <button
                                    className="container-btn-edit-item-place-tripdetail-edittrip"
                                    title="Chỉnh sửa thông tin cơ bản"
                                    onClick={() => { onUpdateBasicInfo() }}
                                >
                                    <div className="text-btn-edit-item-place-tripdetail-edittrip"><BiPencil /></div>
                                </button>
                            </div>
                            <div className="card-info-trip-edittrip">
                                <div className="input_text" >
                                    <label htmlFor="tripName">Tên lịch trình(*)</label>
                                    <input
                                        id="tripName"
                                        disabled
                                        type="text"
                                        name="tripName"
                                        value={tripDetail.tripName}
                                        placeholder="Nhập tên lịch trình"
                                        autoFocus
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <label htmlFor="province">Tỉnh thành(*)</label>
                                    <br />
                                    <select disabled value={tripDetail.city} id="province" name="city" onChange={handleChange}>
                                        {province.map((item) =>
                                            <option
                                                key={item.id}
                                                value={item.provinceName}
                                            >{item.provinceName}</option>
                                        )}
                                    </select>
                                </div>
                            </div>
                            <div>Thông tin chi tiết về lịch trình: </div>
                            <div>
                                <div>
                                    {
                                        tripDetail?.detail.map((tripDetailItem, i) => {
                                            return (
                                                <div style={{ backgroundColor: "azure", border: "1px solid", marginBottom: "5px" }} key={i}>
                                                    <div style={{ backgroundColor: "gray" }}>
                                                        <div style={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
                                                            Ngày {tripDetailItem.day}
                                                            {tripDetailItem.day === tripDetail?.detail[tripDetail?.detail.length - 1].day && tripDetailItem.day !== 1 ?
                                                                <div>
                                                                    <button className="btn" onClick={() => { /* handleDeleteLastTripDetail() */ }} style={{ backgroundColor: '#f64645' }}><BsTrash /></button>
                                                                </div>
                                                                : <div></div>
                                                            }

                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div>
                                                            {tripDetailItem.detail.map((detailPerItem, index) => (
                                                                <div className="d-flex flex-row" key={index}>
                                                                    <div className="d-flex m-3 justify-content-around container-item-place-trip-detail-addtrip" key={detailPerItem.id} style={{}}>
                                                                        <div>
                                                                            <label>Địa điểm</label>
                                                                            <br />
                                                                            <select
                                                                                value={detailPerItem.placeID}
                                                                                name="placeID"
                                                                                disabled

                                                                                style={listPlace.length === 0 ? { width: 200, padding: "5px" } : { height: 30 }}>
                                                                                {listPlace?.map((place) =>
                                                                                    <option
                                                                                        key={place.placeID}
                                                                                        value={place.placeID}
                                                                                    >{place.placeName}</option>
                                                                                )}
                                                                            </select>
                                                                        </div>
                                                                        <div>
                                                                            <label>Giờ:</label>
                                                                            <br />
                                                                            <input
                                                                                type="time"
                                                                                disabled
                                                                                name="timeClock"
                                                                                value={detailPerItem.timeClock}
                                                                                style={{ height: 30 }}
                                                                            />

                                                                        </div>
                                                                        <div>
                                                                            <textarea
                                                                                className="form-control"
                                                                                placeholder="Ghi chú"
                                                                                disabled
                                                                                name="note"
                                                                                value={detailPerItem.note}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                    <div className=" d-flex align-items-center justify-content-center ">
                                                                        <button
                                                                            className="container-btn-edit-item-place-tripdetail-edittrip"
                                                                            onClick={() => { onUpdateDetailTripItem(detailPerItem) }}
                                                                        >
                                                                            <div className="text-btn-edit-item-place-tripdetail-edittrip"><BiPencil /></div>
                                                                        </button>
                                                                        <button
                                                                            className="container-btn-remove-item-place-tripdetail-edittrip"
                                                                            onClick={() => { onDeleteDetailTripItem(detailPerItem) }}
                                                                        >
                                                                            <div className="text-btn-remove-item-place-tripdetail-edittrip">X</div>
                                                                        </button>

                                                                    </div>
                                                                </div>
                                                            ))}
                                                            <div style={{ display: 'flex', justifyContent: 'center' }}>
                                                                <Button variant="primary" onClick={() => { onAddPlaceDetailTripItem(tripDetailItem.day) }}>Thêm địa điểm</Button>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <Button variant="primary" onClick={() => { /*addDetailTrip()*/ }}>Thêm ngày</Button>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="primary" onClick={() => { }}>Đồng ý</Button>
                            <Button variant="secondary" onClick={() => { handleGoback() }}>Quay lại</Button>
                        </div>
                        <ModalUpdateInfoTrip
                            isShow={showModalUpdateBasicInfo}
                            tripDetailInfo={tripDetail}
                            handleCloseModal={handleCloseModalUpdateBasicTrip}
                        />
                        <ModalUpdateDetailTrip
                            isShow={showModalUpdateDetailTripItem}
                            tripDetailItem={currItemUpdate}
                            listPlace={listPlace}
                            handleCloseModal={handleCloseModalUpdateDetailTripItem}
                        />
                        <ModalAlertDeleteDetailTrip
                            isShow={showModalAlertDelete}
                            tripDetailItem={currItemDelete}

                            handleCloseModal={handleCloseModalAlertDeleleDetailTrip}
                        />
                        <ModalAddDetailTrip
                            isShow={showModalAddDetailTrip}
                            day={dayAddPlaceDetail}
                            listPlace={listPlace}
                            tripID={id}
                            handleCloseModal={handleCloseModalAddDetailTrip}
                        />
                    </div>
                </div>
            }

        </div>
    )
}

export default EditTrip
