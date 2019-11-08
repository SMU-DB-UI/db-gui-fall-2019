/**A simple node/express server that include communication with a 
 * mysql db instance. 
*/

//create main objects

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const cors = require('cors');
const { log, ExpressAPILogMiddleware } = require('@rama41222/node-logger');
const mysql = require('mysql');

//create the mysql connection object.  
var connPool = mysql.createPool({
  connectionLimit: 100,
  host: 'db',
  port: '3306',
  user: 'user',
  password: 'password',
  database: 'db'
});

//set up some configs for express. 
const config = {
  name: 'sample-express-app',
  port: 3000,
  host: '0.0.0.0',
};

//create the express.js object
const app = express();

//create a logger object.  Using logger is preferable to simply writing to the console. 
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

app.use(employee);
app.use(report);
app.use(account);

/**     REQUEST HANDLERS        */

//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});
