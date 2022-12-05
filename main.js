const express = require('express');
const app = express();
const fs = require('fs');
const data = require('./database_connecting');


app.use('/', (req, res) => {
    fs.readFile('./first.html', (err, data) => {
        res.end(data);
    });
});

data

app.listen(3000);