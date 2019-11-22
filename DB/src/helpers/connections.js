
const mysql = require('mysql2/promise');

const logger = require('./logger');

//create the mysql connection object.  
var connPool = mysql.createPool({
  connectionLimit: 100,
  host: 'database',
  port: '3306',
  user: 'user',
  password: 'password',
  database: 'HR_Database'
});

async function getConnection(res) {
  let connection;
  try {
    connection = await connPool.getConnection();
  }
  catch (e) {
    logger.error(e.code);
    res.status(500).json({message: 'Something went wrong'});
    return {message: 'fail'};
  }
  return {connection, message: 'succeed'};
}

module.exports = {
  getConnection
};