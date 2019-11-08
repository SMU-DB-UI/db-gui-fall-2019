

var express = require('express');

var router = express.Router();

var model = require('./employee.model');

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

// Returns a list of all employees
router.get('/employees', function (req, res) {
  connPool.getConnection(function (err, connection) {
    if (err) {
            connection.release();
      logger.error(' Error getting mysql_pool connection: ' + err);
      throw err;
    }

    model.getEmployees(connection, logger, function(err, data) {
      if (err) {
        res.status(500);
        res.send(H1 + 'Employee Access Error' + H1end);
      }
      else {
        res.json(data);
      }
    })
  });
});
  
router.get('/employees/:empId', (req, res) => {
  if (!req.session.active) {
    res.json({message: 'not logged in'});
    return;
  }
  connPool.getConnection(function (err, connection) {
    if (err) {
            connection.release();
      logger.error(' Error getting mysql_pool connection: ' + err);
      throw err;
    }

    model.getEmployee(connection, logger, req.params.empId, function (profile) {
      res.json(JSON.stringify(profile));

    });
  });
});
  
  //Returns contact info of a given employee- does not need perms to get this
  router.get('/employees/:empId/profile', (req, res) => {
    
    connPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        logger.error(' Error getting mysql_pool connection: ' + err);
        throw err;
      }
  
      model.getContactInfo(connection, logger, req.params.empId, function(contactinfo) {
        res.json(JSON.stringify(contactinfo));
  
      });
    });
  });
  
  //Allows updating contact info of a given employee- must be logged in to do this
  router.put('/employees/:empId/profile', (req, res) => {
    if (!req.session.active) {
      res.json({message: 'not logged in'});
      return;
    }
    
    connPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        logger.error(' Error getting mysql_pool connection: ' + err);
        throw err;
      }
  
      model.updateContactInfo(connection, logger, req.params.empId, req.body, function(operationSuccess) {
        res.json(operationSuccess);
  
      });
    });
  });

// Remove employee from database
router.delete('/employees/:empId', (req, res) => {
    if (!req.session.active) {
      res.json({message: 'not logged in'});
      return;
    }
    connPool.getConnection(function (err, connection) {
      if (err) {
        connection.release();
        logger.error(' Error getting mysql_pool connection: ' + err);
        throw err;
      }
  
      model.removeEmployee(connection, logger, req.params.empId, function (succeed) {
        if (succeed) {
          res.json(`Successfully removed employee! (ID: ${req.params.empId})`);
        }
        else {
          res.json(`Problem removing employee ${req.params.empId}.`);
        }
      });
    });
  });

// Updates the manager of an employee
router.put('/employees/:empId/profile/manager', (req, res) => {
    if (!req.session.active) {
      res.json({message: 'not logged in'});
      return;
    }
    connPool.getConnection(function (err, connection) {
      if (err) {
              connection.release();
        logger.error(' Error getting mysql_pool connection: ' + err);
        throw err;
      }
  
      model.setManager(connection, req.params.empId, req.body.managerId, function (succeed) {
        if (succeed) {
          res.json({status: true});
        }
        else {
          res.json({status: false});
        }
      })
    });
  });

module.exports = router;
