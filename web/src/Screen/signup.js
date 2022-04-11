import "../styles.css";
import React, { useState } from "react";
import { signUp } from "../networking/userNetworking"

// import Logo from "./assets/Logo.png";
// import inputType from "./assets/inputType.js";
// import Combobox from "react-widgets/Combobox";
const SignUp = () => {
    var errorshow;
    var err;
    const [fullName, setfullName] = useState('');
    const [userName, setuserName] = useState('');
    const [password, setpassword] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [email, setemail] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [role, setrole] = useState(2);




    const [errfullName, seterrfullName] = useState('');
    const [erruserName, seterruserName] = useState('');
    const [errpassword, seterrpassword] = useState('');
    const [errconfirmpassword, seterrconfirmpassword] = useState('');
    const [erremail, seterremail] = useState('');
    const [errphonenumber, seterrphonenumber] = useState('');


    // const [isLoading, setLoading] = useState(false);
    let isValidate = false;

    const successcleanerr = () => {
        seterrfullName("");
        seterruserName("");
        seterrpassword("");
        seterrconfirmpassword("");
        seterremail("");
        seterrphonenumber("");
    }

    const cleanerr = () => {
        if (err === 1) {
            seterruserName("");
            seterrpassword("");
            seterrconfirmpassword("");
            seterremail("");
            seterrphonenumber("");
        } else if (err === 2) {
            seterrfullName("");
            seterrpassword("");
            seterrconfirmpassword("");
            seterremail("");
            seterrphonenumber("");
        }
        else if (err === 3) {
            seterrfullName("");
            seterruserName("");
            seterrconfirmpassword("");
            seterremail("");
            seterrphonenumber("");

        }
        else if (err === 4) {
            seterrfullName("");
            seterruserName("");
            seterrpassword("");
            seterremail("");
            seterrphonenumber("");

        }
        else if (err === 5) {
            seterrfullName("");
            seterruserName("");
            seterrpassword("");
            seterrconfirmpassword("");;
            seterrphonenumber("");

        }
        else if (err === 6) {
            seterrfullName("");
            seterruserName("");
            seterrpassword("");
            seterrconfirmpassword("");
            seterremail("");
        }
    }

    const conductSignUp = () => {

        var params = {
            fullName: fullName,
            userName: userName.trim(),
            password: password.trim(),
            email: email,
            phonenumber: phonenumber,
            role: role
        };
        console.log(params);
        signUp(params).then((response) => {
            if (response === undefined) {
                alert("Xảy ra lỗi, vui lòng thử lại sau");
                return;
            }
            alert(response.message);
        }).catch((error) => {
            alert("Xảy ra lỗi, vui lòng thử lại sau");
        })
    }
    // const onSignUp = () => {
    //     validate();
    //     if (isValidate) {
    //         conductSignUp();
    //         console.log("ok dang ky");
    //     }
    // }
    const validate = () => {
        const reg = new RegExp('^[0-9]+$');
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (fullName.length === 0) {

            console.log("Tên không được để trống", false);
            err = 1;
            errorshow = "Tên không được để trống";
            cleanerr();
            seterrfullName(errorshow);
            isValidate = false
        }
        else if (reg.test(fullName)) {
            console.log("Họ và tên không hợp lệ", false);
            err = 1;
            errorshow = "Họ và tên không hợp lệ";
            cleanerr();
            seterrfullName(errorshow);
            isValidate = false
        }
        else if (userName.length === 0) {
            console.log("Tên đăng nhập không được để trống", false);
            err = 2;
            errorshow = "Tên đăng nhập không được để trống";
            cleanerr();
            seterruserName(errorshow);
            isValidate = false
        } else if (userName.length < 7) {
            console.log("Tên đăng nhập phải lớn hơn 6 kí tự", false);
            err = 2
            errorshow = "Tên đăng nhập phải lớn hơn 6 kí tự";
            cleanerr();
            seterruserName(errorshow);
            isValidate = false
        }
        else if (userName.includes(" ")) {
            console.log("Tên đăng nhập không được chứa khoảng trống", false);
            err = 2;
            errorshow = "Tên đăng nhập không được chứa khoảng trống";
            cleanerr();
            seterruserName(errorshow);
            isValidate = false
        }
        else if (password.length === 0) {
            console.log("Mật khẩu không được để trống", false);
            err = 3;
            errorshow = "Mật khẩu không được để trống";
            cleanerr();
            seterrpassword(errorshow);
            isValidate = false
        }

        else if (password.includes(" ")) {
            console.log("mật khẩu không được chứa khoảng trống", false);
            err = 3;
            errorshow = "mật khẩu không được chứa khoảng trống";
            cleanerr();
            seterrpassword(errorshow);
            isValidate = false
        }
        else if ((password.trim()).length < 6) {
            console.log("Mật khẩu phải từ 6 ký tự trở lên", false);
            err = 3;
            errorshow = "Mật khẩu phải từ 6 ký tự trở lên";
            cleanerr();
            seterrpassword(errorshow);
            isValidate = false
        }
        else if (password !== confirmpassword) {
            console.log("Nhập lại mật khẩu không khớp", false);
            err = 4;
            errorshow = "Nhập lại mật khẩu không khớp";
            cleanerr();
            seterrconfirmpassword(errorshow);
            isValidate = false
        }
        else if (email.length === 0) {
            console.log("Email không được để trống", false);
            err = 5;
            errorshow = "Email không được để trống";
            cleanerr();
            seterremail(errorshow);
            isValidate = false
        }
        else if (!re.test(email)) {
            console.log("Email sai định dạng", false);
            err = 5;
            errorshow = "Email sai định dạng";
            cleanerr();
            seterremail(errorshow);
            isValidate = false
        }
        else if (!reg.test(phonenumber)) {
            console.log("số điện thoại không hợp lệ", false);
            err = 6;
            errorshow = "số điện thoại không hợp lệ";
            cleanerr();
            seterrphonenumber(errorshow);
            isValidate = false
        }
        else if (phonenumber.length < 10) {
            console.log("Số điện thoại không hợp lệ", false);
            err = 6;
            errorshow = "Số điện thoại không hợp lệ";
            cleanerr();
            seterrphonenumber(errorshow);
            isValidate = false
        }
        else isValidate = true
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
    // const handlerChangeSelect = (event) => {
    //     setrole(event);
    // }

    const handleSubmit = (e) => {
        console.log("press");
        validate();
        e.preventDefault();
        if (isValidate === false) {
            e.preventDefault();
        }
        else {
            successcleanerr();
            console.log(fullName + "  " + userName + "  " + password + "  " + email + "  " + phonenumber + "  " + role);
            // onSignUp();
            // alert("Đăng ký thành công!");
            conductSignUp();
            e.preventDefault();
        }
    }

    return (
        <div className="containerLogin">
            <div className="login-form">
                <form onSubmit={handleSubmit}>
                    <div className="login-title">Đăng ký tài khoản</div>
                    <div className="input-container">
                        <label className="login-title-input">Họ và tên </label>
                        <input type="text" name="fullName" value={fullName}
                            onChange={(e) => { handleFullNameChange(e) }} />
                        <div className="error-font">{errfullName}</div>
                    </div>

                    <div className="input-container">
                        <label className="login-title-input">Tên đăng nhập </label>
                        <input type="text" name="userName" value={userName}
                            onChange={(e) => { handleUserNameChange(e) }} />
                        <div className="error-font">{erruserName}</div>
                    </div>

                    <div className="input-container">
                        <label className="login-title-input">Mật khẩu </label>
                        <input type="password" name="password" value={password}
                            onChange={(e) => { handlePasswordChange(e) }} />
                        <div className="error-font">{errpassword}</div>
                    </div>


                    <div className="input-container">
                        <label className="login-title-input">Nhập lại mật khẩu </label>
                        <input type="password" name="confirmpassword" value={confirmpassword}
                            onChange={(e) => { handleConfirmPasswordChange(e) }} />
                        <div className="error-font">{errconfirmpassword}</div>
                    </div>


                    <div className="input-container">
                        <label className="login-title-input">Email </label>
                        <input type="text" name="email" value={email}
                            onChange={(e) => { handleEmailChange(e) }} />
                        <div className="error-font">{erremail}</div>
                    </div>


                    <div className="input-container">
                        <label className="login-title-input">Số điện thoại </label>
                        <input type="text" name="phonenumber" value={phonenumber}
                            onChange={(e) => { handlePhoneNumberChange(e) }} />
                        <div className="error-font">{errphonenumber}</div>
                    </div>

                    <div className="combobox-signup">
                        <label className="login-title-input">Đối tượng sử dụng  </label>
                        <select
                            onChange={(e) => {
                                const select = e.target.value;
                                setrole(select);
                            }}>
                            <option value="0">Người dùng ứng dụng</option>
                            <option value="2">Nhà quản lý dịch vụ</option>

                        </select>
                    </div>

                    <div className="button-container">
                        <button className="SignButton" type="submit">
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
