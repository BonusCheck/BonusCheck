const express = require("express"),
      jobsRouter = express.Router(),
      // fs = require('fs'),
      installer = require("../models/installer.js"),
      job = require("../models/job.js"),
      change_ord = require("../models/change_orders.js"),
      // user = require("../models/user.js"),
      bonus = require("../models/bonuses.js"),
      installer_roles = require("../models/installer_roles.js"),
      installer_hrs = require("../models/installer_hours.js"),
      installer_pmt = require("../models/installer_payments.js"),
      payment_type = require("../models/payment_types.js"),
      job_installers = require("../models/job_installers.js");
      // bcrypt = require('bcrypt'),
      // saltRounds = 10;

// JOBS ROUTES

jobsRouter.get("/", function(req, res) {
  job.all(function(data) {
    var vueObject = {
      jobs: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

jobsRouter.post("/add", function(req, res) {
  console.log(req);
  job.create([
    "created_by_id", "modified_by_id", "job_name", "start_date", "end_date", "hours_bid", "est_start_date", "est_end_date", "fk_customer_id", "bill_rate", "job_status", "max_labor_cost"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.job_name, req.body.start_date, req.body.end_date, req.body.hours_bid, req.body.est_start_date, req.body.est_end_date, req.body.fk_customer_id, req.body.bill_rate, req.body.job_status, req.body.max_labor_cost
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

jobsRouter.delete("/delete", function(req, res) {
  var condition = "job_id = " + req.body.job_id;

  job.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

jobsRouter.put("/update", function(req, res) {
  var condition = "job_id = " + req.body.job_id;

  job.update({
    //HOW DO I TAKE IN RANDOM FILEDS HERE?  DO I COMPARE THE VALUES FIELD BY FIELD?
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
//***********************************************************************************************************

// BY USER ROLE ROUTES

jobsRouter.get("/installer/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date"], req.params.id, function(data) {
    var vueObject = {
      jobs_for_installer: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

jobsRouter.get("/pc/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date", "jobs.hours_bid", "jobs.fk_customer_id", "jobs.hours_bid", "jobs.bill_rate", "jobs.max_labor_cost", "jobs.job_id"], req.params.id, function(data) {
    var vueObject = {
      jobs_for_project_coordinator: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

jobsRouter.get("/pm/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date", "jobs.hours_bid", "jobs.fk_customer_id", "jobs.job_id"], req.params.id, function(data) {
    var vueObject = {
      jobs_for_project_manager: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});
//***********************************************************************************************************

// CHANGE ORGER ROUTES

jobsRouter.get("/change-orders", function(req, res) {
  change_ord.all(function(data) {
    var vueObject = {
      change_orders: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

jobsRouter.post("/change-orders/add", function(req, res) {
  console.log(req);
  change_ord.create([
    "created_by_id", "modified_by_id", "fk_original_job_id", "fk_change_job_id"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.original_job_id, req.body.change_job_id
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

jobsRouter.delete("/change-orders/delete", function(req, res) {
  var condition = "job_id = " + req.body.change_orders_id;

  change_ord.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

jobsRouter.put("/change-orders/update", function(req, res) {
  var condition = "job_id = " + req.body.change_orders_id;

  change_ord.update({
    //HOW DO I TAKE IN RANDOM FILEDS HERE?  DO I COMPARE THE VALUES FIELD BY FIELD?
  }, condition, function(result) {
    if (result.changedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});
//***********************************************************************************************************

//INSTALLER GET ROUTES

jobsRouter.get("/installers", function(req, res) {
  job_installers.all(function(data) {
    var vueObject = {
      jobs_installers: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

jobsRouter.get("/installers-joined", function(req, res) {
  job_installers.some(function(data) {
    var vueObject = {
      jobs_installers: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});




jobsRouter.put("/update/:id", function(req, res) {
  var condition = "job_id = " + req.params.id;

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


module.exports = jobsRouter;