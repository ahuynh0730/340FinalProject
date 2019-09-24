var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit 	: 10,
  host            	: 'remotemysql.com',
  user 				: 'gNDRuQR4wv',
  password			: '7xGAgwmBDI',
  database			: 'gNDRuQR4wv' 
});

module.exports.pool = pool;
