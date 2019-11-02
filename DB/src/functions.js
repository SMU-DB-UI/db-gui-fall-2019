module.exports = {
	// Gets an employee's profile selected by id passed in
	getEmployee: function (connection, logger, emp, callback) {
		connection.query(`select * from employees where id = ?`, [emp], function (err, rows, fields) {
			if (err) {
			  logger.error('Error in accessing profile');
			}

			// Formatted as JSON
			profile = {'profile':
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
					'strikes':`${rows[0].strikes}`
				}};
					
			callback(profile);
		  });
	},

	// Function that queries and returns a list of all employees
	getEmployees: function (connection, logger, callback) {
		connection.query('select * from employees', function (err, rows, fields) {
			var empList = [];
			if (err) {
				callback(err, null);
				return;
			}
			
			for (var i in rows) {
				empList.push({fname: rows[i].fname, lname: rows[i].lname, dep_id: rows[i].dep_id, 
											addr: rows[i].addr, phn_num: rows[i].phn_num, rating: rows[i].rating});
			}
			callback(err, empList);
		});
	},

	removeEmployee: function (connection, logger, emp, callback) {
		connection.query('delete from employees where id = ?', [emp], function (err, rows, fields) {
			callback(!err);
		});
	},

	closeReport: function(connection, logger, rep, callback) {
		connection.query(`update reports set status = 'closed' where id = ?`, [rep], function (err, rows, fields) {
			callback(!err);
		});
	},

	addStrike: function(connection, logger, employeeID, callback){
		connection.query(`UPDATE employees SET strikes = strikes +1 WHERE id = ?`, [employeeID], function(err, rows, fields){
			callback(err);
		});
	}
}