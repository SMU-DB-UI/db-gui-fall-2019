const logger = require('../helpers/logger');

async function getDeptPerf(connection, deptId) {
  let rows;
  try {
    if (deptId == -1) {
      [rows] = await connection.query(`select dep_id, AVG(rating) as avg_score from employees GROUP BY dep_id`);
    }
    else {
      [rows] = await connection.query(`select AVG(rating) as avg_score from employees WHERE dep_id = ?`, [parseInt(deptId)]);
    }
  }
  catch (e) {
    logger.error(e.stack);
    return {message: 'fail'};
  }
  if (deptId == -1) {
    let data = [];
    for (elem in rows) {
      data.push({dep_id: rows[elem].dep_id, avg_score: rows[elem].avg_score});
    }
    return {message: 'succeed', data: data};
  }
  else {
    return {message: 'succeed', data: {dep_id: rows[0].dep_id, avg_score: rows[0].avg_score}};
  }
}

module.exports = {
  getDeptPerf
};