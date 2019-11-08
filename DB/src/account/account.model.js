const crypto = require('crypto');


module.exports = {
register: function(connection, logger, {email, username, password}, callback) {
    connection.query(`select * from employees where username = '${username}'`, function (err, rows) {
        if (err) {
            callback({message: 'fail'});
            logger.error(err);
            return;
        }

        if (rows[0] != undefined) {
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