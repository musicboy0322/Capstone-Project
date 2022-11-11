const express = require('express');
const app = express();
const fs = require('fs');

app.use('/', (req, res) => {
    fs.readFile('./first.html', (err, data) => {
        res.end(data);
    });
});

app.listen(3000);