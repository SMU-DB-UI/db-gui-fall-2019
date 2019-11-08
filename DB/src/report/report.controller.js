

var express = require('express');
var model = require('./report.model');

var router = express.Router();

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

router.put('/reports/:repId/close', (req, res) => {
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

    model.closeReport(connection, logger, req.params.repId, req.body.reason, function (succeed) {
      logger.info(req.body.reason);
      if (succeed) {
          res.json(`Successfully closed report! (ID: ${req.params.repId})`);
      }
      else {
          res.json(`Problem closing report (ID: ${req.params.repId})`);
      }
    });
  });
});
  
router.get('/reports/:repId', (req,res) => {
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

    model.getReport(connection, logger, req.params.repId, function(profile) {
      res.json({repId: profile.id, 
                          byEmpId: profile.by_emp_id, 
                          forEmpId: profile.for_emp_id, 
                          report: profile.report, 
                          creationDate: profile.creation_date, 
                          status: profile.status, 
                          severity: profile.severity});
    });
  });
});

module.exports = router;
