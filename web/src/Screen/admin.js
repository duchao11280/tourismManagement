import "../styles.css";
import React from "react";

import "./css/admin.css"
import { FaThLarge, FaUserAlt, FaConciergeBell, FaSignOutAlt, FaBell, FaMotorcycle } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
import { Link } from 'react-router-dom'
const Admin = () => {


    return (
        <div class="container-Admin">
            {/* <div class="topbar-Admin">
                <div class="logo-Admin">
                    <h2>Brand.</h2> 
                </div>
                <div class="search-Admin">
                    <input type="text" name="search" placeholder="search here" />
                    <label for="search"><i class="fas fa-search"></i></label>
                </div>


            </div> */}
            <div class="sidebar-Admin">
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
                        <a href="#">
                            <FaSignOutAlt className="icon-Admin" />
                            <div>Đăng Xuất</div>
                        </a>
                    </li>

                </ul>
            </div>

        </div>




    );
}

export default Admin;
