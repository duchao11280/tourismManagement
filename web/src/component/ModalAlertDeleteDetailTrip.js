import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import { province } from '../assets/values/province'
import { deleteDetailTripItem } from '../networking/tripNetworking'
const ModalAlertDeleteDetailTrip = (props) => {
    let showModal = props.isShow
    const [tripDetailInfo, setTripDetailInfo] = useState(props.tripDetailItem)

    let placeName = props.placeName;
    useEffect(() => {
        setTripDetailInfo(props.tripDetailItem)

    }, [showModal])
    const onSubmit = () => {
        deleteDetailTripItem(tripDetailInfo.id)
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
                <Modal.Title>Cảnh báo</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Bạn có chắc muốn xóa Địa điểm {tripDetailInfo?.placeName} lúc {tripDetailInfo?.timeClock} tại ngày {tripDetailInfo?.day} không?

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

export default ModalAlertDeleteDetailTrip
