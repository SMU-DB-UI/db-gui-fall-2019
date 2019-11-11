
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
    empList.push({
      fname:    rows[i].fname, 
      lname:    rows[i].lname, 
      dep_id:   rows[i].dep_id,                   
      addr:     rows[i].addr, 
      phn_num:  rows[i].phn_num, 
      rating:   rows[i].rating
    });
  }
  return {message: 'succeed', employees: empList};
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
async function getEmployee(connection, empId) {
  let rows;
  try {
    [rows] = await connection.query(`select * from employees where id = ${empId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  // Formatted as JSON
  let profile = {'profile':
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

module.exports = {
  getEmployees,
  getEmployee,
  removeEmployee,
  getContactInfo,
  updateContactInfo,
  setManager,
  reportHistory
};