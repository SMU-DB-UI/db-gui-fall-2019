/**A simple node/express server that include communication with a 
 * mysql db instance. 
*/

//create main objects

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql2/promise');

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

var employee  = require('./employee/employee.controller');
var report    = require('./report/report.controller');
var account   = require('./account/account.controller');
var perfreviews = require('./perf_reviews/perf_reviews.controller');

app.use(employee);
app.use(report);
app.use(account);
app.use(perfreviews);

/**     REQUEST HANDLERS        */

//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
