const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const connection = require('../database_connecting');
const changeData = require('../content_change');

const needPtor = 'OR_DATE, CHART_NO, OR_TYPE_2, OR_APN, OR_ROOM_NO, BED_NO, DIV_NO, EXPECT_OR_START_TIME, EXPECT_OR_END_TIME, OR_IN_WAIT_TIME, OR_IN_TIME, AN_START_TIME, AN_END_TIME, OR_OUT_TIME';
const needPtordrev = 'OR_NAME, OR_DIV_NO, OR_DOCTOR_NO';

router.post('/',encoder,(req, res) => {
    let month = req.body.month;
    let avgYear = month.split('-')[0];
    avgYear = (avgYear - 1911).toString();
    let avgMonth = month.split('-')[1].toString();

    //ptor 
    //don't need translate
    let or_date = [];
    let chart_no = [];
    let or_room_no = [];
    let bed_no = [];
    let div_no = [];

    //need translate
    let or_type_2 = [];
    let or_apn = [];
    let expect_or_start_time = [];
    let expect_or_end_time = [];
    let or_in_wait_time = [];
    let or_in_time = [];
    let an_start_time = [];
    let an_end_time = [];
    let or_out_time = [];
    
    //need calculate
    let overtime_yes_no = [];
    let timeout = [];
    let duration = [];
    let actual_duration = [];

    //ptordrev
    //don't need translate
    let or_name = [];
    let or_div_no = [];
    let or_doctor_no = [];

    connection.connect_hospital.query(`select ${needPtor} from ptor where OR_DATE LIKE '${avgYear+avgMonth}%' and OR_ROOM_NO != '' and OR_ROOM_NO != 'DR' and OR_ROOM_NO != "7F" and OR_ROOM_NO != "C1" and OR_ROOM_NO != "C2" and OR_ROOM_NO != "ES" and OR_ROOM_NO != "G1" and OR_ROOM_NO != "G2" and OR_DUPLICATE_NO != '1' and EXPECT_OR_START_TIME != '0'`, (err,result) => {

        //ptor
        //don't need translate
        for(let i = 0; i < result.length; i++) {
            or_date.push(result[i]['OR_DATE']);
        }

        for(let i = 0; i < result.length; i++) {
            chart_no.push(result[i]['CHART_NO']);
        }

        for(let i = 0; i < result.length; i++) {
            or_room_no.push(result[i]['OR_ROOM_NO']);
        }

        for(let i = 0; i < result.length; i++) {
            bed_no.push(result[i]['BED_NO']);
        }

        for(let i = 0; i < result.length; i++) {
            div_no.push(result[i]['DIV_NO']);
        }

        //need translate
        for(let i = 0; i < result.length; i++) {
            or_type_2.push(result[i]['OR_TYPE_2']);
        }
        or_type_2 = changeData.or_type_2_change(or_type_2);

        for(let i = 0; i < result.length; i++) {
            or_apn.push(result[i]['OR_APN']);
        }
        or_apn = changeData.or_apn_change(or_apn);

        for(let i = 0; i < result.length; i++) {
            expect_or_start_time.push(result[i]['EXPECT_OR_START_TIME']);
        }
        expect_or_start_time = changeData.time_change(expect_or_start_time);

        for(let i = 0; i < result.length; i++) {
            expect_or_end_time.push(result[i]['EXPECT_OR_END_TIME']);
        }
        expect_or_end_time = changeData.time_change(expect_or_end_time);

        for(let i = 0; i < result.length; i++) {
            or_in_wait_time.push(result[i]['OR_IN_WAIT_TIME']);
        }
        or_in_wait_time = changeData.time_change(or_in_wait_time);

        for(let i = 0; i < result.length; i++) {
            or_in_time.push(result[i]['OR_IN_TIME']);
        }
        or_in_time = changeData.time_change(or_in_time);

        for(let i = 0; i < result.length; i++) {
            an_start_time.push(result[i]['AN_START_TIME']);
        }
        an_start_time = changeData.time_change(an_start_time);

        for(let i = 0; i < result.length; i++) {
            an_end_time.push(result[i]['AN_END_TIME']);
        }
        an_end_time = changeData.time_change(an_end_time);

        for(let i = 0; i < result.length; i++) {
            or_out_time.push(result[i]['OR_OUT_TIME']);
        }
        or_out_time = changeData.time_change(or_out_time);

        //need calculate
        for(let i = 0; i < result.length; i++) {
            let actual = new Date( month + '-01' + 'T' + or_in_time[i]);
            let expect = new Date( month + '-01' + 'T' + expect_or_start_time[i]);
            if(actual > expect) {
                overtime_yes_no.push('是');
            } else {
                overtime_yes_no.push('否');
            }
        }

        for(let i = 0; i < result.length; i++) {
            let actual = new Date( month + '-01' + 'T' + or_in_time[i]);
            let expect = new Date( month + '-01' + 'T' + expect_or_start_time[i]);
            let time = (actual - expect) / 1000 / 60;
            if(time > 0 ) {
                timeout.push(time);
            } else {
                timeout.push('無');
            }
        }
        
        for(let i = 0; i < result.length; i++) {
            let start = new Date(month + '-01' + 'T' + expect_or_start_time[i]);
            let end = new Date(month + '-01' + 'T' + expect_or_end_time[i]);
            let time = (end - start) / 1000 / 60;
            duration.push(time);
        }

        for(let i = 0; i < result.length; i++) {
            let start = new Date(month + '-01' + 'T' + or_in_time[i]);
            let end = new Date(month + '-01' + 'T' + or_out_time[i]);
            let time = (end - start) / 1000 / 60;
            actual_duration.push(time);
        }

        connection.connect_hospital.query(`select ${needPtordrev} from ptordrev where OR_DATE LIKE '${avgYear+avgMonth}%'`, (err,result) => {
            
            for(let i = 0; i < result.length; i++) {
                or_name.push(result[i]['OR_NAME']);
            }

            for(let i = 0; i < result.length; i++) {
                or_div_no.push(result[i]['OR_DIV_NO']);
            }
    
            for(let i = 0; i < result.length; i++) {
                or_doctor_no.push(result[i]['OR_DOCTOR_NO']);
            }

            res.json({
                or_date: or_date, chart_no: chart_no,  or_name:  or_name, or_type_2: or_type_2, or_apn: or_apn, or_room_no: or_room_no, bed_no: bed_no, div_no: div_no, 
                or_div_no: or_div_no, or_doctor_no: or_doctor_no, expect_or_start_time: expect_or_start_time, or_in_wait_time: or_in_wait_time, or_in_time: or_in_time, an_start_time: an_start_time,
                an_end_time: an_end_time, or_out_time: or_out_time, overtime_yes_no: overtime_yes_no, timeout: timeout, duration: duration,actual_duration: actual_duration
            });

        });
        
    }); 



    

    
});

module.exports = router;

