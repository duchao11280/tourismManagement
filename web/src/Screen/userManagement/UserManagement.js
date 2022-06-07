import React, { useState, useEffect } from 'react'
import SearchBox from '../../component/SearchBox'
import { IoBan } from "react-icons/io5";
import { TiTick } from "react-icons/ti"
import { disableUser, getAllUsers, enableUser } from '../../networking/adminNetworking'

import Admin from '../admin'

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
                    <table className="table_user">
                        <thead className="thead-table-user">
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
                        <tbody className="tbody-user-management">
                            {filterUser.map((item, i) => {
                                return (
                                    <tr key={i}>
                                        <td>{item.userID}</td>
                                        <td>{item.userName}</td>
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
                    </table>

                </div>
            </div>
        </div>
    )
}

export default UserManagement
