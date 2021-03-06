import React, { useState, useEffect } from 'react'
import '../css/placeManagement.css'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { AiOutlinePlus } from 'react-icons/ai'
import { FaComment } from "react-icons/fa";
import { useHistory } from 'react-router-dom'
import { getAllPlaces, enablePlace, deletePlace } from "../../networking/adminNetworking"
import Admin from '../admin'
const PlaceManagement = () => {

    const [searchfield, setSearchfield] = useState('');
    const [listPlaces, setListPlaces] = useState([]);
    const history = useHistory();
    const [refresh, setRefresh] = useState(true)
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {

        getPlaceFromServer();
    }, [refresh])
    const getPlaceFromServer = () => {
        setIsLoading(true)
        getAllPlaces()
            .then((listPlaces) => {
                setListPlaces(listPlaces)

            })
            .catch((err) => { alert("Xảy ra lỗi, vui lòng thử lại sau"); setListPlaces([]) })
            .finally(() => { setIsLoading(false) })
    }
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }
    const handleOnEnable = (id) => {
        enablePlace(id).then((res) => { alert(res.message); setRefresh(!refresh) }).catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }
    const handleOnDisable = (id) => {
        deletePlace(id).then((res) => { alert(res.message); setRefresh(!refresh) }).catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }
    const handleOnEdit = (id) => {
        history.push(`/admin/placemanagement/editplace/${id}`)
    }
    const handleOnComment = (id) => {
        history.push(`/admin/placemanagement/commentplace/${id}`)
    }
    const handleOnAddPlace = (id) => {
        history.push(`/admin/placemanagement/addplace`)
    }
    const filteredPlaces = listPlaces === undefined ? [] : listPlaces.filter(place => {
        var searchName = place.placeName.toLowerCase().includes(searchfield.toLowerCase());
        var searchCity = place.city.toLowerCase().includes(searchfield.toLowerCase());
        var search = searchName || searchCity;
        return search;
    })

    return (

        < div className="containerWithsideBar" >
            < Admin />
            <div className="container-manager">
                <h2 className="title">Quản lý địa điểm du lịch</h2>
                <SearchBox searchChange={onSearchChange} />
                <div>
                    {isLoading ? <div> đang tải... </div> : <div>
                        <div className="box_button_add">
                            <h3> Danh sách địa điểm</h3>
                            <button className="button_add" onClick={() => { handleOnAddPlace(); }}>
                                <AiOutlinePlus />
                                Thêm mới
                            </button>
                        </div>

                        <table className="table_place">
                            <thead className="thead-table-place">
                                <tr>
                                    <th>ID</th>
                                    <th>Tên địa điểm</th>
                                    <th>Tỉnh thành</th>
                                    <th>Tình trạng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="tbody-place-management">
                                {filteredPlaces.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.placeID}</td>
                                            <td>{item.placeName}</td>
                                            <td>{item.city}</td>
                                            <td>{item.isDeleted ? "Bị vô hiệu hóa" : "Đang hoạt động"}</td>
                                            <td>
                                                <div className="action_button">
                                                    <button className="btn_action button_edit" title="Chỉnh sửa" onClick={() => { handleOnEdit(item.placeID); }}><BiPencil /></button>
                                                    <button className="btn_action button_commment" title="Xem bình luận" onClick={() => { handleOnComment(item.placeID); }}><FaComment /></button>
                                                    {item.isDeleted ?
                                                        <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { handleOnEnable(item.placeID); }}><TiTick /></button>
                                                        : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => { handleOnDisable(item.placeID); }}><IoBan /></button>}
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>


                    </div>}


                </div>
            </div>
        </div >

    )
}

export default PlaceManagement