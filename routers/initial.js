const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const connection = require('../database_connecting');

router.get("/",function(req,res){
    res.sendFile('C:/Users/nick/Desktop/IndependentStudy/sign_in_page.html');
});

router.post("/",encoder,function(req,res){
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

module.exports = router;