import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { province } from '../assets/values/province'
import { addPlaceToDetailTrip, addServiceToDetailTrip } from '../networking/tripNetworking'
const ModalAddDetailTrip = (props) => {
    let showModal = props.isShow
    let day = props.day
    let tripID = props.tripID;
    let listPlace = props.listPlace
    let listService = props.listService
    let isAddPlace = props.isAddPlace;
    const [values, setValues] = useState({ placeID: listPlace[0]?.placeID, serviceID: listService[0]?.serviceID, note: "", timeClock: `0${new Date().getHours()}`.slice(-2) + ":" + `0${new Date().getMinutes()}`.slice(-2) })
    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };
    useEffect(() => {
        setValues({
            placeID: listPlace[0].placeID,
            serviceID: listService[0]?.serviceID,
            note: "",
            timeClock: `0${new Date().getHours()}`.slice(-2) + ":" + `0${new Date().getMinutes()}`.slice(-2)
        })
    }, [showModal])
    const onSubmit = () => {
        if (isAddPlace) {
            addPlaceToDetailTrip(tripID, day, values.placeID, values.note, values.timeClock)
                .then((response) => { alert(response?.message) })
                .catch(() => { alert("Hệ thống bị lỗi, vui lòng thử lại.") })
                .finally(() => { props.handleCloseModal() })
        } else {
            addServiceToDetailTrip(tripID, day, values.serviceID, values.note, values.timeClock)
                .then((response) => { alert(response?.message) })
                .catch(() => { alert("Hệ thống bị lỗi, vui lòng thử lại.") })
                .finally(() => { props.handleCloseModal() })
        }
    }
    return (
        <Modal
            show={showModal}
            onHide={props.handleCloseModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Thêm địa điểm cho lịch trình</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className=" m-3 " >
                    {
                        isAddPlace ?
                            <div>
                                <label>Địa điểm</label>
                                <br />
                                <select
                                    value={values.placeID}
                                    name="placeID"
                                    onChange={handleChange}

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
                                    value={values.serviceID}
                                    name="serviceID"
                                    onChange={handleChange}

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
                            onChange={handleChange}
                            name="timeClock"
                            value={values?.timeClock}
                            style={{ height: 30 }}
                        />

                    </div>
                    <div>
                        <label>Ghi chú:</label>
                        <textarea
                            className="form-control"
                            placeholder="Ghi chú"
                            onChange={handleChange}
                            name="note"
                            value={values?.note}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <Button variant="primary" onClick={() => { onSubmit() }}>Đồng ý</Button>
                    <Button variant="secondary" onClick={() => props.handleCloseModal()} style={{ marginLeft: "10px" }}>
                        Hủy bỏ
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalAddDetailTrip
