const express = require("express"),
      userRouter = express.Router(),
      // fs = require('fs'),
      // installer = require("../models/installer.js"),
      // job = require("../models/job.js"),
      // change_ord = require("../models/change_orders.js"),
      user = require("../models/user.js"),
      userRoles = require("../models/user_roles.js"),
      // bonus = require("../models/bonuses.js"),
      installer_roles = require("../models/installer_roles.js"),
      // installer_hrs = require("../models/installer_hours.js"),
      // installer_pmt = require("../models/installer_payments.js"),
      // payment_type = require("../models/payment_types.js"),
      // job_installers = require("../models/job_installers.js"),
      bcrypt = require('bcrypt'),
      saltRounds = 10;

//USER AND ROLE GET ROUTE - REMOVE LATER

userRouter.get("/", function(req, res) {
  user.all(function(data) {
    var vueObject = {
      users: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

userRouter.get("/list", function(req, res) {
  user.list("user_name", function(data) {
    console.log("DATA");
    console.log(data);
    var vueObject = {
      user: data
    };
    var users = [];
    for (var i = vueObject.user.length - 1; i >= 0; i--) {
      users.push(vueObject.user[i].user_name);
    }
    console.log(users);
    res.json(users);
  });
});

userRouter.post("/add", function(req, res) {
 bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(req.body.password, salt, function(err, hash) {
    console.log(hash);
    user.create([
        "user_name", "password", "fk_user_role_id"
      ], [
        req.body.user_name, hash, req.body.user_role_id
      ],function(data) {
        var vueObject = {
          user: data,
          ok: true
        };
        console.log(vueObject);
        res.json(vueObject);
      });
    });
  });
});

//REMOVE ROUTE BEFORE PRODUCTION???
userRouter.get("/:username", function(req, res) {
  user.some(req.params.username, function(data) {
    var vueObject = {
      user: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

userRouter.delete("/delete", function(req, res) {
  var condition = "user_id = " + req.body.user_id;

  user.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

userRouter.get("/roles", function(req, res) {
  userRoles.all(function(data) {
    var vueObject = {
      roles: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

module.exports = userRouter;