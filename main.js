const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql')

app.use('/', (req, res) => {
    fs.readFile('./first.html', (err, data) => {
        res.end(data);
    });
});

const connect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456789',
    database: 'operation_data',
    port: 3306
});

connect.connect(err => {
    console.log(err);
});

var sql = 'show tables';

connect.query(sql, (err, result) => {
    if(err) {
        console.log(err);
    } else{
        console.log(result);
    }
}) 

app.listen(3000);