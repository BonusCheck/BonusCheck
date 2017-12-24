const express = require("express"),
      jobsRouter = express.Router(),
      // fs = require('fs'),
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



jobsRouter.put("/jobs/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  jobs.update({
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

jobsRouter.delete("/api/cats/:id", function(req, res) {
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

module.exports = jobsRouter;