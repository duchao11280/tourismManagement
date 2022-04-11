import "../styles.css";
import React from "react";
import Logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
// import Logo from "./assets/Logo.png";
// import inputType from "./assets/inputType.js";
// import Combobox from "react-widgets/Combobox";
const Landing = () => {

    return (
        <div class="containerlanding">
            <div class="topnav">
                <a class="active" href="#home">Trang chủ</a>
                <a href="#about">Thông tin</a>
                <a href="/login" class="top-right-login">Đăng nhập</a>
                <a href="/signup" class="top-right-signUp">Đăng ký</a>
            </div>

            <div>
                <div class="center-logolanding">
                    <img src={Logo} alt="logo" />
                    <div class="center-titlelanding">ỨNG DỤNG HỖ TRỢ DU LỊCH</div>
                </div>

                <div class="center-Buttonlanding">
                    <button class='button-landing-down' > Tải ứng dụng</button>
                    <button class='button-landing-help'> Hướng dẫn</button>
                </div>

            </div>


        </div>



    );


}

export default Landing;
