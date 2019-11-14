
var logger = require('../helpers/logger');

async function getReport(connection, repId){
  let rows;
  try {
    [rows] = await connection.query(`select * from reports where id = ${repId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  return rows[0];
}

async function closeReport(connection, repId, reason) {
  try {
    await connection.query(`update reports set status = 'closed', close_reason = '${reason}' where id = ${repId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }
  
  return {message: 'succeed'};
}

module.exports = {
  getReport,
  closeReport
};