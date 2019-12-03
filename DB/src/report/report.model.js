
var logger = require('../helpers/logger');


//get a specific report by its id
async function getReport(connection, repId){
  let rows;
  try {
    [rows] = await connection.query(`select * from reports where id = ${repId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  let response = {'report':
    {
      'id':`${rows[0].id}`,
      'by_emp_id':`${rows[0].by_emp_id}`,
      'for_emp_id':`${rows[0].for_emp_id}`,
      'report':`${rows[0].report}`,
      'creation_date':`${rows[0].creation_date}`,
      'status':`${rows[0].status}`,
      'close_reason':`${rows[0].close_reason}`,
      'severity':`${rows[0].severity}`
    }};

  return{message: 'succeed', response: response};
}


//get all reports in database
async function getReports(connection){
  let rows;
  try {
    //gets all reports in the database
    [rows] = await connection.query(`SELECT * FROM reports`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  var reportList = [];

  for(var i in rows) {
    reportList.push({
      id:            rows[i].id,
      by_emp_id:     rows[i].by_emp_id,
      for_emp_id:    rows[i].for_emp_id,
      report:        rows[i].report,
      creation_date: rows[i].creation_date,
      status:        rows[i].status,
      close_reason:  rows[i].close_reason,
      severity:      rows[i].severity
    });
  }

  return {message: 'succeed', reportCount: reportList.length, reports: reportList};
}

//set a report status to closed
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


//change the severity of a report
async function rateSeverity(connection, repId, score, emp_id) {
  let rows;
  try{
    //finds the employee that the report was written by
    let [_by_emp_id] = await connection.query(`SELECT by_emp_id FROM reports WHERE id = ?`, [repId]);
    //find that employee's manager
    [rows] = await connection.query(`SELECT manager FROM employees WHERE id = ?`, [_by_emp_id[0].by_emp_id] );
  }catch(e){
    logger.error(e);
    return{message: 'fail'};
  }
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

async function getComments(connection, repId) {
  var rows;
  try {
    [rows] = await connection.query(`SELECT comments FROM reports WHERE id = ?`, [repId]);
  }
  catch (e){
    logger.error(e);
    return {message: 'fail'};
  }
  //logger.info(rows[0].comments);
  //return rows[0].comments;
  return {message: 'succeed', comments: rows[0].comments};

}

//gets all the reports related to employees under a cretain manager
async function getReportsManager(connection, manager){
  let rows;
  try {
    //gets all reports that are by or about any employee under a specific manager
    [rows] = await connection.query(`SELECT * FROM reports WHERE by_emp_id OR for_emp_id IN (SELECT DISTINCT id FROM employees WHERE manager = ${manager})`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  var reportList = [];

  for(var i in rows) {
    reportList.push({
      id:            rows[i].id,
      by_emp_id:     rows[i].by_emp_id,
      for_emp_id:    rows[i].for_emp_id,
      report:        rows[i].report,
      creation_date: rows[i].creation_date,
      status:        rows[i].status,
      close_reason:  rows[i].close_reason,
      severity:      rows[i].severity
    });
  }

  return {message: 'succeed', reportCount: reportList.length, reports: reportList};
}


//get the profiles of all employees involved in a report
async function getEmpProfile(connection, rep_id){
  let rows;
  try {
    [rows] = await connection.query(`SELECT DISTINCT employees.id, fname, lname, dep_id, manager, addr, email, phn_num, rating 
                                        FROM reports INNER JOIN employees ON by_emp_id = employees.id OR for_emp_id = employees.id WHERE reports.id = ${rep_id};`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  var profileList = [];

  for(var i in rows) {
    profileList.push({
      fname:    rows[i].fname, 
      lname:    rows[i].lname, 
      dep_id:   rows[i].dep_id,
      manager:  rows[i].manager,                   
      addr:     rows[i].addr, 
      phn_num:  rows[i].phn_num, 
      rating:   rows[i].rating
    });
  }
  return {message: 'succeed', profileCount: profileList.length, profiles: profileList};
}

module.exports = {
  getReport,
  getReports,
  closeReport,
  rateSeverity,
  getComments,
  getReportsManager,
  getEmpProfile
};
