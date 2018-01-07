const bcrypt = require('bcrypt'),
      bonus = require("../models/bonuses.js"),
      change_ord = require("../models/change_orders.js"),
      customer = require("../models/customer.js"),
      express = require("express"),
      fs = require('fs'),
      layout = fs.readFileSync('./layout.html', 'utf8');
      generalRouter = express.Router(),
      installer = require("../models/installer.js"),
      installer_hrs = require("../models/installer_hours.js"),
      installer_pmt = require("../models/installer_payments.js"),
      installer_roles = require("../models/installer_roles.js"),
      job = require("../models/job.js"),
      job_installers = require("../models/job_installers.js"),
      payment_type = require("../models/payment_types.js"),
      saltRounds = 10,
      user = require("../models/user.js");


//***********************************************************************************************************
// HTML ROUTES
//***********************************************************************************************************

generalRouter.get("/", function(req, res) {
    res.send(layout);
  });

generalRouter.get("/:path", function(req, res){
  res.send(layout);
})

//***********************************************************************************************************
// API ROUTES
//***********************************************************************************************************

//AUTHENTICATION ROUTE - POST AND GET

generalRouter.post("/auth", function(req, res) {
  user.auth(req.body.user_name, function(data) {
    const password = data[0].password,
          username = data[0].user_name;
    // console.log("Data");
    // console.log(data[0].password);
    if (bcrypt.compareSync(req.body.password, password)) {
      // console.log("Username");
      // console.log(username);
      user.some(username, function(data) {
        // var vueObject = {
        //   user: data
        // };
        var sessData = req.session;
        sessData.user_id = data[0].user_id;
        sessData.user_name = data[0].user_name;
        sessData.user_role_name = data[0].user_role_name;
        //Not sure if below will work yet until we have a user logon.
      installer.single(data[0].user_id, function(data2) {
        var vueObject =  {
          user: data,
          installer: data2
        }
        
        sessData.installer_id = data2[0].installer_id;
        console.log(sessData.installer_id);
        console.log(vueObject);
        res.redirect("/dash");
      });
      console.log(sessData.installer_id);
      });
    }
  });
});
//***********************************************************************************************************

//SESSION ROUTES

generalRouter.get("/session", function(req, res, next) {
  if (req.session.views) {
    //Username and password are giving me nothign at this point on the session
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>Username: ' + req.session.user_name + '</p>');
    res.write('<p>Role: ' + req.session.user_role_name  + '</p>');
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.write(req.session.user_name);
    res.write(req.session.user_role_name);
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
});

generalRouter.get("/session/data", function(req, res) {
      const user = {
            userID: req.session.user_id,
            username: req.session.user_name,
            roll: req.session.user_role_name,
            installerID: req.session.installer_id
      };

      res.json(user);
});


// exports.logout = function(req, res){
//    req.session.destroy(function(err){
//        res.redirect('/');
//    });

module.exports = generalRouter;