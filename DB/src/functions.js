const crypto = require('crypto');

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

	getReport: function(connection, logger, rep, callback){
		connection.query(`select * from reports where id = ?`, [rep], function(err, rows, fields){
			if(err){
				logger.error('Error in accessing report');
			}
			callback(rows[0]);
		});

	},
    
	getContactInfo: function(connection, logger, emp, callback) {
		connection.query(`SELECT * FROM employees WHERE id = ?`, [emp], function(err, rows, fields) {
			if (err) {
				logger.error('Error retrieving contact info for this employee.')
			}
			
			// Formatted as JSON
			contactinfo = {'contactinfo': 
			{
				'fname':`${rows[0].fname}`,
				'lname':`${rows[0].lname}`,
				'address':`${rows[0].addr}`,
				'phone':`${rows[0].phn_num}`,
			}};

			callback(contactinfo);
		});
	},

	updateContactInfo: function(connection, logger, emp, body, callback) {
		connection.query(`UPDATE employees SET fname = '${body.fname}', 
		lname = '${body.lname}', addr = '${body.address}', 
		phn_num = '${body.phn_num}' WHERE id = ?`, [emp], function(err) {
			if (err) {
				logger.error(`Could not update this employee's contact info`);
				callback({status:'false'});
			}
			callback({status:'true'});
		});
	},

	//Function that queries and returns a list of all reports
	getReports: function (connection, logger, callback) {
		connection.query('select * from reports', function (err, rows, fields) {
			var repList = [];
			if (err) {
				callback(err, null);
				return;
			}
			
			for (var i in rows) {
				repList.push({rep_id: rows[i].id, creation_date: rows[i].creation_date, 
							severity: rows[i].severity, status: rows[i].status});
			}
			callback(err, repList);
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

	closeReport: function(connection, logger, rep, reason, callback) {
		connection.query(`update reports set status = 'closed: ${reason}' where id = ?`, [rep], function (err, rows, fields) {
			callback(!err);
		});
	},

	setManager: function(connection, emp, managerId, callback) {
		connection.query(`update employees set manager = ${managerId} where id = ?`, [emp], function (err, rows) {
			callback(!err);
		});
	},

	register: function(connection, logger, {email, username, password}, callback) {
		connection.query(`select * from employees where username = '${username}'`, function (err, rows) {
			if (err) {
				callback({message: 'fail'});
				logger.error(err);
				return;
			}

			if (rows) {
				callback({message: 'account exists'});
				return;
			}
		});

		salt = crypto.randomBytes(16).toString('hex');
		hash = hashPassword(password, salt);
		connection.query(`update employees set username = '${username}', 
			password = '${hash}', salt = '${salt}' where email = '${email}'`, function (err) {

			if (err) {
				callback({message: 'fail'});
			}
			else {
				callback({message: 'succeed'});
			}
		});
	},

	login: function(connection, logger, {username, password}, callback) {
		connection.query(`select * from employees where username = '${username}'`, function (err, rows) {
			if (err) {
				callback({message: 'fail'});
				logger.error(err);
				return;
			}
			else if (rows[0] == undefined || rows[0].password == undefined) {
				callback({message: 'fail'});
				return;
			}

			hash = hashPassword(password, rows[0].salt);
			if (hash == rows[0].password) {
				callback({message: 'succeed'});
			}
			else {
				callback({message: 'fail'});
			}
		});
	}
}

function hashPassword(password, salt) {
	hash = crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('hex');
	return hash;
}