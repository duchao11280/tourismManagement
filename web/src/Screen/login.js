import "../styles.css";
import Logo from "../assets/Logo.png";
import React, { useState } from "react";

// import inputType from "./assets/inputType.js";
function Login() {
  const [userName, setuserName] = useState('');
  const [password, setpassword] = useState('');

  const handleUserNameChange = (e) => {
    setuserName(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setpassword(e.target.value);
  }
  return (
    <div className="containerLogin">
      <div><img src={Logo} alt="logo" /></div>
      <div className="login-form">
        <form>
          <div className="login-title">Đăng nhập</div>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required value={userName}
              onChange={(e) => { handleUserNameChange(e) }} />
          </div>


          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required value={password}
              onChange={(e) => { handlePasswordChange(e) }} />
          </div>

          <div className="button-container">
            <input type="submit" />
          </div>
        </form>

      </div>
      <a href="http" className="signUpSentense">Chưa có tài khoản? đăng ký ngay!</a>
    </div >
  );
}

export default Login;
