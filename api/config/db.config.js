const mysql = require('mysql');

const dbConn = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    port: '3306',
    database: 'tourismManagement',
    connectionLimit:5,
});



module.exports = dbConn;