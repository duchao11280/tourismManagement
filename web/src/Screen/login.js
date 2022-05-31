import "../styles.css";
import Logo from "../assets/imgs/Logo.png";
import React, { useState } from "react";
import { login } from "../networking/userNetworking"

import { useHistory } from "react-router-dom";

// import inputType from "./assets/inputType.js";
function Login() {
  const history = useHistory();

  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');
  const [error, serError] = useState('');

  const handleUserNameChange = (e) => {
    setuserName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  }

  const conductLogin = async () => {
    const response = await login(userName, password);
    console.log(response);
    if (response.status === true) {
      setuserName('')
      setpassword('')
      try {

        // console.log(response.data.user.userName.toString())

        if (response.data.user.role === 0) {
          alert('bạn đang đăng nhập tài khoản người dùng, vui lòng tải ứng dụng du lịch')
        } else if (response.data.user.role === 1) {
          history.push("/admin")
        }


      } catch (e) {
      }
    } else {
      serError('Sai tên đăng nhập hoặc mật khẩu');
      // alert(response.message)
    }



  }
  const handleSubmit = (e) => {
    conductLogin();
    e.preventDefault();
    console.log(userName, password);

    // alert("Đăng nhập thành công!");

  }
  return (
    <div className="containerLogin">
      <div className="container-logo-login-admin">
        <img src={Logo} alt="logo" />
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
          <div className="login-title">Đăng nhập</div>
          <div className="input-container">
            <label>Tên đăng nhập </label>
            <input type="text" name="uname" value={userName}
              onChange={(e) => { handleUserNameChange(e) }} />
          </div>


          <div className="input-container">
            <label>Mật khẩu </label>
            <input type="password" name="pass" value={password}
              onChange={(e) => { handlePasswordChange(e) }} />
          </div>

          <div className="button-container">
            {/* <input type="submit" label="Đăng nhập" /> */}
            <div className="container-button-login">
              <button className="button-login"> Đăng nhập</button>
            </div>
          </div>
          <div className="container-error-font">
            <div className="error-font">{error}</div>
          </div>

        </form>

      </div>
      <a href="$" className="signUpSentense">Chưa có tài khoản? đăng ký ngay!</a>
    </div >
  );
}

export default Login;
