import "../styles.css";
import React from "react";

import Logo from "../assets/imgs/Logo.png";
import "./css/admin.css"
import { ImHome } from "react-icons/im";
import { FaThLarge, FaUserAlt, FaConciergeBell, FaSignOutAlt } from "react-icons/fa";
import { GiEarthAmerica } from "react-icons/gi";
const Admin = () => {

    return (
        <div class="container-Admin">
            <div class="topbar-Admin">
                <div class="logo-Admin">
                    {/* <!-- <h2>Brand.</h2> //logo --> */}
                </div>
                <div class="search-Admin">
                    <input type="text" name="search" placeholder="search here" />
                    <label for="search"><i class="fas fa-search"></i></label>
                </div>


            </div>
            <div class="sidebar-Admin">
                <ul>
                    <li>
                        <a href="#">
                            <FaThLarge className="icon-Admin" />
                            <div>Trang Chủ</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaUserAlt className="icon-Admin" />
                            <div>Người Dùng</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <GiEarthAmerica className="icon-Admin" />
                            <div>Địa Điểm</div>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <FaConciergeBell className="icon-Admin" />
                            <div>Dịch Vụ</div>
                        </a>
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
