
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

async function rateSeverity(connection, repId, score, emp_id) {

  //finds the employee that the report was written by
  let [_by_emp_id] = await connection.query(`SELECT by_emp_id FROM reports WHERE id = ?`, [repId]);

  //find that employee's manager
  let [rows] = await connection.query(`SELECT manager FROM employees WHERE id = ?`, [_by_emp_id[0].by_emp_id] );

  //if the manager (rows[0]/manager) is the correct emp_id for who is allowed to edit this report
  if(rows[0].manager == emp_id){ 
    try {
      await connection.query(`update reports set severity = ${score} where id = ${repId}`);
    }
    catch (e) {
      logger.error(e);
      return {message: 'fail'};
    }
    return {message: 'succeed'};
  }
}

module.exports = {
  getReport,
  closeReport,
  rateSeverity
};

