import React, { useState, useEffect } from 'react'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { AiOutlinePlus } from 'react-icons/ai'
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { useHistory } from 'react-router-dom'
import Admin from '../admin'
import { getAllServices, enableService, disableService } from '../../networking/servicesNetworking'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

const columns = [
    { id: 'Id', label: 'ID', },
    { id: 'Name', label: 'Tên dịch vụ', },
    {
        id: 'type',
        label: 'Loại dịch vụ',

    },
    {
        id: 'city',
        label: 'Tỉnh thành',


    },
    {
        id: 'place',
        label: 'Địa điểm  ',
    },
    {
        id: 'address',
        label: 'Địa chỉ  ',
    },
    {
        id: 'phone',
        label: 'Liên hệ  ',
    },
    {
        id: 'status',
        label: 'Tình trạng ',
    },
    {
        id: 'action',
        label: 'Hành động ',
    },
];
const ServicesManagement = () => {
    const [searchfield, setSearchfield] = useState('');
    const [listService, setListService] = useState([]);
    const [refresh, setRefresh] = useState(true)
    const history = useHistory();
    useEffect(() => {
        getAllServices()
            .then((response) => {
                setListService(response.data)
            })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau") })
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
                    <div className="box_button_add">
                        <h3> Danh sách dịch vụ</h3>
                        <button className="button_add" onClick={() => { handleOnAddService() }}>
                            <AiOutlinePlus />
                            Thêm mới
                        </button>
                    </div>
                    {/* <table>
                        <thead>
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
                        <tbody>
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
                    </table> */}
                    <Paper sx={{ width: '100%', overflow: 'hidden', height: '450px' }}>
                        <TableContainer sx={{ maxHeight: 440 }}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead>
                                    <TableRow >
                                        {columns.map((column) => (
                                            <TableCell
                                                key={column.id}
                                                align={column.align}
                                                style={{ minWidth: column.minWidth, backgroundColor: 'skyblue' }}
                                            >
                                                {column.label}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredTables
                                        .map((row) => {
                                            return (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                                                    {columns.map((column) => {
                                                        const value = row[column.id];
                                                        if (column.id === "status") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.isDeleted ? "Bị vô hiệu hóa" : "Đang hoạt động"}</a>
                                                                </TableCell>

                                                            )
                                                        }
                                                        if (column.id === "action") {
                                                            return (
                                                                <TableCell>
                                                                    <div className="action_button">
                                                                        <button className="btn_action button_edit" title="Chỉnh sửa" onClick={() => { handleOnEdit(row.placeID); }}><BiPencil /></button>
                                                                        {row.isDeleted ?
                                                                            <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { handleOnEnable(row.placeID); }}><TiTick /></button>
                                                                            : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => { handleOnDisable(row.placeID); }}><IoBan /></button>}
                                                                    </div>
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === "phone") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.hotline}</a>
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === "place") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.city}</a>
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === "type") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.typeService}</a>
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === "Id") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.serviceID}</a>
                                                                </TableCell>
                                                            )
                                                        }

                                                        if (column.id === "Name") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.serviceName}</a>
                                                                </TableCell>
                                                            )
                                                        }




                                                        return (

                                                            <TableCell key={column.id} align={column.align}>
                                                                {column.format && typeof value === 'number'
                                                                    ? column.format(value)
                                                                    : value}
                                                            </TableCell>
                                                        );
                                                    }
                                                    )}
                                                </TableRow>
                                            );
                                        })}
                                </TableBody>
                            </Table>
                        </TableContainer>

                    </Paper>
                </div>
            </div>
        </div>
    )

}

export default ServicesManagement
