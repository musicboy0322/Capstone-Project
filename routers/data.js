const express = require('express');
const router = express.Router();
const connection = require('../database_connecting');
const changeData = require('../content_change');

const needDataPtor = 'OR_DATE, CHART_NO, OR_DUPLICATE_NO, VS_NO, OR_ROOM_NO, BED_NO, OR_APN, EXPECT_OR_START_TIME, EXPECT_OR_END_TIME, OR_IN_TIME, OR_OUT_TIME, OR_TYPE_2, RETURN_FLAG, AN_CLASS, NPO_DATE, NPO_TIME, DIAGNOSIS_CODE, DIAGNOSIS_ENGLISH_NAME';
const needDataPtordrev = 'OR_CODE, OR_NAME, OR_DIV_NO, OR_DOCTOR_NO';

router.get("/",function(req,res){

    //hospital database
    //PTOR
    //don't need translate
    var chart_no = [];
    var vs_no = [];
    var or_room_no = [];
    var bed_no = [];
    var diagnosis_code = [];
    var diagnosis_english_name = [];

    //need translate
    var or_apn = [];
    var expect_or_start_time = [];
    var expect_or_end_time = [];
    var or_in_time = [];
    var or_out_time = [];
    var or_type_2 = [];
    var return_flag = [];
    var an_class_2 = [];
    var npo_date = [];
    var npo_time = [];

    //need calculate
    var duration = [];
    var ana_yes_no = [];

    //PTORDREV
    var or_code = [];
    var or_name = [];
    var or_div_no = [];

    //own database
    var patient_name = [];
    var department_name = [];
    var doctor_name = [];

    //operation data
    connection.connect_hospital.query(`select ${needDataPtor} from PTOR where OR_DATE = ${global.taiwanDate} and OR_ROOM_NO != '' and OR_ROOM_NO != 'DR' and OR_ROOM_NO != "7F" and OR_ROOM_NO != "C1" and OR_ROOM_NO != "C2" and OR_ROOM_NO != "ES" and OR_ROOM_NO != "G1" and OR_ROOM_NO != "G2" and OR_DUPLICATE_NO != '1' and EXPECT_OR_START_TIME != '0'`, (err, result) => {
        let totalOperation = result.length;
        let urgentOperation = 0;
        let reserveOperation = 0;

        //don't need translate
        for(let j = 0; j < totalOperation; j++) {
            chart_no.push(result[j]['CHART_NO']);
        }

        for(let j = 0; j < totalOperation; j++) {
            vs_no.push(result[j]['VS_NO']);
        }

        for(let j = 0; j < totalOperation; j++) {
            or_room_no.push(result[j]['OR_ROOM_NO']);
        }

        for(let j = 0; j < totalOperation; j++) {
            bed_no.push(result[j]['BED_NO']);
        }

        for(let j = 0; j < totalOperation; j++) {
            diagnosis_code.push(result[j]['DIAGNOSIS_CODE']);
        }

        for(let j = 0; j < totalOperation; j++) {
            diagnosis_english_name.push(result[j]['DIAGNOSIS_ENGLISH_NAME']);
        }

        //need translate
        for(let j = 0; j < totalOperation; j++) {
            or_apn.push(result[j]['OR_APN']);
        }
        new_or_apn = changeData.or_apn_change(or_apn);

        for(let j = 0; j < totalOperation; j++) {
            expect_or_start_time.push(result[j]['EXPECT_OR_START_TIME']);
        }
        new_expect_or_start_time = changeData.time_change(expect_or_start_time);

        for(let j = 0; j < totalOperation; j++) {
            expect_or_end_time.push(result[j]['EXPECT_OR_END_TIME']);
        }
        new_expect_or_end_time = changeData.time_change(expect_or_end_time);

        for(let j = 0; j < totalOperation; j++) {
            or_in_time.push(result[j]['OR_IN_TIME']);
        }
        new_or_in_time = changeData.time_change(or_in_time);

        for(let j = 0; j < totalOperation; j++) {
            or_out_time.push(result[j]['OR_OUT_TIME']);
        }
        new_or_out_time = changeData.time_change(or_out_time);

        for(let j = 0; j < totalOperation; j++) {
            or_type_2.push(result[j]['OR_TYPE_2']);
        }
        new_or_type_2 = changeData.or_type_2_change(or_type_2) 

        for(let j = 0; j < totalOperation; j++) {
            return_flag.push(result[j]['RETURN_FLAG']);
        }
        new_return_flag = changeData.return_flag_change(return_flag);

        for(let j = 0; j < totalOperation; j++) {
            an_class_2.push(result[j]['AN_CLASS_2']);
        }
        new_an_class_2 = changeData.an_class_2_change(an_class_2);

        for(let j = 0; j < totalOperation; j++) {
            npo_date.push(result[j]['NPO_DATE']);
        }
        new_npo_date = changeData.date_change(npo_date);

        for(let j = 0; j < totalOperation; j++) {
            npo_time.push(result[j]['NPO_TIME']);
        }
        new_npo_time = changeData.time_change(npo_time);

        //need calculate
        for(let j = 0; j < totalOperation; j++) {
            let start = new Date(date + 'T' + new_expect_or_start_time[j]);
            let end = new Date(date + 'T' + expect_or_end_time[j]);
            let time = (end - start) / 1000 / 60;
            duration.push(time);
        }

        for(let j = 0; j < totalOperation; j++) {
            if(an_class_2[j] != null) {
                ana_yes_no.push('是');
            } else {
                ana_yes_no.push('否');
            }
        }

        for(let k = 0; k < totalOperation; k++) {
            if(or_type_2[k] == '緊急手術') {
                urgentOperation += 1;
            } else if(or_type_2[k] == '預約手術') {
                reserveOperation += 1;
            }
        }

        for(let j = 0; j < totalOperation; j++) {
            connection.connect_own.query(`select 病患姓名 from 病患 where 病歷號 = ${chart_no[j]}`, (err, result) => {
                patient_name.push(result[0]['病患姓名']);

                connection.connect_hospital.query(`select ${needDataPtordrev} from PTORDREV where CHART_NO = ${chart_no[j]} and OR_DUPLICATE_NO = '0'`, (err, result) => {
                    or_code.push(result[0]['OR_CODE']);
                    or_name.push(result[0]['OR_NAME']);
                    or_div_no.push(result[0]['OR_DIV_NO']);

                    connection.connect_own.query(`select 科別名稱 from 科別 where 科別代碼 = ${or_div_no[j]}`, (err, result) => {
                        department_name.push(result[0]['科別名稱']);

                        connection.connect_own.query(`select 醫生姓名 from 醫生 where 醫生編號 = ${vs_no[j]}`, (err, result) => {
                            doctor_name.push(result[0]['醫生姓名']);

                            if(j + 1 == totalOperation) {
                                console.log('sucessful');
                                res.json({
                                    taiwanDate: global.taiwanDate, chart_no: chart_no, or_code: or_code,or_name: or_name, or_room_no: or_room_no,
                                    bed_no: bed_no, or_apn: new_or_apn, expect_or_start_time: new_expect_or_start_time,duration: duration,
                                    or_type_2: new_or_type_2, return_flag: new_return_flag,  an_class_2: new_an_class_2, npo_date: new_npo_date,
                                    npo_time: new_npo_time, diagnosis_code: diagnosis_code, diagnosis_english_name: diagnosis_english_name,
                                    doctor_name:doctor_name,department_name: department_name, patient_name: patient_name, totalOperation: totalOperation,
                                    urgentOperation: urgentOperation, reserveOperation: reserveOperation, ana_yes_no: ana_yes_no,or_in_time: new_or_in_time,
                                    or_out_time: new_or_out_time
                                });
                            }
                        })
                    })
                });
            })
        }
    });    
});

module.exports = router;