
module.exports = {
getReport: function(connection, logger, rep, callback){
    connection.query(`select * from reports where id = ?`, [rep], function(err, rows, fields){
        if(err){
            logger.error('Error in accessing report');
        }
        callback(rows[0]);
    });

},





closeReport: function(connection, logger, rep, reason, callback) {
    connection.query(`update reports set status = 'closed: ${reason}' where id = ?`, [rep], function (err, rows, fields) {
        callback(!err);
    });
}
}