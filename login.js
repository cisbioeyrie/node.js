var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');



var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password : 'admin',
  database: "curseyou"
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: false,
	saveUninitialized: false
}));
app.use(express.static('css'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/index.html');
});

app.post('/auth', function(request, response) {
	var userid = request.body.login_id;
	var password = request.body.password;
	console.log(userid+' '+password);
		con.query('SELECT * FROM student WHERE id = ? AND pw = ?;', [userid, password], function(error, results, fields) {
			if (results.length > 0) {
				request.session.loggedin = true;
				request.session.userid = userid;
				 console.log("Someone login!");
				 response.redirect('/home');
			} else {
				response.send('Incorrect Username and/or Password!');
			}			
			response.end();
		});
});

app.get('/home', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.userid + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);