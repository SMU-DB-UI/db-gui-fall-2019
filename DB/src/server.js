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

// //Attempting to connect to the database.
// connection.connect(function (err) {
//   if (err)
//     logger.error("Cannot connect to DB!");
//   logger.info("Connected to the DB!");
// });

/**     REQUEST HANDLERS        */

//GET /
app.get('/', (req, res) => {
  res.status(200).send('Go to localhost:3000/setupdb first.');
});

// Returns a list of all employees
app.get('/employees', (req, res) => {
  connPool.getConnection(function (err, connection) {
    if (err) {
			connection.release();
      logger.error(' Error getting mysql_pool connection: ' + err);
      throw err;
    }

    func.getEmployees(connection, logger, function(err, data) {
      if (err) {
        res.status(500);
        res.send(H1 + 'Employee Access Error' + H1end);
      }
      else {
        sendResp(res, 200, data);
      }
    })
  });
});

app.get('/employees/:empId', (req, res) => {
  if (!req.session.active) {
    notLoggedIn(res);
    return;
  }
  connPool.getConnection(function (err, connection) {
    if (err) {
			connection.release();
      logger.error(' Error getting mysql_pool connection: ' + err);
      throw err;
    }

    func.getEmployee(connection, logger, req.params.empId, function (profile) {
      sendResp(res, 200, JSON.stringify(profile));

    });
  });
});

//Returns contact info of a given employee- does not need perms to get this
app.get('/employees/:empId/profile', (req, res) => {
  
  connPool.getConnection(function (err, connection) {
    if (err) {
      connection.release();
      logger.error(' Error getting mysql_pool connection: ' + err);
      throw err;
    }

    func.getContactInfo(connection, logger, req.params.empId, function(contactinfo) {
      sendResp(res, 200, JSON.stringify(contactinfo));

    });
  });
});

//Allows updating contact info of a given employee- must be logged in to do this
app.put('/employees/:empId/profile', (req, res) => {
  if (!req.session.active) {
    notLoggedIn(res);
    return;
  }
  
  connPool.getConnection(function (err, connection) {
    // if (err) {
    //   connection.release();
    //   logger.error(' Error getting mysql_pool connection: ' + err);
    //   throw err;
    // }

    

    func.updateContactInfo(connection, logger, req.params.empId, req.body, function(operationSuccess) {
      sendResp(res, 200, operationSuccess);

    });
  });
});

// login
app.get('/login', (req, res) => {
  var sess = req.session;
  sess.active = true;
  res.end('done');
});

// Remove employee from database
app.delete('/employees/:empId', (req, res) => {
  if (req.session.active) {
    connPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        logger.error(' Error getting mysql_pool connection: ' + err);
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
    });
  }
  else {
    notLoggedIn(res);
  }
});

app.put('/reports/:repId/close', (req, res) => {
  connPool.getConnection(function (err, connection) {
    if (err) {
			connection.release();
      logger.error(' Error getting mysql_pool connection: ' + err);
      throw err;
    }

    closeReport(connection, logger, req.params.repId, function (succeed) {
      if (succeed) {
        sendResp(res, 200, `Successfully closed report! (ID: ${req.params.repId})`);
      }
      else {
        sendResp(res, 500, `Problem closing report (ID: ${req.params.repId})`);
      }
    });
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
  res.type('json');
  res.status(status);
  res.send(message);
}