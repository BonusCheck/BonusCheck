const express = require("express"),
      installerRouter = express.Router(),
      fs = require('fs'),
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

  //INSTALLER ROUTES

installerRouter.get("/", function(req, res) {
  installer.all(function(data) {
    var vueObject = {
      installers: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

installerRouter.get("/list", function(req, res) {
  var columns = "first_name, last_name";
  installer.some(columns, function(data) {
    console.log(data);
    var vueObject = {
      installer: data
    };
    var installers = [];
    for (var i = vueObject.installer.length - 1; i >= 0; i--) {
      var full_name = "";
      full_name = vueObject.installer[i].first_name + " " + vueObject.installer[i].last_name
      installers.push(full_name);
    }
    console.log(installers);
    res.json(installers);
  });
});

installerRouter.post("/add", function(req, res) {
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

installerRouter.delete("/delete", function(req, res) {
  var condition = "id = " + req.body.installer_id;

  installer.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

installerRouter.put("/update", function(req, res) {
  var condition = "id = " + req.body.installer_id;

  installer.update({
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

//INSTALLER HOURS GET ROUTES

installerRouter.get("/hours", function(req, res) {
  installer_hrs.all(function(data) {
    var vueObject = {
      installer_hours: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

installerRouter.post("/hours/add", function(req, res) {
  console.log(req);
  installer_hrs.create([
    "created_by_id", "modified_by_id", "reg_hours_worked", "ot_hours_worked", "work_date", "fk_job_id", "fk_installer_id"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.reg_hours_worked, req.body.ot_hours_worked, req.body.work_date, req.body.fk_job_id, req.body.fk_installer_id
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

installerRouter.delete("/hours/delete", function(req, res) {
  var condition = "id = " + req.body.installer_hours_id;

  installer_hrs.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

installerRouter.put("/hours/update", function(req, res) {
  var condition = "id = " + req.body.installer_hours_id;

  installer_hrs.update({
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

//INSTALLER PAYMENTS GET ROUTES

installerRouter.get("/payments", function(req, res) {
  installer_pmt.all(function(data) {
    var vueObject = {
      installer_payments: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

installerRouter.post("/payments/add", function(req, res) {
  console.log(req);
  installer_pmt.create([
    "created_by_id", "modified_by_id", "date_paid", "scheduled_pay_date", "payment_amount", "fk_installer_id", "fk_payment_type_id", "fk_job_id"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.date_paid, req.body.scheduled_pay_date, req.body.payment_amount, req.body.fk_installer_id, req.body.fk_payment_type_id, req.body.fk_job_id
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

installerRouter.delete("/payments/delete", function(req, res) {
  var condition = "id = " + req.body.installer_hours_id;

  installer_pmt.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

installerRouter.put("/payments/update", function(req, res) {
  var condition = "id = " + req.body.installer_hours_id;

  installer_pmt.update({
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
//INSTALLER ROLES ROUTES

installerRouter.get("/roles", function(req, res) {
  installer_roles.all(function(data) {
    var vueObject = {
      roles: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

installerRouter.get("/roles/list", function(req, res) {
  installer_roles.some("installer_role_name", function(data) {
    var vueObject = {
      role: data
    };
    var roles = [];
    for (var i = vueObject.role.length - 1; i >= 0; i--) {
      roles.push(vueObject.role[i].installer_role_name);
    }
    console.log(roles);
    res.json(roles);
  });
});

installerRouter.post("/roles/add", function(req, res) {
  console.log(req);
  installer_roles.create([
    "created_by_id", "modified_by_id", "payment_type"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.payment_type
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

installerRouter.delete("/roles/delete", function(req, res) {
  var condition = "id = " + req.body.payment_type_id;

  installer_roles.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

installerRouter.put("/roles/update", function(req, res) {
  var condition = "id = " + req.body.role_id;

  installer_roles.update({
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

// Export routes for server.js to use.
module.exports = installerRouter;
