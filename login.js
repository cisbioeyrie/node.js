var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const path = require('path');
const async = require('async');

//const { body,validationResult } = require('express-validator');

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
app.set('views', path.join(__dirname, 'view'));
app.set('view engine', 'pug');

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/view/index.html');
	console.log("runned");
	return;
});

app.post('/auth', function(request, response) {
	var userid = request.body.login_id;
	var password = request.body.password;
	if(userid&&password){
		con.query('SELECT * FROM student WHERE id = ? AND pw = ?;', [userid, password], function(error, result, fields) {
			if (result.length > 0) {
				request.session.loggedin = true;
				request.session.sid = userid;
				var course_list=result[0].courses_id.split(",");
				var sqlstring='SELECT * FROM courses WHERE ';
				for(i=0;i<(course_list.length-1);i++)
				{
					sqlstring+='id='+course_list[i]+' or ';
				}
				sqlstring+='id='+course_list[course_list.length-1]+';';
				con.query(sqlstring, function(error1, result1, fields1){
					if(!response.headersSent)
				 response.render('student',{s_info:result,c_info:result1});
				 response.end();
				});
			}else
				con.query('SELECT * FROM teacher WHERE id = ? AND pw = ?;', [userid, password], function(error, result, fields) {
			if (result.length > 0) {
				request.session.loggedin = true;
				request.session.tid = userid;
				request.session.tname = result[0].t_name;
				request.session.cid = result[0].course_id;
				 console.log(result[0].t_name+' '+result[0].course_id);
				 response.render('/teacher');
			} else 		
				if(!response.headersSent){
				response.send('<a href="/">Back to login</a>');
				response.end();
				}				
		});
		});
		
	}
});

/*app.get('/student', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.userid + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});*/

app.listen(3000);