const crypto = require('crypto');

module.exports = {
	// Gets an employee's profile selected by id passed in
	getEmployee: async function (connection, logger, empId, callback) {
		let rows;
		try {
			[rows] = await connection.query(`select * from employees where id = ${empId}`);
		}
		catch (err) {
			callback({message: "fail"});
			throw err;
		}

		// Formatted as JSON
		let profile = {
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
		};

		callback({message: 'succeed'}, profile);
	},

	// Function that queries and returns a list of all employees
	getEmployees: async function (connection, logger, callback) {
		let rows;
		try {
			[rows] = await connection.query(`select * from employees`);
			logger.info(rows[0].fname);
		}
		catch (err) {
			callback({message: "fail"});
			throw err;
		}

		var empList = [];
		
		for (var i in rows) {
			empList.push({fname: rows[i].fname, lname: rows[i].lname, dep_id: rows[i].dep_id, 
										addr: rows[i].addr, phn_num: rows[i].phn_num, rating: rows[i].rating});
		}
		callback({message: 'succeed'}, empList);
	},

	removeEmployee: async function (connection, logger, emp, callback) {
		try {
			await connection.query(`update employees set active = 'false' where id = ${emp}`);
		}
		catch (err) {
			callback({message: "fail"});
			throw err;
		}
		callback({message: "succeed"});
	},

	closeReport: async function(connection, logger, rep, reason, callback) {
		try {
			await connection.query(`update reports set status = 'closed: ${reason}' where id = ${rep}`)
		}
		catch (err) {
			callback({message: "fail"});
			throw err;
		}
		callback({message: "succeed"});
	},

	setManager: async function(connection, emp, managerId, callback) {
		try {
			await connection.query(`update employees set manager = ${managerId} where id = ${emp}`)
		}
		catch (err) {
			callback({message: "fail"});
			throw err;
		}
		callback({message: "succeed"});
	},

	login: async function(connection, logger, {username, password}, callback) {
		let rows;
		try {
			[rows] = await connection.query(`select * from employees where username = '${username}'`);
		}
		catch (err) {
			throw err;
		}

		hash = hashPassword(password, rows[0].salt);
		if (hash == rows[0].password) {
			callback({message: 'succeed'});
			return;
		}
		callback({message: 'fail'});
	},

	register: async function(connection, logger, {email, username, password}, callback) {
		try {
			let rows;
			[rows] = await connection.query(`select * from employees where username = '${username}'`);
			if (rows) {
				callback({message: 'account exists'});
				return;
			}
		}
		catch (err) {
			callback({message: 'fail'});
			logger.error(err.code);
			return;
		}

		salt = crypto.randomBytes(16).toString('hex');
		hash = hashPassword(password, salt);

		try {
			await connection.query(`update employees set username = '${username}', 
				password = '${hash}', 
				salt = '${salt}' where email = '${email}'`);
		}
		catch (err) {
			callback({message: 'fail'});
			throw err;
		}
		callback({message: 'succeed', username: username});
	}
}

function hashPassword(password, salt) {
	hash = crypto.pbkdf2Sync(password, salt, 100, 64, 'sha512').toString('hex');
	return hash;
}