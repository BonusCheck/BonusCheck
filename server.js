const 	express = require("express"),
		bodyParser = require("body-parser"),
		passport = require('passport'),
		session = require('express-session'),
		fs = require("fs"),
		path = require("path"),
		port = process.env.PORT || 8080,
		app = express();

app.use('/dist', express.static('dist'));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(session({ secret: 'WaddaDaDay3445',resave: true, saveUninitialized:false}));
 
app.use(passport.initialize());
 
app.use(passport.session());

app.use(function(req, res, next) {
  console.log(req.originalUrl);
  next();
});

const controllers = fs.readdirSync(path.join(__dirname, 'controllers'));

controllers.forEach(controller => {
	app.use("/bonuses", require("./controllers/bonusController.js"));
	app.use("/customers", require("./controllers/customerController.js"));
 	app.use("/installers", require("./controllers/installersController.js"));
	app.use("/jobs", require("./controllers/jobsController.js"));
	app.use("/payment-types", require("./controllers/paymentController.js"));
	app.use("/users",require("./controllers/usersController.js"));
	app.use("/", require("./controllers/generalController.js"));
});

app.listen(port);
