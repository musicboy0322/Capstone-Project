const mysql = require('mysql');
require('dotenv').config();

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connect.connect(err => {
    if(err){
        console.log(err);
    } 
});   

var sql = 'show tables';

const data = connect.query(sql, (err, result) => {
    if(err) {
        console.log(err);
    } else{
        console.log(result);
    }
});


module.exports = data;
