const mysql = require('mysql');
const {period_change, operation_type_change, return_or_not_change, ana_kind_change} = require('./content_change');
require('dotenv').config();

const connect_main = mysql.createConnection({
    host: process.env.DB_HOST_MAIN,
    user: process.env.DB_USER_MAIN,
    password: process.env.DB_PASSWORD_MAIN,
    database: process.env.DB_DATABASE_MAIN,
    port: process.env.DB_PORT_MAIN
});

const connect_other = mysql.createConnection({
    host: process.env.DB_HOST_OTHER,
    user: process.env.DB_USER_OTHER,
    password: process.env.DB_PASSWORD_OTHER,
    database: process.env.DB_DATABASE_OTHER,
    port: process.env.DB_PORT_OTHER
})

connect_main.connect(err => {
    if(err){
        console.log(err);
    } 
});   

connect_other.connect(err => {
    if(err){
        console.log(err);
    } 
});   

/*
let number = '1111101';
let cols = ['OR_DATE', 'CHART_NO', 'OR_DUPLICATE_NO', 'VS_NO', 'OR_ROOM_NO_2', 'BED_NO', 'OR_APN', 'EXPECT_OR_START_TIME', 'OR_TYPE_2',
                'RETURN_FLAG', 'AN_CLASS_2', 'NPO_DATE', 'NPO_TIME', 'DIAGNOSIS_CODE', 'DIAGNOSIS_ENGLISH_NAME'];

let need_data = [];

let sql = `select ${cols} from ptor where OR_DATE = ${number} and OR_ROOM_NO_2 != '';`;

let table_count = `select COUNT(OR_DATE) from ptor where OR_DATE = ${number} and OR_ROOM_NO_2 != ''`;

let gather_data = connect_other.query(table_count, (err, result) => {
    if(err) {
        console.log(err);
    } else {
        let count = result[0]['COUNT(OR_DATE)'];
        
        connect_other.query(sql, (err, result) => {
            if(err) {
                console.log(err);
            } else{
                for(let j = 0; j <= count; j++) {
                    for(let i = 0; i <= cols.length; i++) {
                        need_data.push(result[j][cols[i]]);
                        console.log(need_data);
                    }

                    need_data = [];
                }
                
              }    
        });
    }
});


const data = connect_other.query(sql, (err, result) => {
    if(err) {
        console.log(err);
    } else{
        for(let i = 0; i <= cols.length; i++) {
            console.log(result[0][cols[i]]);
        }
        
    }
});
*/

module.exports = connect_main;

