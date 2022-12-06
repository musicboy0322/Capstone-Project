const express = require('express');
const app = express();
const fs = require('fs');
const connection = require('./database_connecting');
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

app.use('/assets', express.static('assets'));

app.get("/",function(req,res){
    res.sendFile(__dirname + "/sign_in_page.html");
});

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from 使用者帳號 where ID = ? and 密碼 = ?",[username,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/schedule");
        }else{
            res.redirect("/");
        }
        res.end();
    });
    
});

app.get("/schedule",function(req,res){
    res.sendFile(__dirname + "/operation_schedule_page.html");
});

app.post("/schedule",encoder,function(req,res){
    var date = req.body.date;
    console.log(date);
});

app.listen(3000);