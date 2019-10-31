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
const func = require('./functions');

// Defined placeholders for easier HTML usage
const H1 = '<h1>';
const H1nl = '<h1 style=\'white-space: pre-line\'>';
const H1end = '</h1>';


//create the mysql connection object.  
var connection = mysql.createConnection({
  //db is the host and that name is assigned based on the 
  //container name given in the docker-compose file
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
app.use(cors());
app.use(ExpressAPILogMiddleware(logger, { request: true }));
app.use(session({secret: 'secretstuff'}));

//Attempting to connect to the database.
connection.connect(function (err) {
  if (err)
    logger.error("Cannot connect to DB!");
  logger.info("Connected to the DB!");
});

/**     REQUEST HANDLERS        */

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to localhost:3000/setupdb first.');
});


//GET /setupdb
app.get('/setupdb', (req, res) => {
  func.setupDB(connection, logger);
  res.status(200).send(H1 + 'Database Created!' + H1end);
});

// Returns a list of all employees
app.get('/employees', (req, res) => {
  func.getEmployees(connection, logger, function(err, data) {
    res.type('text/html');
    if (err) {
      res.status(500);
      res.send(H1 + 'Employee Access Error' + H1end);
    }
    else {
      res.type('text/html');
      logger.info(data[0]);
      resp = H1nl;
      for (i in data) {
        resp = resp + data[i].fname + ' ' + data[i].lname + '\n';
      }
      resp += H1end;
      res.status(200);
      res.send(resp);
    }
  })
});

app.get('/employees/:empId', (req, res) => {
  if (!req.session.active) {
    notLoggedIn(res);
    return;
  }
  func.getEmployee(connection, logger, req.params.empId, function (profile) {
    sendResp(res, 200, `Name: ${profile.fname} ${profile.lname}`);
  });
});

// Returns a specific row
app.get('/rows/:rowId', (req, res) => {
  connection.query(`select * from data2 where id = ?`, [req.params.rowId], function (err, rows, fields) {
    if (err)
      logger.error('Error while executing query');
    
    logger.info(req.params.rowId);
    logger.info(rows[0].name + ' ' + rows[0].id);

    res.type('text/html');
    res.status(200);
    resp = '<h1>' + rows[0].id + ' ' + rows[0].name + '</h1>';
    res.send(resp);
  });
});

app.get('/login', (req, res) => {
  var sess = req.session;
  sess.active = true;
  res.end('done');
});

app.get('/test', (req, res) => {
  if (req.session.active) {
    sendResp(res, 200, 'Hello!');
  }
  else {
    sendResp(res, 403, 'Access Denied!');
  }
});

// Remove employee from database
app.delete('/employees/:empId', (req, res) => {
  if (req.session.active) {
    func.removeEmployee(connection, logger, req.params.empId, function (succeed) {
      if (succeed) {
        sendResp(res, 200, `Successfully removed employee! (ID: ${req.params.empId})`);
      }
      else {
        sendResp(res, 500, `Problem removing employee ${req.params.empId}.`);
      }
    });
  }
  else {
    notLoggedIn(res);
  }
});

app.put('/reports/:repId/close', (req, res) => {
  closeReport(connection, logger, req.params.repId, function (succeed) {
    if (succeed) {
      sendResp(res, 200, `Successfully closed report! (ID: ${req.params.repId})`);
    }
    else {
      sendResp(res, 500, `Problem closing report (ID: ${req.params.repId})`);
    }
  });
});

//connecting the express object to listen on a particular port as defined in the config object. 
app.listen(config.port, config.host, (e) => {
  if (e) {
    throw new Error('Internal Server Error');
  }
  logger.info(`${config.name} running on ${config.host}:${config.port}`);
});

function notLoggedIn(res) {
  res.type('text/html');
  res.status(403);
  res.send('<h1>You must be logged in!</h1>');
}

function sendResp(res, status, message) {
  res.type('text/html');
  res.status(status);
  res.send(H1 + message + H1end);
}