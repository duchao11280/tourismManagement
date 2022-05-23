import React, { useState, useEffect } from 'react'
import { } from '../../networking/tripNetworking'
import { province } from '../../assets/values/province'
import { useHistory, useParams } from 'react-router-dom'

import Button from 'react-bootstrap/Button'
import { BiPencil } from "react-icons/bi";
import { BsTrash } from 'react-icons/bs'
import '../css/edittrip.css'
import { getAllPlacesEnable } from '../../networking/adminNetworking'
import { getTripDetailByTripID, updateBasicInfoTrip, deleteDayOfTrip } from '../../networking/tripNetworking'
import { getAllServicesEnable } from '../../networking/servicesNetworking'
import Admin from '../admin'
import ModalUpdateInfoTrip from '../../component/ModalUpdateInfoTrip';
import ModalUpdateDetailTrip from '../../component/ModalUpdateDetailTrip';
import ModalAlertDeleteDetailTrip from '../../component/ModalAlertDeleteDetailTrip'
import ModalAddDetailTrip from '../../component/ModalAddDetailTrip'
import ModalAlert from '../../component/ModalAlert'
const EditTrip = () => {
    let { id } = useParams()
    const history = useHistory();
    const [refresh, setRefresh] = useState(true);
    const [tripDetail, setTripDetail] = useState({});
    const [listPlace, setListPlace] = useState([]);
    const [listService, setListService] = useState([])
    const [isLoading, setLoading] = useState(true)
    const [showModalUpdateBasicInfo, setShowModalUpdateBasicInfo] = useState(false)
    const [showModalUpdateDetailTripItem, setShowModalUpdateDetailTripItem] = useState(false)
    const [currItemUpdate, setCurrItemUpdate] = useState({})
    const [showModalAlertDelete, setShowModalAlertDelete] = useState(false)
    const [currItemDelete, setCurrItemDelete] = useState({})
    const [showModalAddDetailTrip, setShowModalAddDetailTrip] = useState(false)
    const [isAddPlaceDetail, setIsAddPlaceDetail] = useState(false)
    const [dayAddPlaceDetail, setDayAddPlaceDetail] = useState(null)
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [dayDelete, setDayDelete] = useState(null);
    useEffect(() => {
        getAllPlacesEnable()
            .then((response) => {
                setListPlace(response);
                getAllServicesEnable()
                    .then((response) => {
                        setListService(response.data);

                    })
                    .catch(() => { setListService([]) })
            })
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
        setIsAddPlaceDetail(true)
        setShowModalAddDetailTrip(true);
    }
    const onAddServiceDetailTripItem = (day) => {
        setDayAddPlaceDetail(day)
        setIsAddPlaceDetail(false)
        setShowModalAddDetailTrip(true);
    }
    const handleCloseModalAddDetailTrip = () => {
        setRefresh(!refresh);
        setShowModalAddDetailTrip(false);
    }
    const onAcceptDeleteDayOfTrip = () => {
        deleteDayOfTrip(id, dayDelete)
            .then((response) => { alert(response?.message || "Xảy ra vấn đề, vui lòng thử lại sau!") })
            .catch(() => { alert("Hệ thống bị lỗi, vui lòng thử lại.") })
            .finally(() => { setRefresh(!refresh); handleCloseModalAlert() })
    }
    const handleCloseModalAlert = () => {
        setRefresh(!refresh);
        setShowModalAlert(false);
    }

    const handleDeleteLastTripDetail = (day) => {
        setDayDelete(day)
        setShowModalAlert(true);
    }
    // Add day
    const addDay = () => {
        updateBasicInfoTrip(tripDetail.tripID, tripDetail.tripName, tripDetail.numberOfDays + 1, tripDetail.city)
            .then((response) => { alert("Thêm thành công") })
            .catch(() => { alert("Hệ thống bị lỗi, vui lòng thử lại.") })
            .finally(() => { setRefresh(!refresh) })
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
                                                        <div style={{ display: "flex", flex: 1, justifyContent: "space-between", marginLeft: "15px", color: "white", paddingTop: "5px" }}>
                                                            Ngày {tripDetailItem.day}
                                                            {tripDetailItem.day === tripDetail?.detail[tripDetail?.detail.length - 1].day && tripDetailItem.day !== 1 ?
                                                                <div>
                                                                    <button className="btn" onClick={() => { handleDeleteLastTripDetail(tripDetailItem.day) }} style={{ backgroundColor: '#f64645' }}><BsTrash /></button>
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
                                                                        {
                                                                            detailPerItem.type == 0 ?
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
                                                                                :
                                                                                <div>
                                                                                    <label>Dịch vụ:</label>
                                                                                    <br />
                                                                                    <select
                                                                                        value={detailPerItem.serviceID}
                                                                                        name="serviceID"
                                                                                        disabled

                                                                                        style={listService.length === 0 ? { width: 200, padding: "5px" } : { height: 30 }}>
                                                                                        {listService?.map((service) =>
                                                                                            <option
                                                                                                key={service.serviceID}
                                                                                                value={service.serviceID}
                                                                                            >{service.serviceName}</option>
                                                                                        )}
                                                                                    </select>
                                                                                </div>
                                                                        }
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
                                                                                defaultValue={detailPerItem.note}
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
                                                            <div style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
                                                                <button className="mx-3 p-1 border border-primary bg-success text-white" onClick={() => { onAddPlaceDetailTripItem(tripDetailItem.day) }}>Thêm địa điểm</button>
                                                                <button className="mx-3 p-1 border border-danger" onClick={() => { onAddServiceDetailTripItem(tripDetailItem.day) }}>Thêm dịch vụ</button>

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
                            <Button variant="primary" onClick={() => { addDay() }}>Thêm ngày</Button>

                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {/* <Button variant="primary" onClick={() => { }}>Đồng ý</Button> */}
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
                            listService={listService}
                            handleCloseModal={handleCloseModalUpdateDetailTripItem}
                        />
                        <ModalAlertDeleteDetailTrip
                            isShow={showModalAlertDelete}
                            tripDetailItem={currItemDelete}

                            handleCloseModal={handleCloseModalAlertDeleleDetailTrip}
                        />
                        <ModalAddDetailTrip
                            isShow={showModalAddDetailTrip}
                            isAddPlace={isAddPlaceDetail}
                            day={dayAddPlaceDetail}
                            listPlace={listPlace}
                            listService={listService}
                            tripID={id}
                            handleCloseModal={handleCloseModalAddDetailTrip}
                        />
                        <ModalAlert
                            isShow={showModalAlert}
                            content="Bạn chắc muốn xóa ngày này chứ?"
                            onAccept={onAcceptDeleteDayOfTrip}
                            handleCloseModal={handleCloseModalAlert}
                        />
                    </div>
                </div>
            }

        </div>
    )
}

export default EditTrip
