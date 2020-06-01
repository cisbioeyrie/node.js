var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
const path = require('path');
//const { body,validationResult } = require('express-validator');

//mysql database connection
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password : 'admin',
  database: "curseyou"
});
// using express
var app = express();
app.use(session({
	secret: 'secret',
    cookie: { maxAge: 600000 },
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
                request.session.sname=result[0].st_name;
				var course_list=result[0].courses_id.split(",");
				var sqlstring='SELECT * FROM courses WHERE ';
				for(i=0;i<(course_list.length-1);i++){
					sqlstring+='id='+course_list[i]+' or ';
				}
				sqlstring+='id='+course_list[course_list.length-1]+';';
				con.query(sqlstring, function(error1, result1, fields1){                
                    request.session.c_list=result1;
                    response.render('student',{sname:request.session.sname,c_info:result1});
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
                response.end();
			} else 		
				if(!response.headersSent){
				response.send('Wrong username or password<a href="/">Back to login</a>');
				response.end();
				}				
		});
		});
	}
});

app.get('/main', function(request, response) {
	if(request.session.loggedin) {
        if(request.session.sid)
            response.render('student',{sname:request.session.sname,c_info:request.session.c_list});
        else
            response.render('teacher',{tname:request.session.tname,cid:request.session.cid});
	} else 
		response.send('Please login to view student or teacher page!<br><br><a href="/">Back to login</a>');
	response.end();
});

app.get('/all_attendance', function(request, response) {
    if(request.session.loggedin){
    con.query('select week from attendance where course_id=? and student_id=\'s2020001\'', [request.session.cid], function(err, result, fields){
        con.query('select * from attendance where course_id=?', [request.session.cid], function(err, result1, fields){
       	response.render('all_attendance',{all_attendance_record:result1 ,all_attendance_week:result});
        response.end(); 
        });
    });
    }else{
        response.send('Oops,you should not be here<br><br><a href="/">Back to login</a>');
        response.end(); 
    }
});

app.post('/seturl', function(request, response) {
    var cid=request.session.cid;
    var week=request.body.week;
    con.query('select week from courses where id=?;',[cid], function(err0, wk, field){
        console.log(wk);
        //if(parseInt(week)>parseInt(result.week))
            con.query('update courses set URL=?,week=? where id=?;', [request.body.url,week,cid], function(err, result, fields){});
            con.query('select id from student where courses_id like \'%?%\'',parseInt(cid), function(err, result, fields){
                if (err) throw err;
                for(var i in result){                     
                    con.query('insert into attendance values(?,?,\'F\',?)',[cid,result[i].id,week], function(err1, result1, fields1){});
                }
            });
    });
});     

app.post('/change_attendance', function(request, response) {
    if(request.body.s_id&&request.session.loggedin)
        con.query('update attendance set status = ? where week =? and student_id =?;',[request.body.status,request.body.week,request.body.s_id], function(err, result, fields){});
    else
        con.query('update attendance set status = ? where week =?;',[request.body.status,request.body.week], function(err, result, fields){});
});

app.post('/auto_take_attendance', function(request, response) {
    con.query('update attendance set status=\'T\' where course_id=? and week =? and student_id=?;',[request.body.course_id,request.body.week,request.session.sid],function(err,result,fields){});
});

app.post('/one_attendance', function(request, response) {
    con.query('select * from attendance where course_id=? and student_id=?;',[request.body.course_id,request.session.sid],function(err,result,fields){
        response.render('one_attendance',{one_attendance_record:result ,sname:request.session.sname,cname:request.body.c_name});
        response.end(); 
    });
});
app.listen(3000);