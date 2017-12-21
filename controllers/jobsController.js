const express = require("express"),
      router = express.Router(),
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

      //CHANGE ORGER GET ROUTES
router.get("/jobs/change-orders", function(req, res) {
  change_ord.all(function(data) {
    var hbsObject = {
      change_orders: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs/installer/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date"], req.params.id, function(data) {
    var hbsObject = {
      jobs_for_installer: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs/pc/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date", "jobs.hours_bid", "jobs.fk_customer_id", "jobs.hours_bid", "jobs.bill_rate", "jobs.max_labor_cost", "jobs.job_id"], req.params.id, function(data) {
    var hbsObject = {
      jobs_for_project_coordinator: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs/pm/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date", "jobs.hours_bid", "jobs.fk_customer_id", "jobs.job_id"], req.params.id, function(data) {
    var hbsObject = {
      jobs_for_project_manager: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//JOBS-INSTALLER GET ROUTES
router.get("/jobs/installers", function(req, res) {
  job_installers.all(function(data) {
    var hbsObject = {
      jobs_installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs/installers-joined", function(req, res) {
  job_installers.some(function(data) {
    var hbsObject = {
      jobs_installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.post("/jobs/add/", function(req, res) {
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

module.exports = router;