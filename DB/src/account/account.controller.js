
var express = require('express');
var model = require('./account.model');
var conn = require('../helpers/connections');
var logger = require('../helpers/logger');

var router = express.Router();

router.get('/', (req, res) => {
  res.status(200).send('Go to localhost:3000/setupdb first.');
});
  
router.post('/register', async (req, res) => {
  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.register(connection, req.body);
  if (response.message == 'fail') {
    res.status(400).json({message: "Something went wrong"});
    return;
  }
  else if (response.message == 'account exists') {
    res.json({message: 'This account already exists'});
  }
  else {
    res.json(response);
  }
});
  
router.get('/login', async (req, res) => {
  if (req.session.active) {
    res.json({message: 'already logged in'});
    return;
  }

  let {connection, message} = await conn.getConnection(res);
  if (message == 'fail') return;

  let response = await model.login(connection, req.body);
  console.log(response)
  if (response.message == 'succeed') {
    req.session.active = true;
    req.session.auth = response.id
    if(response.pos == "HR Manager"){
      req.session.hrm = true;
    }
    else{
      req.session.hrm = false;
    }
    res.json(response);
  }
  else {
    res.status(400).json({message: 'Username or password is incorrect'});
  }
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
