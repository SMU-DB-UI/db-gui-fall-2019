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
const func = require('./functions');

// Defined placeholders for easier HTML usage
const H1 = '<h1>';
const H1nl = '<h1 style=\'white-space: pre-line\'>';
const H1end = '</h1>';

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

/**     REQUEST HANDLERS        */

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to localhost:3000/setupdb first.');
});

// Returns a list of all employees
app.get('/employees', (req, res) => {
  getEmployees(req, res);
});

app.get('/employees/:empId', (req, res) => {
  getEmployee(req, res);
});

app.get('/login', (req, res) => {
  login(req, res);
});

app.post('/register', (req, res) => {
  register(req, res);
});

// Remove employee from database
app.delete('/employees/:empId', (req, res) => {
  removeEmployee(req, res);
});

app.put('/reports/:repId/close', (req, res) => {
  closeReport(req, res);
});

// Updates the manager of an employee
app.put('/employees/:empId/profile/manager', (req, res) => {
  updateManger(req, res);
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
  res.type('json');
  res.status(status);
  res.send(message);
}

async function login(req, res) {
  if (req.session.active) {
    res.json({message: 'already logged in'});
  }

  let connection;
  try {
    connection = await connPool.getConnection();
  }
  catch (err) {
    throw err;
  }

  func.login(connection, logger, req.body, function (user) {
    if (user.message == 'succeed') {
      req.session.active = true;
    }
    user ? res.json(user) : res.status(400).json({message: 'Username or password is incorrect'});
  });
}

async function register(req, res) {
  let connection;
  try {
    connection = await connPool.getConnection();
  }
  catch (err) {
    throw err;
  }

  func.register(connection, logger, req.body, function (message) {
    if (message.message == 'fail') {
      res.status(400).json({message: "Something went wrong"});
      return;
    }
    else if (message.message == 'account exists') {
      res.json({message: 'This account already exists'});
    }
    res.json(message);
  });
}

async function getEmployee(req, res) {
  if (!req.session.active) {
    notLoggedIn(res);
    return;
  }
  let connection;
  try {
    connection = await connPool.getConnection();
  }
  catch (err) {
    throw err;
  }

  func.getEmployee(connection, logger, req.params.empId, function (message, profile) {
    if (message == 'fail') {
      res.status(400).json(message);
      return;
    }
    sendResp(res, 200, JSON.stringify(profile));
  });
}

async function getEmployees(req, res) {
  let connection;
  try {
    connection = await connPool.getConnection();
  }
  catch (err) {
    throw err;
  }

  func.getEmployees(connection, logger, function(message, data) {
    if (message.message == 'fail') {
      res.status(500);
      res.send(H1 + 'Employee Access Error' + H1end);
    }
    else {
      sendResp(res, 200, data);
    }
  });
}

async function closeReport(req, res) {
  if (!req.session.active) {
    notLoggedIn(res);
    return;
  }
  let connection;
  try {
    connection = await connPool.getConnection();
  }
  catch (err) {
    throw err;
  }

  func.closeReport(connection, logger, req.params.repId, req.body.reason, function (succeed) {
    logger.info(req.body.reason);
    if (succeed) {
      sendResp(res, 200, `Successfully closed report! (ID: ${req.params.repId})`);
    }
    else {
      sendResp(res, 500, `Problem closing report (ID: ${req.params.repId})`);
    }
  });
}

async function updateManger(req, res) {
  if (!req.session.active) {
    notLoggedIn(res);
    return;
  }
  let connection;
  try {
    connection = await connPool.getConnection();
  }
  catch (err) {
    throw err;
  }

  func.setManager(connection, req.params.empId, req.body.managerId, function (succeed) {
    if (succeed) {
      sendResp(res, 200, {status: true});
    }
    else {
      sendResp(res, 500, {status: false});
    }
  });
}

async function removeEmployee(req, res) {
  if (!req.session.active) {
    notLoggedIn(res);
    return;
  }
  let connection;
  try {
    connection = await connPool.getConnection();
  }
  catch (err) {
    throw err;
  }

  func.removeEmployee(connection, logger, req.params.empId, function (succeed) {
    if (succeed) {
      sendResp(res, 200, `Successfully removed employee! (ID: ${req.params.empId})`);
    }
    else {
      sendResp(res, 500, `Problem removing employee ${req.params.empId}.`);
    }
  });
}
