var logger = require('../helpers/logger');


async function postNewPerfRev(connection, empId, body) {
    try {
      await connection.query(`INSERT INTO perf_reviews (emp_id, review, score, creation_date, active) VALUES
      (${empId}, '${body.review}', ${body.score}, ${body.creation_date}, 'true')`);
    }
    catch (e) {
      logger.error(e);
      return {message: 'fail'};
    }
    
    return {message: 'succeed'};
  }

async function seeAllPerfRevs(connection, empId, loggedInId) {
  try {
    [rows] = await connection.query(`SELECT * FROM perf_reviews WHERE (emp_id = ${empId} AND active = 'true') ORDER BY creation_date`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }
  var revList = [];
  
  for (var i in rows) {
    if (rows[i].emp_id == loggedInId) { 
    revList.push({
      id:             rows[i].id, 
      emp_id:         rows[i].emp_id, 
      review:         rows[i].review,                   
      score:          rows[i].score, 
      creation_date:  rows[i].creation_date,
    })
  }
  };
  if (revList.length == 0) return {message: 'no performance reviews found for this profile, or you are not looking at your own profile'}
  else return {message: 'succeed', reviews: revList};
}

async function deletePerfRev(connection, empId, perfRevId) {
  try {
    await connection.query(`UPDATE perf_reviews SET active = 'false' WHERE (id = ${perfRevId} AND emp_id = ${empId})`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }

  return {message: 'succeed'};
}

async function seeAllPerfRevsManager(connection, managerID) {
  let rows;
  let revList = [];
  try {
    [rows] = await connection.query(`SELECT * FROM perf_reviews 
      INNER JOIN employees ON perf_reviews.emp_id = employees.id 
      WHERE employees.manager = 1
      ORDER BY creation_date`)
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }
  for (var i in rows) {
    if (rows[i].manager == managerID) { 
    revList.push({
      id:             rows[i].id,
      fname:          rows[i].fname,
      lname:          rows[i].lname, 
      emp_id:         rows[i].emp_id, 
      review:         rows[i].review,                   
      score:          rows[i].score, 
      creation_date:  rows[i].creation_date,
    })
  }
}
return {message: 'succeed', reviews: revList};
}
module.exports = {
    //functions that will be used
    postNewPerfRev,
    seeAllPerfRevs,
    deletePerfRev,
    seeAllPerfRevsManager
  };