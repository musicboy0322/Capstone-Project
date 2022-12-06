const express = require('express');
const app = express();
const fs = require('fs');
const gather_data = require('./database_connecting');


app.use('/', (req, res) => {
    fs.readFile('./operation_schedule_page.html', (err, data) => {
        res.end(data);
    });
});

app.listen(3000);