const bcrypt = require('bcrypt'),
      bonus = require("../models/bonuses.js"),
      change_ord = require("../models/change_orders.js"),
      customer = require("../models/customer.js"),
      express = require("express"),
      // fs = require('fs'),
      customerRouter = express.Router(),
      installer = require("../models/installer.js"),
      installer_hrs = require("../models/installer_hours.js"),
      installer_pmt = require("../models/installer_payments.js"),
      installer_roles = require("../models/installer_roles.js"),
      job = require("../models/job.js"),
      job_installers = require("../models/job_installers.js"),
      payment_type = require("../models/payment_types.js"),
      saltRounds = 10,
      user = require("../models/user.js");

// CUSTOMER ROUTES

customerRouter.get("/", function(req, res) {
  customer.all(function(data) {
    var vueObject = {
      customers: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

customerRouter.post("/add", function(req, res) {
  console.log(req);
  customer.create([
    "created_by_id", "modified_by_id", "customer_name"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.customer
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

customerRouter.delete("/delete", function(req, res) {
  var condition = "id = " + req.body.customer_id;

  customer.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

customerRouter.put("/update", function(req, res) {
  var condition = "id = " + req.body.customer_id;

  customer.update({
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

module.exports = customerRouter;