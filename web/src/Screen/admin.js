import "../styles.css";
import React from "react";

import "./css/admin.css"
import Logo from '../../src/assets/imgs/Logo.png'
import { FaThLarge, FaUserAlt, FaConciergeBell, FaSignOutAlt, FaBell, FaMotorcycle } from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { GiEarthAmerica } from "react-icons/gi";
import { Link } from 'react-router-dom'
import { logOut } from '../networking/userNetworking'
const Admin = () => {

    const logOutFunc = () => {
        logOut().then(() => { window.location.assign('/home') }).catch(() => { window.location.assign('/home') })
    }
    return (
        <div className="container-Admin">
            <div className="sidebar-Admin">
                <div style={{ paddingLeft: '50px' }}>
                    <img src={Logo} alt="logo" />
                </div>
                <ul>
                    <li>

                        <Link to="/admin"> <a href="#" >
                            <FaThLarge className="icon-Admin" />
                            <div>Trang Chủ</div>
                        </a></Link>
                    </li>
                    <li>

                        <Link to="/admin/usermanagement">   <a href="" >
                            <FaUserAlt className="icon-Admin" />
                            <div>Người Dùng</div>
                        </a></Link>
                    </li>
                    <li>


                        <Link to="/admin/placemanagement">
                            <a >
                                <GiEarthAmerica className="icon-Admin" />
                                <div>Địa Điểm</div>
                            </a></Link>
                    </li>
                    <li>

                        <Link to="/admin/servicemanagement">
                            <a >
                                <FaConciergeBell className="icon-Admin" />
                                <div>Dịch Vụ</div>
                            </a></Link>
                    </li>
                    <li>

                        <Link to="/admin/tripmanagement">
                            <a >
                                <FaMotorcycle className="icon-Admin" />
                                <div>Lịch trình</div>
                            </a></Link>
                    </li>
                    <li>

                        <Link to="/admin/notificationmanagement">
                            <a >
                                <FaBell className="icon-Admin" />
                                <div>Thông báo</div>
                            </a></Link>
                    </li>
                    <li>
                        <Link to="/admin/feedbackmanagement">
                            <a >
                                <FiMail className="icon-Admin" />
                                <div>Phản hồi</div>
                            </a></Link>
                    </li>
                    <li>
                        <a href="#">
                            <FaSignOutAlt className="icon-Admin" />
                            <div onClick={() => logOutFunc()}>Đăng Xuất</div>
                        </a>
                    </li>

                </ul>
            </div>

        </div>




    );
}

export default Admin;
