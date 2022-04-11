import "../styles.css";
import React from "react";
// import Logo from "../assets/Logo.png";
// import { Link } from "react-router-dom";
import "./css/manager.css"
import { FaHome, FaUserAlt, FaInfoCircle, FaSignOutAlt } from "react-icons/fa";
// import { IconName } from "react-icons/bi";
// import Logo from "./assets/Logo.png";
// import inputType from "./assets/inputType.js";
// import Combobox from "react-widgets/Combobox";
const Manager = () => {

    return (
        <div>
            <a>Admin</a>
            <div class='sideBarMenu'>
                <ul>

                    <div><li><a><FaHome />  Home</a></li></div>
                    <div><li><a><FaInfoCircle />  Place</a></li></div>
                    <div><li><a><FaUserAlt />  User</a></li></div>
                    <div><li><a><FaSignOutAlt />  Log Out</a></li></div>

                </ul>
            </div>
        </div>





    );


}

export default Manager;
