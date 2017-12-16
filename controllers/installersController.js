var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var installer = require("../models/installer.js");
var job = require("../models/job.js");
var job_installer = require("../models/job-installer.js");
const user = require("../models/user.js");
const roles = require("../models/roles.js");
var bcrypt = require('bcrypt');

const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// Create all our routes and set up logic within those routes where required.

router.get('/session', function(req, res, next) {
  if (req.session.views) {
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})

router.get("/", function(req, res) {
  installer.all(function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

// bcrypt.genSalt(saltRounds, function(err, salt) {
//     bcrypt.hash(myPlaintextPassword, salt, function(err, hash) {
//         // Store hash in your password DB.
//     });
// });

// passport and passport local

router.post("/auth", function(req, res) {
  user.auth(req.body.user_name, req.body.password, function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.post("/add/user", function(req, res) {
  //Need to add role name and then query the id before the create
  user.create([
    "user_name", "password"
  ], [
    req.body.user_name, req.body.password
  ],function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/installer/roles", function(req, res) {
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

router.get("/installers", function(req, res) {
  installer.all(function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs", function(req, res) {
  job.all(function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs/installer/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date"], req.params.id, function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs/pm/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date", "jobs.hours_bid", "jobs.fk_customer_id", "jobs.job_id"], req.params.id, function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs/pc/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date", "jobs.hours_bid", "jobs.fk_customer_id", "jobs.hours_bid", "jobs.bill_rate", "jobs.max_labor_cost", "jobs.job_id"], req.params.id, function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs-installers", function(req, res) {
  job_installer.all(function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs-installers-joined", function(req, res) {
  job_installer.some(function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.post("/add/installer", function(req, res) {
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

router.post("/add/job", function(req, res) {
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

// Export routes for server.js to use.
module.exports = router;
