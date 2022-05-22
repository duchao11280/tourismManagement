import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { updateDetailTrip } from '../networking/tripNetworking'
const ModalUpdateDetailTrip = (props) => {
    let showModal = props.isShow
    const [tripDetailItem, setTripDetailItem] = useState(props.tripDetailItem)
    let listPlace = props.listPlace;
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetailItem({
            ...tripDetailItem,
            [name]: value,
        });
    };
    useEffect(() => {
        setTripDetailItem(props.tripDetailItem)
    }, [showModal])
    const onSubmit = () => {
        updateDetailTrip(tripDetailItem.id, parseInt(tripDetailItem.placeID), tripDetailItem.note, tripDetailItem.timeClock)
            .then((response) => { alert(response?.message) })
            .catch(() => { alert("Hệ thống bị lỗi, vui lòng thử lại.") })
            .finally(() => { props.handleCloseModal() })
    }
    return (
        <Modal
            show={showModal}
            onHide={props.handleCloseModal}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Chỉnh sửa địa điểm lịch trình</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className=" m-3 " >
                    <div>
                        <label>Địa điểm</label>
                        <br />
                        <select
                            value={tripDetailItem?.placeID}
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
                    <div>
                        <label>Giờ:</label>
                        <br />
                        <input
                            type="time"
                            onChange={handleChange}
                            name="timeClock"
                            value={tripDetailItem?.timeClock}
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
                            value={tripDetailItem?.note}
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

export default ModalUpdateDetailTrip
