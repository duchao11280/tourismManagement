import "./styles.css";
function InputType() {
    return (
        <div>

            <div className="login-form">
                <form>
                    <div className="login-title">Đăng nhập</div>
                    <div className="input-container">
                        <label>Username </label>
                        <input type="text" name="uname" required />
                    </div>


                    <div className="input-container">
                        <label>Password </label>
                        <input type="password" name="pass" required />
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

export default InputType;
