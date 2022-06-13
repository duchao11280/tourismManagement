const mysql = require('mysql');

const dbConn = mysql.createPool({
    host: process.env.HOST_DB,
    user: process.env.USER_DB,
    password: process.env.PASS_DB,
    port: process.env.PORT_DB,
    database: process.env.NAME_DB,
    connectionLimit: 5,
});



module.exports = dbConn;