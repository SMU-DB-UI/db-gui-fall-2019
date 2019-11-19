

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

router.put('/reports/:repId/close', async (req, res) => {
  if (notLoggedIn(req, res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.closeReport(connection, req.params.repId, req.body.reason);
  res.json(response);
});
  
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
});

router.put('/reports/:repId/severity_score/:empId', async (req,res) => {
 
  if (notLoggedIn(req, res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.rateSeverity(connection, req.params.repId, req.body.score, req.params.empId);
  res.json(response);
});

router.get('/reports/:repId/comments', async (req,res) => {
  //if(notLoggedIn(req, res)) return;

  let{connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.getComments(connection, req.params.repId);
  res.json(response);
});

module.exports = router;
