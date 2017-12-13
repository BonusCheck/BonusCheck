var express = require("express");
var bodyParser = require("body-parser");
const layout = require('express-layout');

var port = process.env.PORT || 8080;

var app = express();

app.use(layout());
app.set('layout', './layout');

// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));

// Import routes and give the server access to them.
var routes = require("./controllers/installersController.js");

app.use("/", routes);

app.listen(port);
