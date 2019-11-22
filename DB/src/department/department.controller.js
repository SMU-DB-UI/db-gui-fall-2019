var express = require('express');
var model = require('./department.model');
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

router.get('/departments/:deptId/performance', async (req, res) => {
  if (notLoggedIn(req, res)) return;
  
  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.getDeptPerf(connection, req.params.deptId);
  res.json(response);
});

router.get('/departments/performance', async (req, res) => {
  if (notLoggedIn(req, res)) return;
  
  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.getDeptPerf(connection, -1);
  res.json(response);
});

module.exports = router;