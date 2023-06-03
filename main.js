const express = require('express');
const app = express();
const initial = require('./routers/initial');

const schedule = require('./routers/schedule');
const operation = require('./routers/operation');
const data = require('./routers/data');
const opavg = require('./routers/operationInfo');

require('events').EventEmitter.prototype._maxListeners = 100;

app.set('view engine', 'ejs');

app.use('/assets', express.static('assets'));

app.use('/', initial);
app.use('/schedule', schedule);
app.use('/schedule/operation', operation);
app.use('/schedule/operation/data', data);
app.use('/schedule/operation/operationInfo', opavg);

app.listen(3000);