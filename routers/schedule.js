const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const connect = require('../database_connecting');

router.get("/",function(req,res){
    var room = [];

    // len
    connect.connect_hospital.query('select count(OR_ROOM_NO_2) from PTOR where OR_ROOM_NO_2 != ""', (err, result) => {

        let len = result[0]['count(OR_ROOM_NO_2)'];
        
        //room
        connect.connect_hospital.query(`select OR_ROOM_NO_2 from PTOR where OR_ROOM_NO_2 != '' order by OR_ROOM_NO_2`, (err, result) => {
            if(err) {
                console.log(err);
            } else {
                for(let i =0; i < len; i++) {
                    roomNumber = room.includes(result[i]['OR_ROOM_NO_2']);
                    if(roomNumber == false) {
                        room.push(result[i]['OR_ROOM_NO_2']);
                    }
                }
            };
            room.pop();
            
           //username
            connect.connect_own.query(`select 名字, 控台人員 from 使用者帳號 where ID = ${global.ID}`, (err, result) => {
                username = result[0]['名字'];
                permission = result[0]['控台人員'];
                res.render('operation_schedule_page', {room: room, username: username});
            });
        });
    });    
    
});

router.post("/",encoder,function(req,res){
    global.date;
    date = req.body.date;
    let dateSplit = date.split('-');
    taiwanYear = parseInt(dateSplit[0])-1911;
    global.taiwanDate;
    taiwanDate = taiwanYear.toString() + dateSplit[1] + dateSplit[2];
    
    res.redirect('/schedule/operation');
    res.end();
});

module.exports = router;