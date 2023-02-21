const mysql = require('mysql');
require('dotenv').config();

const connect_own = mysql.createConnection({
    host: process.env.DB_HOST_OWN,
    user: process.env.DB_USER_OWN,
    password: process.env.DB_PASSWORD_OWN,
    database: process.env.DB_DATABASE_oWN,
    port: process.env.DB_PORT_OWN
});

const connect_hospital = mysql.createConnection({
    host: process.env.DB_HOST_HOSPITAL,
    user: process.env.DB_USER_HOSPITAL,
    password: process.env.DB_PASSWORD_HOSPITAL,
    database: process.env.DB_DATABASE_HOSPITAL,
    port: process.env.DB_PORT_HOSPITAL
})

connect_own.connect(err => {
    if(err){
        console.log(err);
    } 
});   

connect_hospital.connect(err => {
    if(err){
        console.log(err);
    } 
});   

module.exports = {connect_own, connect_hospital};

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


