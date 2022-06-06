import React, { useState, useEffect } from 'react'
import SearchBox from '../../component/SearchBox'
import { BiPencil } from "react-icons/bi";
import { AiOutlinePlus } from 'react-icons/ai'
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { useHistory } from 'react-router-dom'
import Admin from '../admin'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { getAllTrip, enableTrip, disableTrip } from '../../networking/tripNetworking'


const columns = [
    { id: 'Id', label: 'ID', },
    { id: 'Name', label: 'Tên lịch trình', },
    {
        id: 'city',
        label: 'Tỉnh thành xuất phát',

    },
    {
        id: 'status',
        label: 'Tình trạng',


    },
    {
        id: 'action',
        label: 'Hành động  ',
    }
];

const TripManagement = () => {
    const [searchfield, setSearchfield] = useState('');
    const [listTrip, setListTrip] = useState([]);
    const [refresh, setRefresh] = useState(true)
    const history = useHistory();
    useEffect(() => {
        getAllTrip()
            .then((response) => {
                setListTrip(response.data)
            })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau") })
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
                    <div className="box_button_add">
                        <h3> Danh sách lịch trình</h3>
                        <button className="button_add" onClick={() => { handleOnAddTrip() }}>
                            <AiOutlinePlus />
                            Thêm mới
                        </button>
                    </div>

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
                                                        if (column.id === "userId") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.userID}</a>
                                                                </TableCell>

                                                            )
                                                        }
                                                        if (column.id === "action") {
                                                            return (
                                                                <TableCell>
                                                                    <button className="btn_action button_edit" title="Chỉnh sửa" onClick={() => { handleOnEdit(row.tripID) }}><BiPencil /></button>
                                                                    {row.isDisabled ?
                                                                        <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { handleOnEnable(row.tripID) }}><TiTick /></button>
                                                                        : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => { handleOnDisable(row.tripID) }}><IoBan /></button>}
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === "status") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.isDisabled ? "Bị vô hiệu hóa" : "Đang hoạt động"}</a>
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === "Name") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.tripName}</a>
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === "Id") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.tripID}</a>
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

export default TripManagement
