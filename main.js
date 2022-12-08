const express = require('express');
const app = express();
const fs = require('fs');
const connection = require('./database_connecting');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/sign_in_page.html");
});

app.post("/",encoder,function(req,res){
    global.ID;
    ID = req.body.ID;
    var password = req.body.password;

    connection.query("select * from 使用者帳號 where ID = ? and 密碼 = ?",[ID,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/schedule");
        }else{
            res.redirect("/");
        }
        res.end();
    });
    
});



app.get("/schedule",function(req,res){
    var room = [];

    connection.query('select count(房號) from 手術資料 where 房號 != ""', (err, result) => {

        let len = result[0]['count(房號)'];
        
        connection.query(`select 房號 from 手術資料 where 房號 != '' order by 房號`, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                for(let i =0; i < len; i++) {
                    roomNumber = room.includes(result[i]['房號']);
                    if(roomNumber == false) {
                        room.push(result[i]['房號']);
                    }
                }
            };
           room.pop(); 
           connection.query(`select 名字 from 使用者帳號 where ID = ${global.ID}`, (err, result) => {
                username = result[0]['名字'];
                res.render('operation_schedule_page', {room: room, username: username});
           })
        });
    });    
});

app.post("/schedule",encoder,function(req,res){
    let date = req.body.date;
    let dateSplit = date.split('-');
    taiwanYear = parseInt(dateSplit[0])-1911;
    global.taiwanDate;
    taiwanDate = taiwanYear.toString() + dateSplit[1] + dateSplit[2];
    
    res.redirect('/schedule/operation');
    res.end();
});

app.get("/schedule/operation",function(req,res){
    var room = [];

    connection.query('select count(房號) from 手術資料 where 房號 != ""', (err, result) => {

        let len = result[0]['count(房號)'];
        
        connection.query(`select 房號 from 手術資料 where 房號 != '' order by 房號`, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                for(let i =0; i < len; i++) {
                    roomNumber = room.includes(result[i]['房號']);
                    if(roomNumber == false) {
                        room.push(result[i]['房號']);
                    }
                }
            };
           room.pop(); 
           connection.query(`select 名字 from 使用者帳號 where ID = ${global.ID}`, (err, result) => {
                username = result[0]['名字'];
                connection.query(`select * from 手術資料 where 手術日期 = ${taiwanDate}`, (err, result) => {
                    operationData = result;
                    console.log(operationData);
                    res.render('has_operation_schedule_page', {room: room, username: username, operationData: operationData});
                });
               
           })
        });
    });    
});

app.listen(3000);