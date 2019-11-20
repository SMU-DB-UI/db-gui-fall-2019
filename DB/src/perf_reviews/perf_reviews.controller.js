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
router.post('/employees/:empId/profile/performance_reviews', async (req, res) => {

    if (notLoggedIn(req, res)) return;

    let {connection, message} = await conn.getConnection(res);
    if (message == 'fail') return;

    let response = await model.postNewPerfRev(connection, req.params.empId, req.body);
    res.json(response);

});

//now gets only the employee that is currently logged in if it matches the one that is requested 
//could also be amended if (or is manager) once we have that
router.get('/employees/:empId/profile/performance_reviews', async (req, res) => {

  if (notLoggedIn(req,res)) return;
  console.log("id: req.session.auth")
  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let perf_rev = await model.seeAllPerfRevs(connection, req.params.empId, req.session.auth);
  res.json(perf_rev);
});

router.delete('/employees/:empId/profile/performance_reviews/:perf_id', async (req, res) => {

  if (notLoggedIn(req,res)) return;
  
  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.deletePerfRev(connection, req.params.empId, req.params.perf_id);
  res.json(response);
})

//allows a manager to see all performance reviews for any employee under him/her
router.get('/employees/manager_perf_reviews', async (req,res) => {
  if (notLoggedIn(req,res)) return;

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let manager_perf_rev = await model.seeAllPerfRevsManager(connection, req.session.auth);
  res.json(manager_perf_rev);
})


module.exports = router;