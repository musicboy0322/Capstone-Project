const express = require('express');
const router = express.Router();
const connection = require('../database_connecting');
const splitData = require('../content_change');

router.get("/", function(req, res) {

    let doctorName = [];
    let department = [];
    let patientName = [];
    
   //operation data
   connection.connect_own.query(`select * from 手術資料 where 手術日期 = ${global.taiwanDate} and 開刀預估時間 != '0' and 房號 != '' and 房號 != 'DR'`, (err, result) => {
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
        let operationData = result;
        
        for(let h = 0; h < totalOperation; h++) {

            //doctor name
            connection.connect_own.query(`select 醫生姓名 from 醫生 where 醫生編號 = ${operationData[h]['醫生編號']}`, (err, result) => {
                doctorName.push(result[0]['醫生姓名']);
                //department
                connection.connect_own.query(`select 科別名稱 from 科別 where 科別代碼 = ${operationData[h]['手術科別']}`, (err, result) => {
                    department.push(result[0]['科別名稱']);

                    //patient name
                    connection.connect_own.query(`select 病患姓名 from 病患 where 病歷號 = ${operationData[h]['病歷號']}` , (err, result) => {
                        patientName.push(result[0]['病患姓名']);

                        if(h+1 == totalOperation) {
                            
                            let data = splitData.splitData(operationData, totalOperation);

                            res.json( 
                                {bed: data.bed, operationRoom: data.operationRoom,estimateTime: data.estimateTime,anaYesNo: data.anaYesNo,
                                operationName: data.operationName, chart: data.chart, operationKind: data.operationKind,time: data.time,
                                operationAgain: data.operationAgain, estimateStartTime: data.estimateStartTime, fastingDate: data.fastingDate,
                                fastingTime: data.fastingTime, anaKind: data.anaKind, diagnosisCode: data.diagnosisCode,
                                diagnosisName: data.diagnosisName,operationCode: data.operationCode,doctorName:doctorName,
                                department: department, patientName: patientName,totalOperation: totalOperation,
                                urgentOperation: urgentOperation, reserveOperation: reserveOperation, taiwanDate: global.taiwanDate}
                            );

                        }
                    });
                });
            });
        }
    });
});

module.exports = router;