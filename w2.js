var mysql = require("mysql");
var connection = mysql.createConnection({
	host: "localhost",
	port: 3306,

	user: "root",
	password: "Fuckin@D^d3$",
	database: "w2_db"
});
// var http = require("http");
// var fs = require("fs");
var table = require("console.table");
var PORT = 8080;
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var exphbs = require("express-handlebars");
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/projects", function(req, res) {
  res.sendFile(path.join(__dirname, "projects.html"));
});

app.get("/add-project", function(req, res) {
  res.sendFile(path.join(__dirname, "add-project.html"));
});

app.get("/add-crew-member", function(req, res) {
  res.sendFile(path.join(__dirname, "add-crew-member.html"));
});

app.post("/add-project/new-project", function(req, res) {
	var projectToAdd = req.body;
	if (projectToAdd) {
    	var query = "INSERT INTO job (job_name, start_date, end_date, bill_rate, job_status, max_labor_cost) VALUES ('" + projectToAdd.name + "','" + projectToAdd.start + "','" + projectToAdd.end + "'," + projectToAdd.rate + ",'" + projectToAdd.status + "'," + projectToAdd.maxCost + ")";
    	connection.query(query, function(err, result) {
		    if (err) throw err;
			console.log(err);
			console.log(result);
		});
		connection.end();
	}
});

app.get("/search/:searchProjects?", function(req, res) {
  var project = req.params.searchProjects;
  var resValue = [];
	if (project) {
    	var query = "SELECT * FROM job WHERE ? ORDER BY end_date";
    	connection.query(query, [{ job_name: project }], function(err, result) {
		    if (err) throw err;
	    	var values = 
			  {
			    id: result[0].job_id,
			    name: result[0].job_name,
			    start: result[0].start_date,
			    end: result[0].end_date,
			    bill_rate: "$" + result[0].bill_rate,
			    status: result[0].job_status
			  };
			console.table(values);
			resValue = values; //WHY DO I NEED TO CONVERT THIS AND WHY CAN'T I CONSOLE LOG VALUES?
			console.log(resValue);
			return res.json(resValue);	   
		});
		connection.end();
 	}
});

app.get("/api/projects", function(req, res) {
    	var values = [];
    	var query = "SELECT * FROM job ORDER BY end_date";
    	connection.query(query, function(err, result) {
    		console.log(result);
			if (err) throw err;
			for (var i = 0; i < result.length; i++) {
			    	values.push(
					  {
					    id: result[i].job_id,
					    name: result[i].job_name,
					    start: result[i].start_date,
					    end: result[i].end_date,
					    bill_rate: "$" + result[i].bill_rate,
					    status: result[i].job_status
					  });
			 }
			console.table(values);
			console.log(values);
			return res.json(values);	   
		});
		connection.end();
});

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});