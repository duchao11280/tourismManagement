import React, { useState, useEffect } from 'react'
import '../css/placeManagement.css'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { AiOutlinePlus } from 'react-icons/ai'
import { useHistory } from 'react-router-dom'
import { getAllPlaces, enablePlace, deletePlace } from "../../networking/adminNetworking"
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Admin from '../admin'
const columns = [
    { id: 'placeID', label: 'Mã số', },
    { id: 'placeName', label: 'Tên địa điểm', },
    {
        id: 'city',
        label: 'Tỉnh thành',

    },
    {
        id: 'status',
        label: 'Tình trạng',


    },
    {
        id: 'action',
        label: 'Hành động  ',


    },
];

const PlaceManagement = () => {

    const [searchfield, setSearchfield] = useState('');
    const [listPlaces, setListPlaces] = useState([]);
    const history = useHistory();
    const [refresh, setRefresh] = useState(true)

    useEffect(() => {

        getPlaceFromServer();
    }, [refresh])
    const getPlaceFromServer = () => {

        getAllPlaces()
            .then((listPlaces) => {
                setListPlaces(listPlaces)
            })
            .catch((err) => { alert("Xảy ra lỗi, vui lòng thử lại sau"); setListPlaces([]) })
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
        <div >
            <div className="containerWithsideBar">
                <Admin />
                <div className="container-manager">
                    <h2 className="title">Quản lý địa điểm du lịch</h2>
                    <SearchBox searchChange={onSearchChange} />
                    <div>
                        <div className="box_button_add">
                            <h3> Danh sách địa điểm</h3>
                            <button className="button_add" onClick={() => { handleOnAddPlace(); }}>
                                <AiOutlinePlus />
                                Thêm mới
                            </button>
                        </div>
                        {/* <table className="table_place">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Tên địa điểm</th>
                                <th>Tỉnh thành</th>
                                <th>Tình trạng</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
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
                                                {item.isDeleted ?
                                                    <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { handleOnEnable(item.placeID); }}><TiTick /></button>
                                                    : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => { handleOnDisable(item.placeID); }}><IoBan /></button>}
                                            </div>
                                        </td>
                                    </tr>
                                );
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
                                        {filteredPlaces
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
        </div>

    )
}

export default PlaceManagement
