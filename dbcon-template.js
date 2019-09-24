var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit 	: 10,
  host            	: 'remotemysql.com',
  user 				: '(insert user here)',
  password			: '(insert password here)',
  database			: '(insert database here)' 
});

module.exports.pool = pool;
