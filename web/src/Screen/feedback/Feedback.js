import React, { useState, useEffect } from 'react'
import Admin from '../admin'
import SearchBox from '../../component/SearchBox'
import Accordion from 'react-bootstrap/Accordion'
import Card from 'react-bootstrap/Card'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import ContextAwareToggle from '../../component/ContextAwareToggle'
import { BsTrash } from 'react-icons/bs'
import { BiPencil } from "react-icons/bi";
import { AiOutlinePlus } from 'react-icons/ai'
import Form from 'react-bootstrap/Form'
import Scroll from '../../component/Scroll'
import { getAllFeedback, deleteNotification, addNotification, updateNotification } from '../../networking/adminNetworking'
import '../css/notification_and_feedback.css'
const Feedback = () => {
    const [searchfield, setSearchfield] = useState('');
    const [listNotification, setListNotification] = useState([])
    const [refresh, setRefresh] = useState(true)
    const [showModalAlert, setShowModalAlert] = useState(false);
    const [currNotification, setCurrNotification] = useState({ notificationID: null, title: '', content: '', time: '' })
    const [isEdit, setIsEdit] = useState(false);
    const [showModalInput, setShowModalInput] = useState(false);
    useEffect(() => {
        getAllFeedback()
            .then((response) => {
                setListNotification(response.data)
            })
            .catch(() => {
                setListNotification([]);
            })
        return () => {
            setListNotification([])
        }
    }, [refresh])
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
        console.log(searchfield)
    }
    const filteredNotification = listNotification === undefined ? [] : listNotification.filter(item => {
        var searchtitle = item.title.toLowerCase().includes(searchfield.toLowerCase());
        return searchtitle;
    })
    const handleCloseAlert = () => {
        setShowModalAlert(false);
    }

    const deleteNoti = (id) => {
        deleteNotification(id)
            .then((response) => {
                setRefresh(!refresh)
                setShowModalAlert(false);
            })
            .catch(() => {
                alert("Hệ thống xảy ra lỗi! Vui lòng thử lại sau.")
            })
    }


    const handleCloseModalInput = () => {
        setCurrNotification({ notificationID: null, title: '', content: '', time: '' })
        setIsEdit(false);
        setShowModalInput(false);
    }
    const ModelAlert = () => (
        <Modal
            show={showModalAlert}
            onHide={handleCloseAlert}
            backdrop="static"
            keyboard={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Cảnh báo!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="box_image_inmodal">
                    Bạn muốn XÓA thông báo Tiêu đề "{currNotification.title}" chứ?
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => handleCloseAlert()}>
                    Hủy bỏ
                </Button>
                <Button variant="primary" onClick={() => { deleteNoti(currNotification.notificationID) }}>Đồng ý</Button>
            </Modal.Footer>
        </Modal>
    )

    const ModelInput = () => {
        const [valueInput, setValueInput] = useState(isEdit ? currNotification : { title: "", content: "" })
        const handleChange = (e) => {
            const { name, value } = e.target;
            setValueInput({
                ...valueInput,
                [name]: value,
            });

        };

        const handleSubmit = (event) => {
            if (isEdit) {

                event.preventDefault();
                updateNotification(valueInput.notificationID, valueInput.title, valueInput.content)
                    .then((response) => {
                        setRefresh(!refresh)
                    })
                    .catch(() => {
                        alert("Xảy ra lỗi, vui lòng thử lại sau")
                    })
                    .finally(() => {
                        handleCloseModalInput()
                    })
            } else {

                event.preventDefault();
                addNotification(valueInput.title, valueInput.content)
                    .then((response) => {
                        setRefresh(!refresh)
                    })
                    .catch(() => {
                        alert("Xảy ra lỗi, vui lòng thử lại sau")
                    })
                    .finally(() => {
                        handleCloseModalInput()
                    })
                handleCloseModalInput()
            }
        };
        return (
            <Modal
                show={showModalInput}
                onHide={handleCloseModalInput}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>{isEdit ? "Edit" : "Add"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmit} >
                        <Form.Group className="mb-3" controlId="input_title">
                            <Form.Label>Tiêu đề</Form.Label>
                            <Form.Control
                                required
                                name="title"
                                type="text"
                                placeholder="Nhập tiêu đề"
                                value={valueInput.title}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập tiêu đề
                            </Form.Control.Feedback>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="input_content">
                            <Form.Label>Nội dung thông báo</Form.Label>
                            <Form.Control
                                required
                                name="content"
                                as="textarea"
                                rows={5}
                                value={valueInput.content}
                                onChange={handleChange}
                            />
                            <Form.Control.Feedback type="invalid">
                                Vui lòng nhập nội dung
                            </Form.Control.Feedback>
                        </Form.Group>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button variant="primary" type="submit" >Đồng ý</Button>
                            <Button variant="secondary" onClick={() => handleCloseModalInput()} style={{ marginLeft: "10px" }}>
                                Hủy bỏ
                            </Button>

                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>

                </Modal.Footer>
            </Modal>
        )
    }
    return (
        <div className="containerWithsideBar">
            <div><Admin /></div>
            <div className="container-manager">
                <h2 className="title">Quản lý thông báo</h2>
                <SearchBox searchChange={onSearchChange} />
                <hr />
                <br />
                <div className="box_button_add">
                    <h3> Danh sách phản hồi</h3>

                </div>
                <Accordion defaultActiveKey="0" >
                    {
                        filteredNotification.map((item, i) => {
                            return (
                                <div >
                                    <Card key={i} style={{ marginBottom: "13px" }}>
                                        <Card.Header>
                                            <div style={{ display: "flex", flex: 1, justifyContent: "space-between" }}>

                                                {item.title}
                                                <div>
                                                    <ContextAwareToggle eventKey={i}>_</ContextAwareToggle>


                                                </div>
                                            </div>
                                        </Card.Header>
                                        <Accordion.Collapse eventKey={i}>
                                            <Card.Body>{item.content}</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </div>
                            )
                        })
                    }

                </Accordion>
                <ModelAlert />
                <ModelInput />
            </div>
        </div>
    )
}

export default Feedback
