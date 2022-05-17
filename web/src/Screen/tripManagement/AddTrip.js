import React, { useState, useEffect } from 'react'
import { } from '../../networking/tripNetworking'
import { province } from '../../assets/values/province'
import { useHistory } from 'react-router-dom'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import ContextAwareToggle from '../../component/ContextAwareToggle'
import { BsTrash } from 'react-icons/bs'
import '../css/addtrip.css'
import { getAllPlaces } from '../../networking/adminNetworking'
import Admin from '../admin'
const AddTrip = () => {
    const history = useHistory();
    const [listPlace, setListPlace] = useState([])
    const [values, setValues] = useState({
        tripName: "",
        city: "",
    })
    const [tripDetail, setTripDetail] = useState([
        {
            day: 2,
            detail: [{
                id: 1,
                placeID: null,
                timeClock: "",
            }],
        },
        {
            day: 1,
            detail: [{
                id: 1,
                placeID: null,
                timeClock: "",
            }],
        }
    ])
    let uId = new Date().getTime();
    let hour = new Date().getHours() + ":" + new Date().getMinutes();
    useEffect(() => {
        getAllPlaces()
            .then((response) => { setListPlace(response); })
            .catch(() => { setListPlace([]) })
    }, [])
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
     * @param {*} type type = 0 is PlaceID, type = 1 is timeClock
     */
    const handleChangeDetailTrip = (dayOfTrip, detailID, event, type) => {
        let copiedTripDetail = [...tripDetail];
        copiedTripDetail.forEach(tripDetail => {
            if (tripDetail.day === dayOfTrip) {
                tripDetail.detail.forEach(detailItem => {
                    if (detailItem.id === detailID) {
                        detailItem[event.target.name] = type == 0 ? parseInt(event.target.value) : event.target.value
                    }
                })
            }
        })

        setTripDetail(copiedTripDetail)
    }

    let tripDetailSorted = tripDetail.sort((a, b) => { return a.day - b.day })
    const addDetailTrip = () => {

        setTripDetail([...tripDetail, { day: tripDetailSorted[tripDetailSorted.length - 1].day + 1, detail: [] }])
    }
    const addPlaceToDetailTrip = (day) => {
        let copiedTripDetail = [...tripDetail];
        copiedTripDetail.forEach(tripDetail => {
            if (tripDetail.day === day) {
                uId++
                tripDetail.detail.push({ id: uId, placeID: listPlace[0].placeID, timeClock: hour })
            }
        })
        setTripDetail(copiedTripDetail)
    }
    const handleGoback = () => {
        history.goBack();
    }
    const RenderListDay = () => (
        <div>
            {
                tripDetail.map((tripDetailItem, i) => {
                    return (
                        <div style={{ backgroundColor: "azure", border: "1px solid", marginBottom: "5px" }} key={i}>
                            <div style={{ backgroundColor: "gray" }}>
                                <div style={{ display: "flex", flex: 1, justifyContent: "space-between" }}>
                                    Ngày {tripDetailItem.day}
                                    <div>

                                        <button className="btn" onClick={() => { }} style={{ backgroundColor: '#f64645' }}><BsTrash /></button>
                                    </div>
                                </div>
                            </div>
                            <div key={i}>
                                <div>
                                    {tripDetailItem.detail.map((detailPerItem, index) => (
                                        <div key={detailPerItem.id} style={{ display: 'flex', justifyContent: 'space-around', border: '1px solid', margin: "15px", padding: "10px" }}>
                                            <div>
                                                <label>Địa điểm</label>
                                                <br />
                                                <select
                                                    value={detailPerItem.placeID}
                                                    name="placeID"
                                                    onChange={(e) => { handleChangeDetailTrip(tripDetailItem.day, detailPerItem.id, e, 0) }}
                                                    style={listPlace.length === 0 ? { width: 200, padding: "5px" } : { height: 30 }}>
                                                    {listPlace.map((place) =>
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
                                                    name="timeClock"
                                                    value={detailPerItem.timeClock}
                                                    style={{ height: 30 }}
                                                    onChange={(e) => { handleChangeDetailTrip(tripDetailItem.day, detailPerItem.id, e, 1) }}
                                                />

                                            </div>
                                        </div>
                                    ))}
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <Button variant="primary" onClick={() => { addPlaceToDetailTrip(tripDetailItem.day) }}>Thêm địa điểm</Button>

                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
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
                        <div>
                            <RenderListDay />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Button variant="primary" onClick={() => { addDetailTrip() }}>Thêm ngày</Button>

                    </div>
                    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button variant="primary" onClick={() => { console.log(tripDetail) }}>Đồng ý</Button>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddTrip
