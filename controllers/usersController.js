const express = require("express"),
      router = express.Router(),
      // fs = require('fs'),
      // installer = require("../models/installer.js"),
      // job = require("../models/job.js"),
      // change_ord = require("../models/change_orders.js"),
      user = require("../models/user.js"),
      // bonus = require("../models/bonuses.js"),
      roles = require("../models/roles.js"),
      // installer_hrs = require("../models/installer_hours.js"),
      // installer_pmt = require("../models/installer_payments.js"),
      // payment_type = require("../models/payment_types.js"),
      // job_installers = require("../models/job_installers.js"),
      bcrypt = require('bcrypt'),
      saltRounds = 10;

//USER AND ROLE GET ROUTE - REMOVE LATER
router.get("/users/:username", function(req, res) {
  user.some(req.params.username, function(data) {
    var hbsObject = {
      user: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//POST ROUTES
router.post("/user/add", function(req, res) {
 bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(req.body.password, salt, function(err, hash) {
    console.log(hash);
    user.create([
        "user_name", "password"
      ], [
        req.body.user_name, hash
      ],function(data) {
        var hbsObject = {
          user: data
        };
        console.log(hbsObject);
        res.json(hbsObject);
      });
    });
  });
});

module.exports = router;