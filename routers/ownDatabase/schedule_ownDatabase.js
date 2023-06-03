const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const connect = require('../../database_connecting');

router.get("/",function(req,res){
    var room = [];

    // len
    connect.connect_own.query('select count(房號) from 手術資料 where 房號 != ""', (err, result) => {

        let len = result[0]['count(房號)'];
        
        //room
        connect.connect_own.query(`select 房號 from 手術資料 where 房號 != '' order by 房號`, (err, result) => {
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
           connect.connect_own.query(`select 名字 from 使用者帳號 where ID = ${global.ID}`, (err, result) => {
                username = result[0]['名字'];
                res.render('operation_schedule_page', {room: room, username: username});
           });
        });
    });    
    
});

router.post("/",encoder,function(req,res){
    let date = req.body.date;
    let dateSplit = date.split('-');
    taiwanYear = parseInt(dateSplit[0])-1911;
    global.taiwanDate;
    taiwanDate = taiwanYear.toString() + dateSplit[1] + dateSplit[2];
    
    res.redirect('/schedule/operation');
    res.end();
});

module.exports = router;