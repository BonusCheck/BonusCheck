const bcrypt = require('bcrypt'),
      bonus = require("../models/bonuses.js"),
      change_ord = require("../models/change_orders.js"),
      customer = require("../models/customer.js"),
      express = require("express"),
      // fs = require('fs'),
      paymentRouter = express.Router(),
      installer = require("../models/installer.js"),
      installer_hrs = require("../models/installer_hours.js"),
      installer_pmt = require("../models/installer_payments.js"),
      installer_roles = require("../models/installer_roles.js"),
      job = require("../models/job.js"),
      job_installers = require("../models/job_installers.js"),
      payment_type = require("../models/payment_types.js"),
      saltRounds = 10,
      user = require("../models/user.js");

//PAYMENT TYPE ROUTS

paymentRouter.get("/", function(req, res) {
  payment_type.all(function(data) {
    var vueObject = {
      payment_types: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

paymentRouter.post("/add", function(req, res) {
  console.log(req);
  payment_type.create([
    "created_by_id", "modified_by_id", "payment_type"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.payment_type
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

paymentRouter.delete("/delete", function(req, res) {
  var condition = "id = " + req.body.payment_type_id;

  payment_type.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

paymentRouter.put("/update", function(req, res) {
  var condition = "id = " + req.body.payment_type_id;

  payment_type.update({
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

module.exports = paymentRouter;