const express = require("express"),
      router = express.Router(),
      fs = require('fs'),
      installer = require("../models/installer.js"),
      job = require("../models/job.js"),
      change_ord = require("../models/change_orders.js"),
      user = require("../models/user.js"),
      bonus = require("../models/bonuses.js"),
      roles = require("../models/roles.js"),
      installer_hrs = require("../models/installer_hours.js"),
      installer_pmt = require("../models/installer_payments.js"),
      payment_type = require("../models/payment_types.js"),
      job_installers = require("../models/job_installers.js"),
      bcrypt = require('bcrypt'),
      saltRounds = 10;

//AUTHENTICATION ROUTE - POST AND GET
router.post("/auth", function(req, res) {
  user.auth(req.body.user_name, function(data) {
    const password = data[0].password,
          username = data[0].user_name;
    // console.log("Data");
    // console.log(data[0].password);
    if (bcrypt.compareSync(req.body.password, password)) {
      // console.log("Username");
      // console.log(username);
      user.some(username, function(data) {
        var hbsObject = {
          user: data
        };
        var sessData = req.session;
        //Not sure if below will work yet until we have a user logon.
        sessData.user_id = data[0].user_id;
        sessData.user_name = data[0].user_name;
        sessData.user_role_name = data[0].user_role_name;
        console.log(hbsObject);
        // res.json(hbsObject);
        res.redirect("/");
      });
    }
  });
});

// router.get('/bar', function(req, res, next) {
//   var someAttribute = req.session.user_name;
//   res.send(`This will print the attribute I set earlier: ${someAttribute}`);
// });

  

//GET ROUTES
//SESSION GET ROUTE
router.get('/session', function(req, res, next) {
  if (req.session.views) {
    //Username and password are giving me nothign at this point on the session
    req.session.views++
    res.setHeader('Content-Type', 'text/html')
    res.write('<p>Username: ' + req.session.user_name + '</p>');
    res.write('<p>Role: ' + req.session.user_role_name  + '</p>');
    res.write('<p>views: ' + req.session.views + '</p>')
    res.write('<p>expires in: ' + (req.session.cookie.maxAge / 1000) + 's</p>')
    res.write(req.session.user_name);
    res.write(req.session.user_role_name);
    res.end()
  } else {
    req.session.views = 1
    res.end('welcome to the session demo. refresh!')
  }
})
//DEFAULT GET ROUTE
router.get("/", function(req, res) {
  installer.all(function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//BONUS GET ROUTES
router.get("/bonuses", function(req, res) {
  bonus.all(function(data) {
    var hbsObject = {
      bonuses: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//USER AND ROLE GET ROUTE - REMOVE LATER
router.get("/user/:username", function(req, res) {
  user.some(req.params.username, function(data) {
    var hbsObject = {
      user: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//CHANGE ORGER GET ROUTES
router.get("/change-orders", function(req, res) {
  change_ord.all(function(data) {
    var hbsObject = {
      change_orders: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

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

//INSTALLER HOURS GET ROUTES
router.get("/installer-hours", function(req, res) {
  installer_hrs.all(function(data) {
    var hbsObject = {
      installer_hours: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//INSTALLER PAYMENTS GET ROUTES
router.get("/installer-payments", function(req, res) {
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
  payment_type.all(function(data) {
    var hbsObject = {
      payment_types: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//ROLES GET ROUTES
router.get("/roles", function(req, res) {
  roles.all(function(data) {
    var hbsObject = {
      roles: data
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
router.get("/jobs-installers", function(req, res) {
  job_installers.all(function(data) {
    var hbsObject = {
      jobs_installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

router.get("/jobs-installers-joined", function(req, res) {
  job_installers.some(function(data) {
    var hbsObject = {
      jobs_installers: data
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


//POST ROUTES
router.post("/add/user", function(req, res) {
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

router.get("/", function(req, res) {
    res.send(layout);
  });

router.get("/:path", function(req, res) {
    res.send(layout);
  });

// Export routes for server.js to use.
module.exports = router;
