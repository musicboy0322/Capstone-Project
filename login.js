//記得要改排程畫面的名稱
const mysql = require("mysql"); 
const express = require("express");
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();

const app = express();
app.use("/assets",express.static('assets'));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "123456789",
    database: "operation_data"
});

connection.connect(function(error){
    if (error) throw error
    else console.log("connected to the database successfully!")
});

app.get("/",function(req,res){
    res.sendFile(__dirname+ "/sign_in_page.html");
})

app.post("/",encoder,function(req,res){
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from 使用者帳號 where ID = ? and 密碼 = ?",[username,password],function(error,results,fields){
        if (results.length > 0){
            res.redirect("/schedule")
        }else{
            res.redirect("/")
        }
        res.end();
    })
})

app.get("/schedule",function(req,res){
    res.sendFile(__dirname + "/operation_schedule_page.html")
})

app.listen(5000);