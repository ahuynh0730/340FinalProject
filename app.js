var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.argv[2]);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));


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

//to display all orders
app.get('/orders', function(req,res,next) {
	var context = {};
	var createString = "SELECT id, customer_id, employee_id, is_delivery, order_date, delivery_date FROM orders;";
	mysql.pool.query(createString, function(err, rows, fields){
		if(err){
			next(err);
			return;
		}
		var params = [];
		for(var row in rows){
			var addItem = {
				'id':rows[row].id,
				'customer_id':rows[row].customer_id,
				'employee_id':rows[row].employee_id,
				'is_delivery':rows[row].is_delivery,
				'order_date':rows[row].order_date,
				'delivery_date':rows[row].delivery_date
			};
			params.push(addItem);
		}
		context.results = params;
		res.render('orders',context);
	});
});

//to display all employees
app.get('/employees', function(req,res,next) {
	var context = {};
	var createString = "SELECT id, fname, lname FROM employees;";
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
				'lname':rows[row].lname
			};
			params.push(addItem);
		}
		context.results = params;
		res.render('employees',context);
	});
});


//to add a new customer
app.get('/add_customer', function(req, res, next){
	var context = {};
	mysql.pool.query("INSERT INTO customers (fname, lname, address, city, state, zipcode) VALUES(?, ?, ?, ?, ?, ?)",
		[req.query.fname, 
		req.query.lname,
		req.query.address,
		req.query.city,
		req.query.state,
		req.query.zipcode],
		function(err,result){
			if(err){
				next(err);
				return;
			}
			context.inserted = result.insertId;
			res.send(JSON.stringify(context));
		}
	);
});

//to add a new menu item
app.get('/add_menu_item', function(req, res, next){
	var context = {};
	mysql.pool.query("INSERT INTO menu_items(item_name, type, price, quantity) VALUES(?, ?, ?, ?)",
		[req.query.item_name, 
		req.query.type,
		req.query.price,
		req.query.quantity],
		function(err,result){
			if(err){
				next(err);
				return;
			}
			context.inserted = result.insertId;
			res.send(JSON.stringify(context));
		}
	);
});

//to add a new employee
app.get('/add_employee', function(req, res, next){
	var context = {};
	mysql.pool.query("INSERT INTO employees (fname, lname) VALUES(?, ?)",
		[req.query.fname, 
		req.query.lname,],
		function(err,result){
			if(err){
				next(err);
				return;
			}
			context.inserted = result.insertId;
			res.send(JSON.stringify(context));
		}
	);
});

//to delete from customer table
app.get('/delete_customer', function(req, res, next) {
    var context = {};    
    mysql.pool.query("DELETE FROM customers WHERE id = ?", 	
        [req.query.id], 
        function(err, result) {
            if(err){
                next(err);
                return;
            }
    });
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
