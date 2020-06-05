# node.js

2020/5/29 create student.pug (student main page), show database information in student interface<br>
2020/5/30 create teacher.pug(teacher main page), teacher can now post new url.<br>
2020/5/31 create all_attendance.pug(all student attendance record page), teacher can view and change the student attendance record.
          teacher part fundamental function completed.<br>
2020/6/1  student part fundamental function completed. Student can view own attendance and take attendance automatically by clicking the             url link. Footer improved with redirect to main mage. Added session checking. Add course countdown timer of student.     

Current target: automatically add date and time when teacher post a new url

Future system enhancement: 
1. automatically add date and time when teacher post a new url
2. deploy to heroku
3. improve database setup

Setup

1.download the zip files and unzip <br>
2.install node.js<br>
3.mysql setup for windows using mysql window installer <br>
3.1. download mysql installer https://dev.mysql.com/downloads/installer/<br>
3.2. add **mysql server**(8.0.20) and **mysql workbench**(8.0.20) by following the mysql installer procedures (it will require user to set the root password,please remember it)<br>
3.3. run the workbench and add a new connection, enter the root password to connect the service<br>
3.4. add a new schema to the connection named **curseyou**<br>
3.5. import the .sql files (Server -> Data Import)<br>
3.6. execute the following query **ALTER USER 'root'@'localhost' IDENTIFIED BY '(YourPassword)';**<br>
mysql setup manually (step will be added)<br>
4.use cmd to navigate to the downloaded location example: cd D:\download\node.js-master<br>
5.use cmd and type node login.js<br>
6.Go to http://localhost:3000/<br>
