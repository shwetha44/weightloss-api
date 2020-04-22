var express = require("express");
var mysql      = require('mysql');
var connection  = mysql.createPool({
    connectionLimit : 10,
    host     : 'localhost',
    user     : 'root',
    password : process.env.DB_PASSWORD,
    database : 'testdb'
});
var app = express();
var port = 8000;

app.use(function (req,res, next) {
    res.header('Access-Control-Allow-Origin',"*");
    res.header('Access-Control-Allow-Methods',"GET, PUT, POST, DELETE");
    res.header('Access-Control-Allow-Headers',"Content-Type");
    next();
});

app.listen(port, function(){
    console.log("shwetha first express app is running")
});


app.get("/", function (request, response) {
    response.send("shwetha first api response")
});

app.get("/shwetha", function(request, response){
    response.send("shwetha is sleepy")
});

app.get("/sweety", function(request, response){
    connection.query('SELECT * from Employees', function (error, results, fields) {
        if (error){
            response.send({"message": "Failed to fetch data"})
        } else{
            response.send(results)
        }
    });
});

app.post("/sweety", function (request, response) {
    connection.query('insert into employees (EMPLOYEE_ID, FIRST_NAME, LAST_NAME, EMAIL, PHONE_NUMBER) \n' +
        'VALUES (22, \'mahesh\', \'byra\', \'mahesh.byra@gmail.com\', 99999999);', function (error, results, fields) {
        if (error){
            response.send({"message": "Failed to insert data"})
        } else {
            response.send(results)
        }
    });
});

app.put("/sweety", function (request, response) {
    connection.query('UPDATE  employees  set PHONE_NUMBER = 7777777 where EMPLOYEE_ID = 1;', function (error, results, fields) {
        if (error){
            response.send({"message": "Failed to insert data"})
        } else {
            response.send(results)
        }
    });
});

app.post("/login", function (req, res) {
    console.log(req.data);
    res.send({msg: true})
});


app.delete("/sweety", function (request, response) {
    connection.query('Delete from employees  where EMPLOYEE_ID = 22;', function (error, results, fields) {
        if (error){
            console.log("what is the error??", error);
            response.send({"message": "Failed to delete data"})
        } else {
            response.send(results)
        }
    });
});

app.post("/register", function (request, response) {
    response.send({msg:'success'});
});
