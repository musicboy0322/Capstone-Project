const express = require('express');
const app = express();
const fs = require('fs');
const mysql = require('mysql')
require('dotenv').config();

app.use('/', (req, res) => {
    fs.readFile('./first.html', (err, data) => {
        res.end(data);
    });
});

const connect = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    port: process.env.DB_PORT
});

connect.connect(err => {
    console.log(err);
});   

var sql = 'select * from 醫生';

connect.query(sql, (err, result) => {
    if(err) {
        console.log(err);
    } else{
        console.log(result);
    }
});

app.listen(3000);