import "../styles.css";
import Logo from "../assets/Logo.png";
import React, { useState } from "react";
import { login } from "../networking/userNetworking"

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

  const conductLogin = async () => {
    const response = await login(userName, password);
    if (response.status === true) {
      setuserName('')
      setpassword('')
      try {

        // console.log(response.data.user.userName.toString())

        if (response.data.user.role === 0) {
          console.log("user vao")
        } else if (response.data.user.role === 1) {
          console.log("admin")
        } else if (response.data.user.role === 2) {
          console.log("hotel")
        } else if (response.data.user.role === 3) {
          console.log("restaurant")
        }

      } catch (e) {
      }
    } else {
      alert(response.message)
    }



  }
  const handleSubmit = (e) => {
    console.log(userName, password);
    conductLogin();
    // alert("Đăng nhập thành công!");
    e.preventDefault();
  }
  return (
    <div className="containerLogin">
      <div><img src={Logo} alt="logo" /></div>
      <div className="login-form">
        <form onSubmit={handleSubmit}>
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
