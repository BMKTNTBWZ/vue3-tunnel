const mysql = require('mysql')
const mysqlObj = {
    host: "localhost",
    user: "root",
    password: "",
    database: "tunnel"
}


const pool = mysql.createPool(mysqlObj);

function SQLconnect(sql, arr, callback) {
    pool.getConnection((err, connection) => {
        if (err) {
            console.log(err);
            return;
        }
        connection.query(sql, arr, (err, result) => {
            // 释放连接
            connection.release();
            if (err) {
                console.log(err);
                return;
            }
            callback(result)
        })
    })
}
module.exports = SQLconnect