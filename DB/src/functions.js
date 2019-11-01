module.exports = {
	setupDB: function (connection, logger) {
		connection.query('drop table if exists reports', function (err, rows, fields) {
			if (err)
				logger.error("Can't drop reports");
		});
		connection.query('drop table if exists departments', function (err, rows, fields) {
			if (err)
				logger.error("Can't drop departments");
		});
		connection.query('drop table if exists employees', function (err, rows, fields) {
			if (err)
				logger.error("Can't drop employees");
		});
		empValues =  `id int primary key, 
						fname varchar(50) not null,
						lname varchar(50) not null,
						dep_id int,
						pos varchar(50) not null,
						manager int,
						addr varchar(100),
						phn_num varchar(50),
						rating int,
						strikes int`;
		
		repValues =  `id int primary key,
						by_emp_id int not null,
						for_emp_id int not null,
						report TEXT not null,
						creation_date DATETIME not null,
						status varchar(50) not null,
						severity int not null,
						foreign key (by_emp_id)
						references employees(id),
						foreign key (for_emp_id)
						references employees(id)`;

		depValues =  `id int primary key,
						name varchar(50)`;

		histValues = `id int primary key, 
						position varchar(50) not null,
						date_began DATETIME not null,
						foreign key id references employees(id)`;
		
		perfValues = `int id primary key,
						emp_id int not null,
						review TEXT not null,
						score int not null,
						creation_date DATETIME not null,
						foreign key emp_id references employees(id)`;

		connection.query(`create table departments(${depValues});`, function (err, rows, fields) {
			if (err)
				logger.error("Problem creating the table departments");
		});

		connection.query(`create table employees(${empValues});`, function (err, rows, fields) {
			if (err)
				logger.error("Problem creating the table employee");
		});

		connection.query(`create table reports(${repValues});`, function (err, rows, fields) {
			if (err)
				logger.error("Problem creating the table reports");
		});

		// Sample data setup
		connection.query(`insert into departments values(1, 'Computer Science')`, function (err, rows, fields) {
			if (err)
				logger.error("Problem inserting into departments");
		});

		connection.query(`insert into employees values(1, 'mark', 'fontenot', 1, 'prof', null, 'address', 214, 5, 0)`, function (err, rows, fields) {
			if (err)
				logger.error("Problem inserting into employees");
		});

		connection.query(`insert into employees values(2, 'Marcus', 'Sykora', 1, 'Student', '1', 'address', 214, 5, 0)`, function (err, rows, fields) {
			if (err)
				logger.error("Problem inserting into employees");
		});

	},

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
	}
}