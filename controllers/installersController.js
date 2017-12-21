const express = require("express"),
      router = express.Router(),
      fs = require('fs'),
      layout = fs.readFileSync('./layout.html', 'utf8');
      installer = require("../models/installer.js"),
      job = require("../models/job.js"),
      change_ord = require("../models/change_orders.js"),
      // user = require("../models/user.js"),
      bonus = require("../models/bonuses.js"),
      roles = require("../models/roles.js"),
      installer_hrs = require("../models/installer_hours.js"),
      installer_pmt = require("../models/installer_payments.js"),
      payment_type = require("../models/payment_types.js"),
      job_installers = require("../models/job_installers.js");
      // bcrypt = require('bcrypt'),
      // saltRounds = 10;

     
  

//GET ROUTES

//INSTALLER GET ROUTES
router.get("/installers", function(req, res) {
  installer.all(function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/installers/roles", function(req, res) {
  roles.some("installer_role_name", function(data) {
    var hbsObject = {
      role: data
    };
    var roles = [];
    for (var i = hbsObject.role.length - 1; i >= 0; i--) {
      roles.push(hbsObject.role[i].installer_role_name);
    }
    console.log(roles);
    res.json(roles);
  });
});

//INSTALLER HOURS GET ROUTES
router.get("/installers/hours", function(req, res) {
  installer_hrs.all(function(data) {
    var hbsObject = {
      installer_hours: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//INSTALLER PAYMENTS GET ROUTES
router.get("/installers/payments", function(req, res) {
  installer_pmt.all(function(data) {
    var hbsObject = {
      installer_payments: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//PAYMENT TYPES GET ROUTES
router.get("/payment-types", function(req, res) {
  job.all(function(data) {
    var hbsObject = {
      jobs: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.post("/installers/add", function(req, res) {
  console.log(req);
  installer.create([
    "created_by_id", "modified_by_id", "first_name", "last_name", "current_wage", "fk_installer_role_id"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.first_name, req.body.last_name, req.body.current_wage, req.body.installer_role_id
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});


// Export routes for server.js to use.
module.exports = router;
