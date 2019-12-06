var express = require('express');
var model = require('./report.model');
var conn = require('../helpers/connections');
var logger = require('../helpers/logger');

var router = express.Router();

function notLoggedIn(req, res) {
  if (!req.session.active) {
    res.json({message: 'not logged in'});
    return true;
  }
  return false;
}


//Update a report to closed
router.put('/reports/:repId/close', async (req, res) => {
//  if (notLoggedIn(req, res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.closeReport(connection, req.params.repId, req.body.reason);
  connection.release();
  res.json(response);
});
  

//Get a specific report by its rep id
router.get('/reports/:repId', async (req,res) => {
  //if (notLoggedIn(req, res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let profile = await model.getReport(connection, req.params.repId);
  res.json({
    repId:        profile.id, 
    byEmpId:      profile.by_emp_id, 
    forEmpId:     profile.for_emp_id, 
    report:       profile.report, 
    creationDate: profile.creation_date, 
    status:       profile.status, 
    severity:     profile.severity
  });
  
  let response = await model.getReport(connection, req.params.repId);
  connection.release();
  res.json(response);
});

//Get all reports in the database
router.get('/reports', async (req,res) => {
//  if (notLoggedIn(req, res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.getReports(connection);
  connection.release();
  res.json(response);
});


//Update the severity score of a specific report
router.put('/reports/:repId/severity_score/:empId', async (req,res) => {
 
//  if (notLoggedIn(req, res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.rateSeverity(connection, req.params.repId, req.body.score, req.params.empId);
  connection.release();
  res.json(response);
});

router.get('/reports/:repId/comments', async (req,res) => {
//  if(notLoggedIn(req, res)) return;

  let{connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.getComments(connection, req.params.repId);
  connection.release();
  res.json(response);
});

//get the reports of all employees under a specific manager
router.get('/reports/manager/:manager', async (req,res) => {
//  if (notLoggedIn(req, res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.getReportsManager(connection, req.params.manager);
  connection.release();
  res.json(response);
});

router.get('/reports/:repId/profiles', async (req,res) => {
//  if (notLoggedIn(req, res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.getEmpProfile(connection, req.params.repId);
  connection.release();
  res.json(response);
});

module.exports = router;
