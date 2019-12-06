
const logger = require('../helpers/logger');

// Function that queries and returns a list of all employees
async function getEmployees(connection) {
  let rows;
  try {
    [rows] = await connection.query(`select * from employees`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }
  var empList = [];
  
  for (var i in rows) {

    //when we create an employee, assign a value of -1 please!!
    if(rows[i].rating == -1 | rows[i].rating == null){ //employee doesn't have a rating yet
      [avg] = await connection.query(`SELECT AVG(score) AS s FROM perf_reviews WHERE (emp_id = ${rows[i].id} AND active = 'true')`);
      connection.query(`UPDATE employees SET rating = ${avg[0].s} WHERE id = ${rows[i].id}`);
    }

    empList.push({
      id:       rows[i].id,
      fname:    rows[i].fname, 
      lname:    rows[i].lname, 
      dep_id:   rows[i].dep_id,                   
      addr:     rows[i].addr, 
      phn_num:  rows[i].phn_num, 
      rating:   rows[i].rating
    });
  }
  return {message: 'succeed', employeeCount: empList.length, employees: empList};
}

async function addEmployee(connection, empDetails) {
  try {
    await connection.query(`INSERT INTO employees VALUES (null, '${empDetails.fname}', 
    '${empDetails.lname}', ${empDetails.dep_id}, '${empDetails.pos}', 
    '${empDetails.manager}', '${empDetails.addr}', '${empDetails.email}', 
    ${empDetails.phn_num}, -1, 0, null, null, null, 'true', 0)`)
  }
  catch(e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }

  return {message: 'succeed'};
}

async function removeEmployee(connection, empId) {
  try {
    await connection.query(`update employees set active = 'false' where id = ${empId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  return {message: 'succeed'};
}

async function setManager(connection, empId, managerId) {
  try {
    await connection.query(`update employees set manager = ${managerId} where id = ${empId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  return {message: 'succeed'};
}

async function addStrike(connection, employeeID) {
  try {
    await connection.query(`UPDATE employees SET strikes = strikes +1 WHERE id = ?`, [employeeID]);
  }
  catch (e) {
    logger.error(e);
    return {message: 'failed'};
  }

  return {message: 'succeed'};
}

async function getContactInfo(connection, empId) {
  let rows;
  try {
    [rows] = await connection.query(`SELECT * FROM employees WHERE id = ${empId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  // Formatted as JSON
  contactInfo = {'contactinfo': 
  {
    'fname':`${rows[0].fname}`,
    'lname':`${rows[0].lname}`,
    'address':`${rows[0].addr}`,
    'phone':`${rows[0].phn_num}`,
  }};

  return {message: 'succeed', contactinfo: contactInfo};
}

async function updateContactInfo(connection, empId, body) {
  try {
    await connection.query(`UPDATE employees SET 
      fname = '${body.fname}', 
      lname = '${body.lname}', 
      addr = '${body.address}', 
      phn_num = '${body.phn_num}' 
      WHERE id = ${empId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  return {message: 'succeed'};
}

// Gets an employee's profile selected by id passed in
async function getEmployee(connection, empId, is_HRM, userId) {
  let rows;
  try {
    [rows] = await connection.query(`select * from employees where id = ${empId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  if(rows[0].rating == -1 | rows[0].rating == null){ //employee doesn't have a rating yet
    [avg] = await connection.query(`SELECT AVG(score) AS s FROM perf_reviews WHERE (emp_id = ${rows[0].id} AND active = 'true')`);
    connection.query(`UPDATE employees SET rating = ${avg[0].s} WHERE id = ${rows[0].id}`);
}
  //Check if the person trying to view own information
  if(empId == userId){
    var profile = {'profile':
      {
        'id':`${rows[0].id}`,
        'fname':`${rows[0].fname}`,
        'lname':`${rows[0].lname}`,
        'dep_id':`${rows[0].dep_id}`,
        'position':`${rows[0].pos}`,
        'manager':`${rows[0].manager}`,
        'address':`${rows[0].addr}`,
        'phone':`${rows[0].phn_num}`,
        'rating':`${rows[0].rating}`,
        'strikes':`${rows[0].strikes}`,
        'active':`${rows[0].active}`
      }};
  }
   //Check if the person trying to view the inforamtion is an HR Manager or not 
  else if((rows[0].confidential == 1) && (is_HRM == false)){
    //Employee want to be confidential so only name will be shown
    var profile = {'profile':
    {
      'fname':`${rows[0].fname}`,
      'lname':`${rows[0].lname}`,
      'dep_id':'confidential',
      'position':'confidential',
      'manager':'confidential', 
      'address':'confidential',
      'phone':'confidential',
      'rating':'confidential',  
      'strikes':'confidential',
      'active':'confidential'
    }};
  }
  else{
  // Formatted as JSON
    var profile = {'profile':
      {
        'id':`${rows[0].id}`,
        'fname':`${rows[0].fname}`,
        'lname':`${rows[0].lname}`,
        'dep_id':`${rows[0].dep_id}`,
        'position':`${rows[0].pos}`,
        'manager':`${rows[0].manager}`,
        'address':`${rows[0].addr}`,
        'phone':`${rows[0].phn_num}`,
        'rating':`${rows[0].rating}`,
        'strikes':`${rows[0].strikes}`,
        'active':`${rows[0].active}`
      }};
  }
 return {message: 'succeed', profile: profile};         
}

async function reportHistory(connection, empId) {
  let rows;
  try {
    [rows] = await connection.query(`select * from reports where by_emp_id = ${empId} OR for_emp_id = ${empId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  return {message: 'succeed', reportHistory: rows};
}

//Creates a report for an employee
async function createReport(connection, body, by_Employee) {
  logger.info(body.for_emp_id);
  let rows;
  [rows] = await connection.query(`SELECT manager FROM employees WHERE id = ?`, [body.for_emp_id]);
  
  let today = new Date();
  let dd = String(today.getDate()).padStart(2, '0');
  let mm = String(today.getMonth() + 1).padStart(2, '0');
  let yyyy = String(today.getFullYear());
  let fullDate = `${mm}/${dd}/${yyyy}`;

  try {
    let tuple = {by_emp_id: by_Employee, for_emp_id: body.for_emp_id, report: body.report_body, creation_date: fullDate, status: 'open', severity: body.severity};
    await connection.query(`INSERT INTO reports SET ?`, tuple);

  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }
  return {message: 'succeed'};
}

async function searchEmployees(connection, query) {
  let terms = query.split(' ');
  let queries = [];
  for (i in terms)
    queries[i] = `%\\${terms[i]}%`;
  let rows;
  try {
    if (queries.length == 1) {
      [rows] = await connection.query(`SELECT id, fname, lname, dep_id, pos, manager, 
        addr, email, phn_num, rating, strikes
        FROM employees WHERE fname LIKE ? OR lname LIKE ?`, [queries[0], queries[0]]);
    }
    else {
      [rows] = await connection.query(`SELECT id, fname, lname, dep_id, pos, manager, 
        addr, email, phn_num, rating, strikes
        FROM employees WHERE 
        fname LIKE ? OR fname LIKE ? OR 
        lname LIKE ? OR lname LIKE ?`, [queries[0], queries[1], queries[0], queries[1]]);
    }
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }
    return {message: 'succeed', employees: rows};
}

async function getEmploymentHistory(connection, empId) {
  let rows;
  try {
    [rows] = await connection.query(`SELECT * FROM employment_history WHERE id = ?`, [empId]);
  }
  catch (err) {
    logger.error(err.stack);
    return {message: 'fail'};
  }

  return {message: 'succeed', history: rows};
}

async function changePosition(connection, empId, position) {
  try {
    await connection.query(`UPDATE employees SET pos = ? WHERE id = ?`, [position, empId]);

    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = String(today.getFullYear());
    let fullDate = `${mm}/${dd}/${yyyy}`;

    await connection.query(`INSERT INTO employment_history SET ?`, 
      {id: empId, position: position, start_date: fullDate});
  }
  catch (err) {
    logger.error(err.stack);
    return {message: 'fail'};
  }

  return {message: 'succeed'};
}

async function makeConfidential(connection, userID, empId) {
  
  try {
    //Check that userID's postion is Human Resources
    var rows;
    [rows] = await connection.query(`SELECT * FROM employees WHERE id = ?`, [userID]);
    logger.info(userID);
    let position = rows[0].pos;

    if(position != "HR Manager"){
      return {message: 'fail'};
    }
  }
  catch (err) {
    logger.error(err.stack);
    return {message: 'fail'};
  }
  
  try {
    await connection.query(`UPDATE employees SET confidential = ? WHERE id = ?`, [1, empId]);
  }
  catch (err) {
    logger.error(err.stack);
    return {message: 'fail'};
  }

  return {message: 'succeed'};
} 

async function getManagers(connection) {
  let rows;
  try {
    [rows] = await connection.query(`SELECT emp1.fname, emp1.lname, emp1.id as id FROM employees as emp1
      INNER JOIN employees as emp2 ON emp1.id = emp2.manager GROUP BY emp1.id`);
  }
  catch (err) {
    logger.error(err.stack);
    return {message: 'db access error'};
  }

  return {message: 'succeed', managers: rows};
}

module.exports = {
  getEmployees,
  getEmployee,
  addEmployee,
  removeEmployee,
  getContactInfo,
  updateContactInfo,
  setManager,
  reportHistory,
  addStrike,
  createReport,
  searchEmployees,
  getEmploymentHistory,
  changePosition,
  makeConfidential,
  getManagers
};