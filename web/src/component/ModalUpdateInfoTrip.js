import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { province } from '../assets/values/province'
import { updateBasicInfoTrip } from '../networking/tripNetworking'
const ModalUpdateInfoTrip = (props) => {
    let showModal = props.isShow
    const [tripDetailInfo, setTripDetailInfo] = useState(props.tripDetailInfo)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setTripDetailInfo({
            ...tripDetailInfo,
            [name]: value,
        });
    };
    useEffect(() => {
        setTripDetailInfo(props.tripDetailInfo)
    }, [showModal])
    const onSubmit = () => {
        updateBasicInfoTrip(tripDetailInfo.tripID, tripDetailInfo.tripName, tripDetailInfo.numberOfDays, tripDetailInfo.city)
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
                <Modal.Title>Chỉnh sửa thông tin cơ bản lịch trình</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="input_text" >
                    <label htmlFor="tripName">Tên lịch trình(*)</label>
                    <input
                        id="tripName"
                        required
                        type="text"
                        name="tripName"
                        value={tripDetailInfo.tripName}
                        placeholder="Nhập tên lịch trình"
                        autoFocus
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="province">Tỉnh thành(*)</label>
                    <br />
                    <select value={tripDetailInfo.city} id="province" name="city" onChange={handleChange}>
                        {province.map((item) =>
                            <option
                                key={item.id}
                                value={item.provinceName}
                            >{item.provinceName}</option>
                        )}
                    </select>
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

export default ModalUpdateInfoTrip
