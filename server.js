var express = require("express");
var bodyParser = require("body-parser");
var passport = require('passport');
var session = require('express-session');

var port = process.env.PORT || 8080;

var app = express();

app.use('/dist', express.static('dist'));

// Serve static content for the app from the "public" directory in the application directory.
app.use('/dist', express.static('dist'))

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json()); -- Do we need this???

app.use(session({ secret: 'WaddaDaDay3445',resave: true, saveUninitialized:false}));
 
app.use(passport.initialize());
 
app.use(passport.session());

// Import routes and give the server access to them.
var routes = require("./controllers/installersController.js");

app.use("/", routes);

app.listen(port);

//Need to modify this to work in our environment
// var db = require("./models");

// var authRoute = require('./routes/auth.js')(app,passport);

// require('./config/passport/passport.js')(passport, db.user);

