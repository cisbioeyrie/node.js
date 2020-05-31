var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const path = require('path');
const popup = require('node-popup');
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
    cookie: { maxAge: 6000000 },
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
				response.render('teacher',{tname:result[0].t_name,cid:result[0].course_id});
			} else 		
				if(!response.headersSent){
				response.send('<a href="/">Back to login</a>');
				response.end();
				}				
		});
		});
		
	}
});

app.get('/student', function(request, response) {
	if (request.session.loggedin) {
		response.send('Welcome back, ' + request.session.userid + '!');
	} else {
		response.send('Please login to view this page!');
	}
	response.end();
});

app.get('/all_attendance', function(request, response) {
    con.query('select week from attendance where course_id=? and student_id=\'s2020001\'', [request.session.cid], function(err, result, fields){
        con.query('select * from attendance where course_id=?', [request.session.cid], function(err, result1, fields){
       	response.render('all_attendance',{all_attendance_record:result1 ,all_attendance_week:result});
        response.end(); 
        });
    });
});

app.post('/seturl', function(request, response) {
    var cid=request.session.cid;
    var week=request.body.week;
    con.query('update courses set URL=?,week=? where id=?;', [request.body.url,week,cid], function(err, result, fields){});
    con.query('select id from student where courses_id like \'%?%\'',parseInt(cid), function(err, result, fields){
        if (err) throw err;
        for(var i in result){                     
            con.query('insert into attendance values(?,?,\'F\',?)',[cid,result[i].id,week], function(err1, result1, fields1){
                if (err1) throw err1;
            });
        }
        console.log('all good!');
    });
});     

app.post('/change_attendance', function(request, response) {
    if(request.body.s_id)
        con.query('update attendance set status = ? where week =? and student_id =?;',[request.body.status,request.body.week,request.body.s_id], function(err, result, fields){});
    else
        con.query('update attendance set status = ? where week =?;',[request.body.status,request.body.week], function(err, result, fields){});
});

app.listen(3000);