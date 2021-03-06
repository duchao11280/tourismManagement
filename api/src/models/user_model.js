var dbConn = require('../../config/db.config');

var User = function (user) {
    this.userID = user.userID;
    this.userName = user.userName;
    this.password = user.password;
    this.fullName = user.fullName;
    this.email = user.email;
    this.phonenumber = user.phonenumber;
    this.role = user.role;
    this.isDisabled = user.isDisabled;
}

// get all user
User.getAllUsers = (result) => {
    dbConn.query(`Select userID, userName, fullName, email, phonenumber, user.role, role.roleName, isDisabled 
                From user, role Where userName != 'admin' and user.role = role.role`, (err, res) => {
        result(err, res);
    });
}

/**
 * get user by id
 * Profile User
 * @param {} id
 * @param {*} result
 */
User.getUserByID = (id, result) => {
    dbConn.query('Select userName,fullName,email,phonenumber,role' +
        ' From user' +
        ' Where isDisabled != 1 and userID=?', id, (err, res) => {
            result(err, res);
        });
}

/**
 * Update Profile
 * @param {*} id
 * @param {*} userReqData
 * @param {*} result
 */
User.updateUser = (id, userReqData, result) => {
    dbConn.query(`Update user Set  fullName=?,email=?,  phonenumber=? where userID=${id}`,
        [userReqData.fullName, userReqData.email, userReqData.phonenumber], (err, res) => {
            result(err, res);
        }
    );
}

/**
 * Đăng kí
 */
User.insertUser = (userName, password, fullName, email, phonenumber, role, result) => {
    dbConn.query('INSERT into user(userName,password,fullName,email,phonenumber,role,isDisabled)'
        + ' VALUES(?, ?, ?, ?, ?, ?,0) ', [userName, password, fullName,
        email, phonenumber, role], (err2, res2) => {
            result(err2, res2);
        });
}
// search user bằng username
User.getUserByUserName = (userName, result) => {
    dbConn.query('Select *' +
        ' From user' +
        ` Where userName="${userName}"`, (err, res) => {
            result(err, res);
        });

}
/**
 * Change Password
 * @param {*} id
 * @param {*} userReqData
 * @param {*} result
 */
User.changePassword = (id, userReqData, result) => {
    dbConn.query(`Update user Set password=? where userID=${id}`,
        [userReqData.newPassword], (err, res) => {
            result(err, res);
        });
}

User.getPasswordUserByID = (id, result) => {
    dbConn.query('Select password' +
        ' From user' +
        ' Where userID=?', id, (err, res) => {
            result(err, res);
        });
}
// vô hiệu hóa người dùng
User.disableUser = (id, result) => {
    dbConn.query(`Update user Set isDisabled=1 where userID=${id}`, (err, res) => {
        result(err, res);
    });
}
// kích hoạt người dùng
User.enableUser = (id, result) => {
    dbConn.query(`Update user Set isDisabled=0 where userID=${id}`, (err, res) => {
        result(err, res);
    });
}
module.exports = User;