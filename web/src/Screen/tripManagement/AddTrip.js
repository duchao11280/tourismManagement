import React, { useState, useEffect } from 'react'
import { province } from '../../assets/values/province'
import { useHistory } from 'react-router-dom'

import Button from 'react-bootstrap/Button'

import { BsTrash } from 'react-icons/bs'
import '../css/addtrip.css'
import { getAllPlacesEnable } from '../../networking/adminNetworking'
import { getAllServicesEnable } from '../../networking/servicesNetworking'
import { addTrip } from '../../networking/tripNetworking'
import Admin from '../admin'
const AddTrip = () => {
    let uId = new Date().getTime();

    const history = useHistory();
    const [listPlace, setListPlace] = useState([])
    const [listService, setListService] = useState([])
    const [values, setValues] = useState({
        tripName: "",
        city: province[0].provinceName,
    })
    const [tripDetail, setTripDetail] = useState([
        {
            day: 1,
            detail: [],
        }
    ])

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
    const handleAddTrip = () => {
        addTrip(values, tripDetail)
            .then((response) => { alert(response?.message); handleGoback() })
            .catch((error) => { console.log(error) })
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    /**
     * 
     * @param {*} dayOfTrip 
     * @param {*} detailID 
     * @param {*} event 
     * @param {*} type type = 0 is PlaceID and serviceID, type = 1 are timeClock and Note
     */
    const handleChangeDetailTrip = (dayOfTrip, detailID, event, type) => {
        let copiedTripDetail = [...tripDetail];
        copiedTripDetail.forEach(tripDetail => {
            if (tripDetail.day === dayOfTrip) {
                tripDetail.detail.forEach(detailItem => {
                    if (detailItem.id === detailID) {
                        detailItem[event.target.name] = type === 0 ? parseInt(event.target.value) : event.target.value
                    }
                })
            }
        })

        setTripDetail(copiedTripDetail)
    }
    function sortByDay(input) {
        return input.sort((a, b) => { return a.day - b.day })
    }
    const addDetailTrip = () => {

        setTripDetail([...tripDetail, { day: sortByDay(tripDetail)[tripDetail.length - 1].day + 1, detail: [] }])
    }
    const addPlaceToDetailTrip = (day) => {
        let copiedTripDetail = [...tripDetail];
        copiedTripDetail.forEach(tripDetail => {
            if (tripDetail.day === day) {
                uId++
                tripDetail.detail.push({
                    id: uId,
                    placeID: listPlace[0].placeID,
                    type: 0,
                    timeClock: `0${new Date().getHours()}`.slice(-2) + ":" + `0${new Date().getMinutes()}`.slice(-2)
                })
            }
        })
        setTripDetail(copiedTripDetail)
    }
    const addServiceToDetailTrip = (day) => {
        let copiedTripDetail = [...tripDetail];
        copiedTripDetail.forEach(tripDetail => {
            if (tripDetail.day === day) {
                uId++
                tripDetail.detail.push({
                    id: uId,
                    serviceID: listService[0].serviceID,
                    type: 1,
                    timeClock: `0${new Date().getHours()}`.slice(-2) + ":" + `0${new Date().getMinutes()}`.slice(-2)
                })
            }
        })
        setTripDetail(copiedTripDetail)
    }
    const handleDeleteLastTripDetail = () => {
        let copiedTripDetail = [...tripDetail];
        let newTripDetailAfterDelete = sortByDay(copiedTripDetail);
        newTripDetailAfterDelete.pop()
        setTripDetail(newTripDetailAfterDelete);
    }
    /**
     * Xóa phần tử bên trong detail của 1 ngày tripdetail
     * @param {*} day 
     * @param {*} id 
     */
    const handleRemoveItemPlace = (day, id) => {

        let copiedTripDetail = [...tripDetail];
        let tripDetailAfterSorted = sortByDay(copiedTripDetail);
        let arrayDetailOfDayRemove = tripDetailAfterSorted[day - 1].detail.filter(item => { return item.id !== id })
        tripDetailAfterSorted[day - 1].detail = arrayDetailOfDayRemove;
        setTripDetail(tripDetailAfterSorted)
    }
    const handleGoback = () => {
        history.goBack();
    }

    return (
        <div className="containerWithsideBar">
            <Admin />
            <div className="container-manager">
                <h2>Thêm mới lịch trình</h2>
                <hr />
                <div className="box_add_trip">
                    <div style={{ marginInline: "15px" }}>
                        <div className="input_text" >
                            <label htmlFor="tripName">Tên lịch trình(*)</label>
                            <input
                                style={{ padding: "10px" }}
                                id="tripName"
                                required
                                type="text"
                                name="tripName"
                                value={values.tripName}
                                placeholder="Nhập tên lịch trình"
                                autoFocus
                                onChange={handleChange}
                            />
                        </div>
                        <div style={{ paddingTop: "10px" }}>
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
                        <div>
                            <div style={{ paddingTop: "15px" }}>
                                {
                                    tripDetail.map((tripDetailItem, i) => {
                                        return (
                                            <div style={{ backgroundColor: "azure", border: "1px solid", marginBottom: "5px" }} key={i}>
                                                <div style={{ backgroundColor: '#d3d3d3ba' }}>
                                                    <div style={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
                                                        Ngày {tripDetailItem.day}
                                                        {tripDetailItem.day === tripDetail[tripDetail.length - 1].day && tripDetailItem.day !== 1 ?
                                                            <div>
                                                                <button className="btn" onClick={() => { handleDeleteLastTripDetail() }} style={{ backgroundColor: '#f64645' }}><BsTrash /></button>
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
                                                                    {detailPerItem.type === 0 ?
                                                                        <div>
                                                                            <label>Địa điểm</label>
                                                                            <br />
                                                                            <select
                                                                                value={detailPerItem.placeID}
                                                                                name="placeID"
                                                                                onChange={(e) => { handleChangeDetailTrip(tripDetailItem.day, detailPerItem.id, e, 0) }}
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

                                                                                onChange={(e) => { handleChangeDetailTrip(tripDetailItem.day, detailPerItem.id, e, 0) }}
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
                                                                            name="timeClock"
                                                                            value={detailPerItem.timeClock}
                                                                            style={{ height: 30 }}
                                                                            onChange={(e) => { handleChangeDetailTrip(tripDetailItem.day, detailPerItem.id, e, 1) }}
                                                                        />

                                                                    </div>
                                                                    <div>
                                                                        <textarea
                                                                            className="form-control"
                                                                            placeholder="Ghi chú"
                                                                            name="note"
                                                                            value={detailPerItem.note}
                                                                            onChange={(e) => { handleChangeDetailTrip(tripDetailItem.day, detailPerItem.id, e, 1) }}
                                                                        />
                                                                    </div>
                                                                </div>
                                                                <div className=" d-flex align-items-center justify-content-center ">

                                                                    <button
                                                                        className="container-btn-remove-item-place-tripdetail-addtrip"
                                                                        onClick={() => { handleRemoveItemPlace(tripDetailItem.day, detailPerItem.id) }}
                                                                    >
                                                                        <div className="text-btn-remove-item-place-tripdetail-addtrip">X</div>
                                                                    </button>

                                                                </div>
                                                            </div>
                                                        ))}
                                                        <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '10px', paddingBottom: '10px' }}>
                                                            <Button variant="primary" onClick={() => { addPlaceToDetailTrip(tripDetailItem.day) }}>Thêm địa điểm</Button>
                                                            <button className="mx-3 p-1 border border-danger" onClick={() => { addServiceToDetailTrip(tripDetailItem.day) }}>Thêm dịch vụ</button>
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
                        <Button variant="primary" onClick={() => { addDetailTrip() }}>Thêm ngày</Button>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', paddingBottom: '15px' }}>
                        <Button variant="primary" style={{ marginRight: '15px' }} onClick={() => { handleAddTrip() }}>Đồng ý</Button>
                        <Button variant="secondary" onClick={() => { handleGoback() }}>Quay lại</Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTrip
