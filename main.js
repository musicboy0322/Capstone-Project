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

    // len
    connection.query('select count(房號) from 手術資料 where 房號 != ""', (err, result) => {

        let len = result[0]['count(房號)'];
        
        //room
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
            
           //username
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
    let time = 60;

    //len
    connection.query('select count(房號) from 手術資料 where 房號 != ""', (err, result) => {

        let len = result[0]['count(房號)'];
        
        //room
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

           //user name
           connection.query(`select 名字 from 使用者帳號 where ID = ${global.ID}`, (err, result) => {
                let username = result[0]['名字'];

                //operation data
                connection.query(`select * from 手術資料 where 手術日期 = ${taiwanDate} and 開刀預估時間 != '0' and 房號 != ''`, (err, result) => {
                    let totalOperation = result.length;
                    let urgentOperation = 0;
                    let reserveOperation = 0;
                    for(let k = 0; k < totalOperation; k++) {
                        if(result[k]['手術別'] == '緊急手術') {
                            urgentOperation += 1;
                        } else if(result[k]['手術別'] == '預約手術') {
                            reserveOperation += 1;
                        }
                    }
                    let operationData = result[2];

                    //doctor name
                    connection.query(`select 醫生姓名 from 醫生 where 醫生編號 = ${operationData['醫生編號']}`, (err, result) => {
                        let doctorName = result[0]['醫生姓名'];
                        
                        //department
                        connection.query(`select 科別名稱 from 科別 where 科別代碼 = ${operationData['手術科別']}`, (err, result) => {
                            let department = result[0]['科別名稱'];

                            //patient name
                            connection.query(`select 病患姓名 from 病患 where 病歷號 = ${operationData['病歷號']}` , (err, result) => {
                                let patientName = result[0]['病患姓名'];
                                for(let q = 0; q < 61; q--) {
                                    if(time < 0) {
                                        res.redirect('back');
                                    } else {
                                        res.render('has_operation_schedule_page', {room: room, username: username, operationData: operationData, 
                                            doctorName:doctorName, department: department, patientName: patientName, totalOperation: totalOperation,
                                            urgentOperation: urgentOperation, reserveOperation: reserveOperation, time: time});
                                    }
                                    time--;
                                }
                                
                            });
                        });
                    });
                    
                });
               
           })
        });
    });    
});

app.post("/schedule/operation",encoder,function(req,res){
    let date = req.body.date;
    let dateSplit = date.split('-');
    taiwanYear = parseInt(dateSplit[0])-1911;
    global.taiwanDate;
    taiwanDate = taiwanYear.toString() + dateSplit[1] + dateSplit[2];
    
    res.redirect('/schedule/operation');
    res.end();
});

app.listen(3000);