const express = require('express');
const router = express.Router();
const bodyParser = require("body-parser");
const encoder = bodyParser.urlencoded();
const connection = require('../database_connecting');
const changeData = require('../content_change');

const needPtor = 'OR_IN_TIME, OR_OUT_TIME';
const needPtordrev = 'OR_DATE, CHART_NO, OR_DOCTOR_NO, OR_CODE';

router.post('/', encoder, (req, respond) => {
    let month = req.body.month;
    let avgYear = month.split('-')[0];
    avgYear = (avgYear - 1911).toString();
    let avgMonth = month.split('-')[1].toString();

    connection.connect_hospital.query(`select ${needPtordrev} from ptordrev where OR_DATE LIKE '${avgYear+avgMonth}%' and OR_DUPLICATE_NO = 0`, (err, result) => {
        let map = new Map();
        let len = result.length;
        for(let i = 0; i < len; i++) {
            let doctor = result[i]['OR_DOCTOR_NO'];
            let operation = result[i]['OR_CODE'];

            connection.connect_hospital.query(`select ${needPtor} from ptor where OR_DATE = '${result[i]['OR_DATE']}' and CHART_NO = '${result[i]['CHART_NO']}' and OR_DUPLICATE_NO = 0`, (err, res) => {
                try {
                    let start = new Date(`${month}-01T${changeData.time_change_single(res[0]['OR_IN_TIME'])}`);
                    let end = new Date(`${month}-01T${changeData.time_change_single(res[0]['OR_OUT_TIME'])}`);
                    let actualDuration = (end - start) / 1000 / 60;
                    
                    //map 中的值有兩個，第一個為刀數，第二個為該手術的平均時間
                    if(map.has(doctor + '-' + operation) == false) {
                        map.set(doctor + '-' + operation, [1, actualDuration]);
                    } else {
                        map.set(doctor + '-' + operation, [map.get(`${doctor + '-' + operation}`)[0] + 1, map.get(`${doctor + '-' + operation}`)[1] + actualDuration]);
                    }

                    if(i + 1 == len) {
                        let doctorArray = [];
                        let operationArray = [];
                        let operationAmountArray = [];
                        let operationAvgTimeArray = [];
                        
                        for(let [key, values] of map.entries()) {
                            doctorArray.push(key.split('-')[0]);
                            operationArray.push(key.split('-')[1]);
                            operationAmountArray.push(values[0]);
                            operationAvgTimeArray.push(Math.round(values[1]/values[0]));
                        }
                        
                        respond.json({
                            doctor: doctorArray, operation: operationArray, operationAmount: operationAmountArray, operationAvgTime:operationAvgTimeArray
                        });
                    }
                } catch(err) {
                }
                
            })

            
        }
    })
})

module.exports = router;