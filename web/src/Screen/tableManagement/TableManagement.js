import React, {useState, useEffect} from 'react'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { AiOutlinePlus } from 'react-icons/ai'
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import {getAllTableByUserID} from '../../networking/servicesNetworking'
const TableManagement = () => {
    const [searchfield, setSearchfield] = useState('');
    const [listTables, setListTables] = useState([]);
    const [refresh, setRefresh] = useState(true)
    useEffect(()=>{
        getAllTableByUserID()
            .then((response)=>{
                setListTables(response.data)
            })
            .catch(()=>{alert("Xảy ra lỗi, vui lòng thử lại sau")})
    },[refresh])

    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }
    const filteredTables= listTables === undefined ? [] : listTables.filter(table => {
        var searchName = table.tableName.toLowerCase().includes(searchfield.toLowerCase());
        var searchSlot = table.slot == searchfield?1:0;
        var searchAddress = table.address.toLowerCase().includes(searchfield.toLowerCase());
        var searchPlaceName = table.placeName.toLowerCase().includes(searchfield.toLowerCase());
        var search = searchName || searchSlot || searchAddress || searchPlaceName;
        return search;
    })
    return (
        <div className="container">
            <h2 className="title">Quản lý bàn</h2>
            <SearchBox searchChange={onSearchChange} />
            <div>
                <div className="box_button_add">
                    <h3> Danh sách bàn</h3>
                    <button className="button_add" onClick={() => {  }}>
                        <AiOutlinePlus />
                    Thêm mới
                </button>
                </div>
                <table className="table_place">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên bàn</th>
                            <th>Số lượng ghế ngồi</th>
                            <th>Mô tả</th>
                            <th>Địa điểm</th>
                            <th>Địa chỉ</th>
                            <th>Tình trạng</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTables.map((item, i) => {
                            return (
                                <tr key={i}>
                    
                                    <td>{item.tableID}</td>
                                    <td>{item.tableName}</td>
                                    <td>{item.slot}</td>
                                    <td>{item.description}</td>
                                    <td>{item.placeName}</td>
                                    <td>{item.address}</td>
                                    <td>{item.isDeleted ? "Bị vô hiệu hóa" : "Đang hoạt động"}</td>
                                    <td>
                                        <div className="action_button">
                                            <button className="btn_action button_edit" title="Chỉnh sửa" onClick={() => {  }}><BiPencil /></button>
                                            {item.isDeleted ?
                                                <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { }}><TiTick /></button>
                                                : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => {  }}><IoBan /></button>}
                                        </div>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default TableManagement
