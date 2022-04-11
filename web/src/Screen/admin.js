import "../styles.css";
import React from "react";
// import Logo from "../assets/Logo.png";
// import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import "./css/admin.css"
import { FaHome, FaUserAlt, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
import { IconName } from "react-icons/bi";
// import Logo from "./assets/Logo.png";
// import inputType from "./assets/inputType.js";
// import Combobox from "react-widgets/Combobox";
const Admin = () => {

    return (
        <div>
            <div class='logo'>
                <img src={Logo} alt="logo" />
            </div>
            <div class='sideBarMenu'>
                <ul>
                    <div><li><a><FaHome />  Trang chủ</a></li></div>
                    <div><li><a><FaInfoCircle />  Địa điểm</a></li></div>
                    <div><li><a><FaUserAlt />  Người dùng</a></li></div>
                    <div><li><a><FaSignOutAlt />  Đăng xuất</a></li></div>
                </ul>
            </div>


            <div class='searchbox' ><input type='text' maxlength="100" size="100"></input></div>
            <div class='userlist'>
                <ol>
                    <li>Duchao123</li>
                    <li>admin</li>
                    <li>admin123</li>
                </ol>
            </div>

        </div>
    );
}

export default Admin;
