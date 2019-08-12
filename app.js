var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);


//to render the homepage
app.get('/', function(req,res,next){
  var context = {};
  res.render('home', context);
});

//will display customer page and display all customers
app.get('/customers', function(req,res,next) {
	var context = {};
	var createString = "SELECT id, fname, lname, address, city, state, zipcode FROM customers;";
	mysql.pool.query(createString, function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		var params = [];
		for(var row in rows){
			var addItem = {
				'id':rows[row].id,
				'fname':rows[row].fname,
				'lname':rows[row].lname,
				'address':rows[row].address,
				'city':rows[row].city,
				'state':rows[row].state,
				'zipcode':rows[row].zipcode
			};
			params.push(addItem);
		}
		context.results = params;
		res.render('customers',context);
	});
});


       
 
   
//to display all menu items
app.get('/menu', function(req,res,next) {
	var context = {};
	var createString = "SELECT id, item_name, type, price, quantity FROM menu_items;";
	mysql.pool.query(createString, function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		var params = [];
		for(var row in rows){
			var addItem = {
				'id':rows[row].id,
				'item_name':rows[row].item_name,
				'price':rows[row].price,
				'type':rows[row].type,
				'quantity':rows[row].quantity
			};
			params.push(addItem);
		}
		context.results = params;
		res.render('menu',context);
	});
});

app.get('/orders', function(req,res,next) {
	var context = {};
	res.render('orders', context);
});

app.get('/employees', function(req,res,next) {
	var context = {};
	res.render('employees', context);
});

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
