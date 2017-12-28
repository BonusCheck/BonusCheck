const 	express = require("express"),
		bodyParser = require("body-parser"),
		passport = require('passport'),
		session = require('express-session'),
		fs = require("fs"),
		path = require("path"),
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

//const controllers = fs.readdirSync(path.join(__dirname, 'controllers'));

//controllers.forEach(controller => {
 // 	app.use("/installers", require("./controllers/installersController.js"));
	// app.use("/jobs", require("./controllers/jobsController.js"));
	// app.use("/users",require("./controllers/usersController.js"));
//	app.use("/", require("./controllers/generalController.js"));
//});

// const 	installersRoutes = require("./controllers/installersController.js"),
// 		jobsRoutes = require("./controllers/jobsController.js"),
// 		usersRoutes = require("./controllers/usersController.js"),
// 		generalRoutes = require("./controllers/generalController.js");

// app.use("/installers", installersRoutes);
// app.use("/jobs", jobsRoutes);
// app.use("/users",usersRoutes);
// app.use("/", generalRoutes);

var routes = require("./controllers/generalController.js");

app.use("/", routes);

app.listen(port);
