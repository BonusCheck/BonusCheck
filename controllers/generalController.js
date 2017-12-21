const express = require("express"),
      router = express.Router(),
      // fs = require('fs'),
      installer = require("../models/installer.js"),
      job = require("../models/job.js"),
      change_ord = require("../models/change_orders.js"),
      user = require("../models/user.js"),
      bonus = require("../models/bonuses.js"),
      roles = require("../models/roles.js"),
      installer_hrs = require("../models/installer_hours.js"),
      installer_pmt = require("../models/installer_payments.js"),
      payment_type = require("../models/payment_types.js"),
      job_installers = require("../models/job_installers.js"),
      bcrypt = require('bcrypt'),
      saltRounds = 10;

router.get("/", function(req, res) {
    res.send(layout);
  });

//AUTHENTICATION ROUTE - POST AND GET
router.post("/auth", function(req, res) {
  user.auth(req.body.user_name, function(data) {
    const password = data[0].password,
          username = data[0].user_name;
    // console.log("Data");
    // console.log(data[0].password);
    if (bcrypt.compareSync(req.body.password, password)) {
      // console.log("Username");
      // console.log(username);
      user.some(username, function(data) {
        var hbsObject = {
          user: data
        };
        var sessData = req.session;
        //Not sure if below will work yet until we have a user logon.
        sessData.user_id = data[0].user_id;
        sessData.user_name = data[0].user_name;
        sessData.user_role_name = data[0].user_role_name;
        console.log(hbsObject);
        res.json(hbsObject);
        // res.redirect("/");
      });
    }
  });
});


//SESSION GET ROUTE
router.get('/session', function(req, res, next) {
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

//DEFAULT GET ROUTE
router.get("/session/data", function(req, res) {
      const user = {
            userID: req.session.user_id,
            username: req.session.user_name,
            roll: req.session.user_role_name
      };

      res.json(user);
});

//BONUS GET ROUTES
router.get("/bonuses", function(req, res) {
  bonus.all(function(data) {
    var hbsObject = {
      bonuses: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//PAYMENT TYPES GET ROUTES
router.get("/payment-types", function(req, res) {
  payment_type.all(function(data) {
    var hbsObject = {
      payment_types: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//ROLES GET ROUTES
router.get("/roles", function(req, res) {
  roles.all(function(data) {
    var hbsObject = {
      roles: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.put("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  installer.update({
    sleepy: req.body.sleepy
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

router.delete("/api/cats/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  installer.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

module.exports = router;