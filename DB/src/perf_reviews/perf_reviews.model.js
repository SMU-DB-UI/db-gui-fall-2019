var logger = require('../helpers/logger');


async function postNewPerfRev(connection, empId, body, manager_id) {
  let rows;
  try {
    [rows] = await connection.query(`SELECT * FROM employees WHERE id = ?`, [parseInt(empId)]);
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'db access error'};
  }

  if (rows[0].manager != manager_id) {
    return {message: 'not the manager for this employee'};
  }

  logger.info('emp id: ' + empId);
  logger.info('manager id: ' + manager_id);
  logger.info('score: ' + body.score);
  logger.info('body: ' + JSON.stringify(body))

  try {
    await connection.query(`INSERT INTO perf_reviews VALUES
    (null, ${empId}, ${manager_id}, '${body.review}', ${body.score}, '${body.creation_date}', 'open')`);
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }
  
  return {message: 'succeed'};
}

async function seeAllPerfRevs(connection, empId, loggedInId) {
  try {
    [rows] = await connection.query(`SELECT * FROM perf_reviews WHERE emp_id = ${empId} AND active = 'open' 
      ORDER BY STR_TO_DATE(creation_date, "%c/%d/%Y") DESC`);
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }
  var revList = [];
  
  logger.info(JSON.stringify(rows[0]));

  for (var i in rows) {
    revList.push({
      id:             rows[i].id, 
      emp_id:         rows[i].emp_id,
      by_emp_id:      rows[i].manager_id,
      review:         rows[i].review,                   
      score:          rows[i].score, 
      creation_date:  rows[i].creation_date
    });
  };
  if (revList.length == 0) return {message: 'no performance reviews found for this profile'}
  else return {message: 'succeed', reviews: revList};
}

async function getPerfScore(connection, empId) {
  try {
    [avg] = await connection.query(`SELECT AVG(score) FROM perf_reviews WHERE emp_id = ${empId} AND active = 'true'`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }
 
  return {message: 'succeed', score: avg};
}


//Sets a performance review as "inactive", or deleted.
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
      ORDER BY creation_date`);
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

async function checkAllPerfReviews(connection) {
  try {
    [rows] = await connection.query(`SELECT * FROM perf_reviews`);
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }

  return {message: 'succeed', data: rows};

}

async function averageScore(connection, empId) {
  let rows;
  try {
    [rows] = await connection.query(`SELECT AVG(score) as avg_score FROM perf_reviews WHERE emp_id = ${empId}`);
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }

  return {message: 'succeed', average: rows[0].avg_score};
}

module.exports = {
    //functions that will be used
    postNewPerfRev,
    seeAllPerfRevs,
    deletePerfRev,
    seeAllPerfRevsManager,
    getPerfScore,
    checkAllPerfReviews,
    averageScore
  };