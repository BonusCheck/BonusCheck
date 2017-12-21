const 	express = require("express"),
		bodyParser = require("body-parser"),
		passport = require('passport'),
		session = require('express-session'),
		port = process.env.PORT || 8080,
		app = express();

// Serve static content for the app from the "public" directory in the application directory.
app.use('/dist', express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json()); -- Do we need this???

app.use(session({ secret: 'WaddaDaDay3445',resave: true, saveUninitialized:false}));
 
app.use(passport.initialize());
 
app.use(passport.session());

// Import routes and give the server access to them.

const 	installersRoutes = require("./controllers/installersController.js"),
		jobsRoutes = require("./controllers/jobsController.js"),
		usersRoutes = require("./controllers/usersController.js"),
		generalRoutes = require("./controllers/generalController.js");

app.use("/", generalRoutes);
app.use("/installers", installersRoutes);
app.use("/users",usersRoutes);
app.use("/jobs", jobsRoutes);
		
// var routes = require("./controllers/installersController.js");

// app.use("/", routes);

app.listen(port);
