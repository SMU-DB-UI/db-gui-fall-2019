var express = require('express');
var model = require('./perf_reviews.model');
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

//Must be logged in to add a new performance review to an employee
router.post('/employees/:empId/profile/performance_reviews'), async (req, res) => {

    if (notLoggedIn(req, res)) return;

    let {connection, message} = await conn.getConnection(res);
    if (message == 'fail') return;

    let response = model.postNewPerfRev(connection, req.params.empId, req.body);
    res.json(response);

}


module.exports = router;