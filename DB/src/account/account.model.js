const crypto = require('crypto');

const logger = require('../helpers/logger');

async function register(connection, {email, username, password}) {
  let rows;
  try {
    [rows] = await connection.query(`select * from employees where username = '${username}'`);
  }
  catch (e) {
    if (e == undefined) logger.info('yes for some reason');
    logger.error(e.stack);
    return {message: 'fail'};
  }
    
  if (rows[0] != undefined) {
    return {message: 'account exists'};
  }
  
  salt = crypto.randomBytes(16).toString('hex');
  hash = hashPassword(password, salt);
  try {
    await connection.query(`update employees set username = '${username}', 
      password = '${hash}', salt = '${salt}' where email = '${email}'`);
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }
  
  return {message: 'succeed'};
}

async function login(connection, {username, password}) {
  let rows;
  try {
    [rows] = await connection.query(`select * from employees where username = '${username}'`);
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }

  if (rows[0] == undefined || rows[0].password == undefined) {
    return {message: 'fail'};
  }
  
  hash = hashPassword(password, rows[0].salt);
  if (hash == rows[0].password) {
    return {message: 'succeed', id: rows[0].id, pos: rows[0].pos, hr_manager: (rows[0].pos == "HR Manager" ? 1 : 0)};
  }
  else {
    return {message: 'fail'};
  }
}

module.exports = {
  register,
  login
}

function hashPassword(password, salt) {
  hash = crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('hex');
  return hash;
}
