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
                alert("X???y ra l???i, vui l??ng th??? l???i sau");
                return;
            }
            alert(response.message);
        }).catch((error) => {
            alert("X???y ra l???i, vui l??ng th??? l???i sau");
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

            console.log("T??n kh??ng ???????c ????? tr???ng", false);
            err = 1;
            errorshow = "T??n kh??ng ???????c ????? tr???ng";
            cleanerr();
            seterrfullName(errorshow);
            isValidate = false
        }
        else if (reg.test(fullName)) {
            console.log("H??? v?? t??n kh??ng h???p l???", false);
            err = 1;
            errorshow = "H??? v?? t??n kh??ng h???p l???";
            cleanerr();
            seterrfullName(errorshow);
            isValidate = false
        }
        else if (userName.length === 0) {
            console.log("T??n ????ng nh???p kh??ng ???????c ????? tr???ng", false);
            err = 2;
            errorshow = "T??n ????ng nh???p kh??ng ???????c ????? tr???ng";
            cleanerr();
            seterruserName(errorshow);
            isValidate = false
        } else if (userName.length < 7) {
            console.log("T??n ????ng nh???p ph???i l???n h??n 6 k?? t???", false);
            err = 2
            errorshow = "T??n ????ng nh???p ph???i l???n h??n 6 k?? t???";
            cleanerr();
            seterruserName(errorshow);
            isValidate = false
        }
        else if (userName.includes(" ")) {
            console.log("T??n ????ng nh???p kh??ng ???????c ch???a kho???ng tr???ng", false);
            err = 2;
            errorshow = "T??n ????ng nh???p kh??ng ???????c ch???a kho???ng tr???ng";
            cleanerr();
            seterruserName(errorshow);
            isValidate = false
        }
        else if (password.length === 0) {
            console.log("M???t kh???u kh??ng ???????c ????? tr???ng", false);
            err = 3;
            errorshow = "M???t kh???u kh??ng ???????c ????? tr???ng";
            cleanerr();
            seterrpassword(errorshow);
            isValidate = false
        }

        else if (password.includes(" ")) {
            console.log("m???t kh???u kh??ng ???????c ch???a kho???ng tr???ng", false);
            err = 3;
            errorshow = "m???t kh???u kh??ng ???????c ch???a kho???ng tr???ng";
            cleanerr();
            seterrpassword(errorshow);
            isValidate = false
        }
        else if ((password.trim()).length < 6) {
            console.log("M???t kh???u ph???i t??? 6 k?? t??? tr??? l??n", false);
            err = 3;
            errorshow = "M???t kh???u ph???i t??? 6 k?? t??? tr??? l??n";
            cleanerr();
            seterrpassword(errorshow);
            isValidate = false
        }
        else if (password !== confirmpassword) {
            console.log("Nh???p l???i m???t kh???u kh??ng kh???p", false);
            err = 4;
            errorshow = "Nh???p l???i m???t kh???u kh??ng kh???p";
            cleanerr();
            seterrconfirmpassword(errorshow);
            isValidate = false
        }
        else if (email.length === 0) {
            console.log("Email kh??ng ???????c ????? tr???ng", false);
            err = 5;
            errorshow = "Email kh??ng ???????c ????? tr???ng";
            cleanerr();
            seterremail(errorshow);
            isValidate = false
        }
        else if (!re.test(email)) {
            console.log("Email sai ?????nh d???ng", false);
            err = 5;
            errorshow = "Email sai ?????nh d???ng";
            cleanerr();
            seterremail(errorshow);
            isValidate = false
        }
        else if (!reg.test(phonenumber)) {
            console.log("s??? ??i???n tho???i kh??ng h???p l???", false);
            err = 6;
            errorshow = "s??? ??i???n tho???i kh??ng h???p l???";
            cleanerr();
            seterrphonenumber(errorshow);
            isValidate = false
        }
        else if (phonenumber.length < 10) {
            console.log("S??? ??i???n tho???i kh??ng h???p l???", false);
            err = 6;
            errorshow = "S??? ??i???n tho???i kh??ng h???p l???";
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
            // alert("????ng k?? th??nh c??ng!");
            conductSignUp();
            e.preventDefault();
        }
    }

    return (
        <div className="container">
            <div className="containerLogin">
                <div className="signup-form">
                    <form onSubmit={handleSubmit}>
                        <div className="login-title">????ng k?? t??i kho???n</div>
                        <div className="input-container-signup">
                            <label className="login-title-input">H??? v?? t??n </label>
                            <input type="text" name="fullName" value={fullName} style={{ width: "290px", borderRadius: "15px", padding: "13px" }}
                                onChange={(e) => { handleFullNameChange(e) }} />
                            <div className="error-font">{errfullName}</div>
                        </div>

                        <div className="input-container-signup">
                            <label className="login-title-input">T??n ????ng nh???p </label>
                            <input type="text" name="userName" value={userName} style={{ width: "290px", borderRadius: "15px", padding: "13px" }}
                                onChange={(e) => { handleUserNameChange(e) }} />
                            <div className="error-font">{erruserName}</div>
                        </div>

                        <div className="input-container-signup">
                            <label className="login-title-input">M???t kh???u </label>
                            <input type="password" name="password" value={password} style={{ width: "290px", borderRadius: "15px", padding: "13px" }}
                                onChange={(e) => { handlePasswordChange(e) }} />
                            <div className="error-font">{errpassword}</div>
                        </div>


                        <div className="input-container-signup">
                            <label className="login-title-input">Nh???p l???i m???t kh???u </label>
                            <input type="password" name="confirmpassword" value={confirmpassword} style={{ width: "290px", borderRadius: "15px", padding: "13px" }}
                                onChange={(e) => { handleConfirmPasswordChange(e) }} />
                            <div className="error-font">{errconfirmpassword}</div>
                        </div>


                        <div className="input-container-signup">
                            <label className="login-title-input">Email </label>
                            <input type="text" name="email" value={email} style={{ width: "290px", borderRadius: "15px", padding: "13px" }}
                                onChange={(e) => { handleEmailChange(e) }} />
                            <div className="error-font">{erremail}</div>
                        </div>


                        <div className="input-container-signup">
                            <label className="login-title-input">S??? ??i???n tho???i </label>
                            <input type="text" name="phonenumber" value={phonenumber} style={{ width: "290px", borderRadius: "15px", padding: "13px" }}
                                onChange={(e) => { handlePhoneNumberChange(e) }} />
                            <div className="error-font">{errphonenumber}</div>
                        </div>



                        <div className="button-container-signup" style={{ paddingTop: "13px", paddingLeft: "53px" }}>
                            <button className="SignButton" type="submit" style={{ borderRadius: "6px", width: "200px", }}>
                                ????ng k?? t??i kho???n
                            </button>
                        </div>

                        <div className="signUpSentense" style={{ paddingLeft: "35px" }}>
                            <a href="$" >???? c?? t??i kho???n? ????ng nh???p</a>
                        </div>
                    </form>

                </div >

            </div >
        </div>

    );
}

export default SignUp;
