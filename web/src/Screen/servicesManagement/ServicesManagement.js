import React, { useState, useEffect } from 'react'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { AiOutlinePlus } from 'react-icons/ai'
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { useHistory } from 'react-router-dom'
import Admin from '../admin'
import { getAllServices, enableService, disableService } from '../../networking/servicesNetworking'



const ServicesManagement = () => {
    const [searchfield, setSearchfield] = useState('');
    const [listService, setListService] = useState([]);
    const [refresh, setRefresh] = useState(true)
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        setIsLoading(true)
        getAllServices()
            .then((response) => {
                setListService(response.data)
            })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau") })
            .finally(() => { setIsLoading(false) })
    }, [refresh])
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }
    const handleOnEnable = (id) => {
        enableService(id).then((res) => { alert(res.message); setRefresh(!refresh) }).catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }
    const handleOnDisable = (id) => {
        disableService(id).then((res) => { alert(res.message); setRefresh(!refresh) }).catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }
    const handleOnAddService = (id) => {
        history.push(`/admin/servicemanagement/addservice`)
    }
    const handleOnEdit = (id) => {
        history.push(`/admin/servicemanagement/editservice/${id}`)
    }
    const filteredTables = listService === undefined ? [] : listService.filter(service => {
        var searchName = service.serviceName.toLowerCase().includes(searchfield.toLowerCase());
        var searchTypeService = service.typeService.toLowerCase().includes(searchfield.toLowerCase());
        var searchAddress = service.address.toLowerCase().includes(searchfield.toLowerCase());
        var searchPlaceName = service.placeName.toLowerCase().includes(searchfield.toLowerCase());
        var searchCity = service.city.toLowerCase().includes(searchfield.toLowerCase());
        var search = searchName || searchAddress || searchPlaceName || searchTypeService || searchCity;
        return search;
    })
    return (
        <div className="containerWithsideBar">
            <Admin />
            <div className="container-manager">
                <h2 className="title">Quản lý dịch vụ</h2>
                <SearchBox searchChange={onSearchChange} />
                <div>
                    {isLoading ? <div> đang tải... </div> : <div>
                        <div className="box_button_add">
                            <h3> Danh sách dịch vụ</h3>
                            <button className="button_add" onClick={() => { handleOnAddService() }}>
                                <AiOutlinePlus />
                                Thêm mới
                            </button>
                        </div>
                        <div >
                            <table className="table_place">
                                <thead className="thead-table-place">
                                    <tr>
                                        <th>ID</th>
                                        <th>Tên dịch vụ</th>
                                        <th>Loại dịch vụ</th>
                                        <th>Tỉnh thành</th>
                                        <th>Địa diểm</th>
                                        <th>Địa chỉ</th>
                                        <th>Liên hệ</th>
                                        <th>Tình trạng</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody className="tbody-place-management">
                                    {filteredTables.map((item, i) => {
                                        return (
                                            <tr key={i}>

                                                <td>{item.serviceID}</td>
                                                <td>{item.serviceName}</td>
                                                <td>{item.typeService}</td>
                                                <td>{item.city}</td>
                                                <td>{item.placeName}</td>
                                                <td>{item.address}</td>
                                                <td>{item.hotline}</td>
                                                <td>{item.isDisabled ? "Bị vô hiệu hóa" : "Đang hoạt động"}</td>
                                                <td>
                                                    <div className="action_button">
                                                        <button className="btn_action button_edit" title="Chỉnh sửa" onClick={() => { handleOnEdit(item.serviceID) }}><BiPencil /></button>
                                                        {item.isDisabled ?
                                                            <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { handleOnEnable(item.serviceID) }}><TiTick /></button>
                                                            : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => { handleOnDisable(item.serviceID) }}><IoBan /></button>}
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>}

                </div>
            </div>
        </div>
    )

}

export default ServicesManagement
