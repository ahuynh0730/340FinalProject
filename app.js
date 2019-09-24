var express = require('express');
//var mysql = require('./dbcon.js');
var app = express();
var bodyParser = require("body-parser"); 
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
const util = require('util');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 8080);
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static("public"));


//to render the homepage
app.get('/', function(req,res,next){
  var context = {};
  res.render('home', context);
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
