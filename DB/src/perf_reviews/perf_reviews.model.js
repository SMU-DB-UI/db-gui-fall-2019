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

async function seeAllPerfRevs(connection, empId) {
  try {
    [rows] = await connection.query(`SELECT * FROM perf_reviews WHERE emp_id = ${empId}`);
  }
  catch (e) {
    logger.error(e);
    return {message: 'fail'};
  }
  var revList = [];
  
  for (var i in rows) {
    revList.push({
      id:             rows[i].id, 
      emp_id:         rows[i].emp_id, 
      review:         rows[i].review,                   
      score:          rows[i].score, 
      creation_date:  rows[i].creation_date,
      active:         rows[i].active
    });
  }
  return {message: 'succeed', reviews: revList};
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


module.exports = {
    //functions that will be used
    postNewPerfRev,
    seeAllPerfRevs,
    deletePerfRev
  };