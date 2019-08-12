var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_huynhant',
  password        : 'Affton2012',
  database        : 'cs340_huynhant'
});

module.exports.pool = pool;
