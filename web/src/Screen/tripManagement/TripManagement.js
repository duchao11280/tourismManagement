import React, { useState, useEffect } from 'react'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { AiOutlinePlus } from 'react-icons/ai'
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { useHistory } from 'react-router-dom'
import Admin from '../admin'
import { getAllTrip, enableTrip, disableTrip } from '../../networking/tripNetworking'
const TripManagement = () => {
    const [searchfield, setSearchfield] = useState('');
    const [listTrip, setListTrip] = useState([]);
    const [refresh, setRefresh] = useState(true)
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        getAllTrip()
            .then((response) => {
                setListTrip(response.data)
            })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau") })
            .finally(() => { setIsLoading(false) })
    }, [refresh])
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }
    const handleOnEnable = (id) => {
        enableTrip(id).then((res) => { alert(res.message); setRefresh(!refresh) }).catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }
    const handleOnDisable = (id) => {
        disableTrip(id).then((res) => { alert(res.message); setRefresh(!refresh) }).catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }
    const handleOnAddTrip = () => {
        history.push(`/admin/tripmanagement/addtrip`)
    }
    const handleOnEdit = (id) => {
        history.push(`/admin/tripmanagement/edittrip/${id}`)
    }
    const filteredTables = listTrip === undefined ? [] : listTrip.filter(trip => {
        var searchName = trip.tripName.toLowerCase().includes(searchfield.toLowerCase());
        var searchCity = trip.city.toLowerCase().includes(searchfield.toLowerCase());
        var search = searchName || searchCity;
        return search;
    })
    return (
        <div className="containerWithsideBar">
            <Admin />
            <div className="container-manager">
                <h2 className="title">Quản lý lịch trình</h2>
                <SearchBox searchChange={onSearchChange} />
                <div>
                    {isLoading ? <div> đang tải... </div> : <div>
                        <div className="box_button_add">
                            <h3> Danh sách lịch trình</h3>
                            <button className="button_add" onClick={() => { handleOnAddTrip() }}>
                                <AiOutlinePlus />
                                Thêm mới
                            </button>
                        </div>
                        <table className="table_place">
                            <thead className="thead-table-place">
                                <tr>
                                    <th>ID</th>
                                    <th>Tên lịch trình</th>
                                    <th>Tỉnh thành xuất phát</th>
                                    <th>Tình trạng</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="tbody-place-management">
                                {filteredTables.map((item, i) => {
                                    return (
                                        <tr key={i}>
                                            <td>{item.tripID}</td>
                                            <td>{item.tripName}</td>
                                            <td>{item.city}</td>
                                            <td>{item.isDisabled ? "Bị vô hiệu hóa" : "Đang hoạt động"}</td>
                                            <td>
                                                <div className="action_button">
                                                    <button className="btn_action button_edit" title="Chỉnh sửa" onClick={() => { handleOnEdit(item.tripID) }}><BiPencil /></button>
                                                    {item.isDisabled ?
                                                        <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { handleOnEnable(item.tripID) }}><TiTick /></button>
                                                        : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => { handleOnDisable(item.tripID) }}><IoBan /></button>}
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>}
                </div>

            </div>
        </div>
    )
}

export default TripManagement