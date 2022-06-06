import React, { useState, useEffect } from 'react'
import SearchBox from '../../component/SearchBox'
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { disableUser, getAllUsers, enableUser } from '../../networking/adminNetworking'
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
    { id: 'userId', label: 'Mã số', },
    { id: 'userName', label: 'Tên tài khoản', },
    {
        id: 'fullName',
        label: 'Tên đầy đủ',

    },
    {
        id: 'email',
        label: 'Email',


    },
    {
        id: 'phone',
        label: 'PhoneNumber  ',
    },
    {
        id: 'typeAccount',
        label: 'Loại tài khoản  ',
    },
    {
        id: 'status',
        label: 'trạng thái  ',
    },
    {
        id: 'action',
        label: ' ',
    },
];
const UserManagement = () => {
    const [searchfield, setSearchfield] = useState('');
    const [listUser, setListUser] = useState([]);
    const [refresh, setRefresh] = useState(true)
    useEffect(() => {
        let flag = true;
        getAllUsers()
            .then((response) => {
                if (flag === true) {
                    setListUser(response.data)
                }
            })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!"); setListUser([]) })
        return () => { flag = false }
    }, [refresh])
    const onSearchChange = (event) => {
        setSearchfield(event.target.value);
    }
    const handleOnDisableUser = (id) => {
        disableUser(id)
            .then((res) => { alert(res.message); setRefresh(!refresh) })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }
    const handleOnEnableUser = (id) => {
        enableUser(id)
            .then((res) => { alert(res.message); setRefresh(!refresh) })
            .catch(() => { alert("Xảy ra lỗi, vui lòng thử lại sau!") })
    }
    const filterUser = listUser === undefined ? [] : listUser.filter(user => {
        let searchUserName = user.userName.toLowerCase().includes(searchfield.toLowerCase());
        let searchFullName = user.fullName.toLowerCase().includes(searchfield.toLowerCase());
        let searchEmail = user.email.toLowerCase().includes(searchfield.toLowerCase());
        let searchPhoneNumber = user.phonenumber.toLowerCase().includes(searchfield.toLowerCase());
        let searchRoleName = user.roleName.toLowerCase().includes(searchfield.toLowerCase());
        let search = searchUserName || searchFullName || searchEmail || searchPhoneNumber || searchRoleName;
        return search;
    })
    return (
        <div className="containerWithsideBar">
            <div><Admin /></div>
            <div className="container-manager">
                <h2 className="title">Quản lý người dùng</h2>
                <SearchBox searchChange={onSearchChange} />
                <div>
                    {/* <table className="table_place">
                        <thead>
                            <tr>
                                <th>Mã người dùng</th>
                                <th>Tên tài khoản</th>
                                <th>Tên đầy đủ</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Loại tài khoản</th>
                                <th>Trạng thái</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {filterUser.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.userID}</td>
                                        <td>{item.userName}</td>S
                                        <td>{item.fullName}</td>
                                        <td>{item.email}</td>
                                        <td>{item.phonenumber}</td>
                                        <td>{item.roleName}</td>
                                        <td>{item.isDisabled ? "Bị vô hiệu hóa" : "Đang hoạt động"}</td>
                                        <td>
                                            <div className="action_button">
                                                {item.isDisabled ?
                                                    <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { handleOnEnableUser(item.userID); }}><TiTick /></button>
                                                    : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => { handleOnDisableUser(item.userID); }}><IoBan /></button>}
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
                                    {filterUser
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
                                                                    {row.isDisabled ?
                                                                        <button className="btn_action button_enable" title="Kích hoạt" onClick={() => { handleOnEnableUser(row.userID); }}><TiTick /></button>
                                                                        : <button className="btn_action button_disable" title="Vô hiệu hóa" onClick={() => { handleOnDisableUser(row.userID); }}><IoBan /></button>}
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
                                                        if (column.id === "phone") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.phonenumber}</a>
                                                                </TableCell>
                                                            )
                                                        }
                                                        if (column.id === "typeAccount") {
                                                            return (
                                                                <TableCell>
                                                                    <a>{row.roleName}</a>
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

export default UserManagement
