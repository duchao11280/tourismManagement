
import React from "react";
import Logo from "../assets/imgs/Logo.png";
import '../Screen/css/landing.css'

import { Link } from "react-router-dom";
// import Logo from "./assets/Logo.png";
// import inputType from "./assets/inputType.js";
// import Combobox from "react-widgets/Combobox";
const Landing = () => {

    return (
        // <div class="containerlanding">
        //     <div class="topnav">
        //         <a class="active" href="#home">Trang chủ</a>
        //         <a href="#about">Thông tin</a>
        //         <a href="/login" class="top-right-login">Đăng nhập</a>
        //         <a href="/signup" class="top-right-signUp">Đăng ký</a>
        //     </div>

        //     <div>
        //         <div class="center-logolanding">
        //             <img src={Logo} alt="logo" />
        //             <div class="center-titlelanding">ỨNG DỤNG HỖ TRỢ DU LỊCH</div>
        //         </div>

        //         <div class="center-Buttonlanding">
        //             <button class='button-landing-down' > Tải ứng dụng</button>
        //             <button class='button-landing-help'> Hướng dẫn</button>
        //         </div>

        //     </div>


        // </div>


        <div className='bannerLanding'>

            <div className='navbarLanding'>

                <div><img src={Logo} alt="logo" /></div>
                <li className="list_landing"><a href="#" className='textTitleLanding'>Trang Chủ</a></li>
                <li className="list_landing"><a href="#" className='textTitleLanding'>Giới Thiệu</a></li>
                <li className="list_landing"><a href="/login" className='textTitleLanding'>Đăng Nhập</a></li>
                <li className="list_landing"><a href="/signup" className='textTitleLanding'>Đăng ký</a></li>
            </div>

            <div class="contentlanding">
                <h1>HOANGHAO</h1>
                <p> Ứng dụng hỗ trợ du lịch và đặt phòng</p>
                <div>
                    <button className="button_landing" >Tải ứng dụng</button>
                    <button className="button_landing">Hướng dẫn sử dụng</button>
                </div>
            </div>

        </div >

    );


}

export default Landing;
