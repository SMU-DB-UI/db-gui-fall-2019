
module.exports = {
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

setManager: function(connection, emp, managerId, callback) {
    connection.query(`update employees set manager = ${managerId} where id = ?`, [emp], function (err, rows) {
        callback(!err);
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
}
}