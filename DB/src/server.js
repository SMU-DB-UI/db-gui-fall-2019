//create main objects

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql2/promise');
const path = require('path');
const fs = require('fs');

//set up some configs for express. 
const config = {
  name: 'HR-express',
  port: 3000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

const logger = log({ console: true, file: false, label: config.name });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {
  extended: true
}));
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));
app.use(session({secret: 'secretstuff'}));

let employee    = require('./employee/employee.controller');
let report      = require('./report/report.controller');
let account     = require('./account/account.controller');
let perfreviews = require('./perf_reviews/perf_reviews.controller');
let department  = require('./department/department.controller');

function redirectInvalid(req, res) {
  res.send('<h1>404 Not Found</h1>');
}

//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

app.use(employee);
app.use(report);
app.use(account);
app.use(perfreviews);
app.use(department);

app.get('/google01db65e86f161597.html', (req, res) => {
  let htmlPath = path.join(__dirname, 'google01db65e86f161597.html');
  let file = fs.readFileSync(htmlPath, 'utf8');
  res.type('html').send(file);
});

// app.use(redirectInvalid);