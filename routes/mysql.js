/**
 * New node file
 */
var mysql_pool = require('mysql');
var pool  = mysql_pool.createPool({
	host     : 'localhost',
	user     : 'root',
	password : 'cheese',
	port     : 3306,
	database : 'airbnb',
	connectionLimit : '100',
		multipleStatements: true
});

exports.pool = pool;