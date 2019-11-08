
var express = require('express');
var model = require('./account.model');
const mysql = require('mysql');

var router = express.Router();

//create the mysql connection object.  
var connPool = mysql.createPool({
  connectionLimit: 100,
  host: 'db',
  port: '3306',
  user: 'user',
  password: 'password',
  database: 'db'
});

//GET /
router.get('/', (req, res) => {
    res.status(200).send('Go to localhost:3000/setupdb first.');
  });
  
router.post('/register', (req, res) => {
  connPool.getConnection(function (err, connection) {
    if (err) {
            connection.release();
      logger.error(' Error getting mysql_pool connection: ' + err);
      throw err;
    }

    model.register(connection, logger, req.body, function (message) {
      if (message.message == 'fail') {
        res.status(400).json({message: "Something went wrong"});
        return;
      }
      else if (message.message == 'account exists') {
        res.json({message: 'This account already exists'});
      }
      else {
        res.json(message);
      }
    });
  });
});
  
router.get('/login', (req, res) => {
  if (req.session.active) {
    res.json({message: 'already logged in'});
    return;
  }
  connPool.getConnection(function (err, connection) {
    model.login(connection, logger, req.body, function (message) {
      if (message.message == 'succeed') {
        req.session.active = true;
        res.json(message);
      }
      else {
        res.status(400).json({message: 'Username or password is incorrect'});
      }
    });
  });
});
  
router.get('/logout', (req, res) => {
  if (req.session.active) {
    req.session.destroy();
    res.json({message: 'succeed'});
  }
  else {
    res.json({message: 'Not logged in'});
  }
});

module.exports = router;
