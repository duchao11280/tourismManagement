import "../styles.css";
import React, { useState } from "react";

// import Logo from "./assets/Logo.png";
// import inputType from "./assets/inputType.js";
// import Combobox from "react-widgets/Combobox";
const SignUp = () => {
    const [fullName, setfullName] = useState('');
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [email, setemail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [role, setrole] = useState(0);
    // const [isLoading, setLoading] = useState(false);
    let isValidate = false;

    const onSignUp = () => {
        validate();
        if (isValidate) {
            console.log("ok dang ky");
        }
    }
    const validate = () => {
        const reg = new RegExp('^[0-9]+$');
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (fullName.length === 0) {
            console.log("Tên không được để trống", false);
            isValidate = false
        }
        else if (reg.test(fullName)) {
            console.log("Họ và tên không hợp lệ", false);
            isValidate = false
        }
        else if (userName.length === 0) {
            console.log("Tên đăng nhập không được để trống", false);
            isValidate = false
        } else if (userName.length === 0) {
            console.log("Tên đăng nhập không được để trống", false);
            isValidate = false
        } else if (userName.length === 0) {
            console.log("Tên không được để trống", false);
            isValidate = false
        } else if (userName.length < 7) {
            console.log("Tên đăng nhập phải lớn hơn 6 kí tự", false);
            isValidate = false
        }
        else if (userName.includes(" ")) {
            console.log("Tên đăng nhập không được chứa khoảng trống", false);
            isValidate = false
        }
        else if (password.length === 0) {
            console.log("Mật khẩu không được để trống", false);
            isValidate = false
        }

        else if (password.includes(" ")) {
            console.log("mật khẩu không được chứa khoảng trống", false);
            isValidate = false
        }
        else if ((password.trim()).length < 6) {
            console.log("Mật khẩu phải từ 6 ký tự trở lên", false);
            isValidate = false
        }
        else if (password !== confirmpassword) {
            console.log("Nhập lại mật khẩu không khớp", false);
            isValidate = false
        }
        else if (!reg.test(phonenumber)) {
            console.log("số điện thoại không hợp lệ", false);
            isValidate = false
        }
        else if (phonenumber.length < 10) {
            console.log("Số điện thoại không hợp lệ", false);
            isValidate = false
        }
        else if (!re.test(email)) {
            console.log("Email sai định dạng", false);
            isValidate = false
        } else isValidate = true
    }

    const handleUserNameChange = (e) => {
        setuserName(e.target.value);
    }
    const handleFullNameChange = (e) => {
        setfullName(e.target.value);
    }

    const handlePasswordChange = (e) => {
        setpassword(e.target.value);
    }
    const handleConfirmPasswordChange = (e) => {
        setconfirmpassword(e.target.value);
    }

    const handlePhoneNumberChange = (e) => {
        setphonenumber(e.target.value);
    }

    const handleEmailChange = (e) => {
        setemail(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <div className="containerLogin">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div className="login-title">Đăng ký tài khoản</div>
                    <div className="input-container">
                        <label>Họ và tên </label>
                        <input type="text" name="uname" value={fullName}
                            onChange={(e) => { handleFullNameChange(e) }} />
                    </div>

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


                    <div className="input-container">
                        <label>Nhập lại mật khẩu </label>
                        <input type="password" name="pass" value={confirmpassword}
                            onChange={(e) => { handleConfirmPasswordChange(e) }} />
                    </div>


                    <div className="input-container">
                        <label>Email </label>
                        <input type="text" name="uname" value={email}
                            onChange={(e) => { handleEmailChange(e) }} />
                    </div>


                    <div className="input-container">
                        <label>Số điện thoại </label>
                        <input type="text" name="uname" value={phonenumber}
                            onChange={(e) => { handlePhoneNumberChange(e) }} />
                    </div>

                    <div className="combobox-signup">
                        <label>Đối tượng sử dụng  </label>
                        <select selectedValue={role}
                            onValueChange={(value) => setrole(value)}>
                            <option value="2">Quản lý nhà hàng</option>
                            <option value="3">Quản lý khách sạn</option>
                        </select>
                    </div>

                    <div className="button-container">
                        <button className="SignButton" onClick={onSignUp}>
                            Đăng ký tài khoản
                        </button>
                    </div>


                </form>

            </div >
            <a href="http" className="signUpSentense">Đã có tài khoản? đăng nhập</a>
        </div >
    );
}

export default SignUp;
