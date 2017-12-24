const express = require("express"),
      generalRouter = express.Router(),
      // fs = require('fs'),
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

generalRouter.get("/", function(req, res) {
    res.send(layout);
  });

//AUTHENTICATION ROUTE - POST AND GET
generalRouter.post("/auth", function(req, res) {
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
        res.json(hbsObject);
        // res.redirect("/");
      });
    }
  });
});


//SESSION GET ROUTE
generalRouter.get('/session', function(req, res, next) {
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
});

//DEFAULT GET ROUTE
generalRouter.get("/session/data", function(req, res) {
      const user = {
            userID: req.session.user_id,
            username: req.session.user_name,
            roll: req.session.user_role_name
      };

      res.json(user);
});

//BONUS GET ROUTES
generalRouter.get("/bonuses", function(req, res) {
  bonus.all(function(data) {
    var hbsObject = {
      bonuses: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//PAYMENT TYPES GET ROUTES
generalRouter.get("/payment-types", function(req, res) {
  payment_type.all(function(data) {
    var hbsObject = {
      payment_types: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//ROLES GET ROUTES
generalRouter.get("/roles", function(req, res) {
  roles.all(function(data) {
    var hbsObject = {
      roles: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});








generalRouter.put("/api/cats/:id", function(req, res) {
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

generalRouter.delete("/api/cats/:id", function(req, res) {
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


//MOVE TO JOBS ROUTE ONCE I FIGURE IT OUT
// __________________________________________________________________________________________
generalRouter.get("/jobs", function(req, res) {
  job.all(function(data) {
    var vueObject = {
      jobs: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

//CHANGE ORGER GET ROUTES
generalRouter.get("/jobs/change-orders", function(req, res) {
  change_ord.all(function(data) {
    var vueObject = {
      change_orders: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.get("/jobs/installer/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date"], req.params.id, function(data) {
    var vueObject = {
      jobs_for_installer: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.get("/jobs/pc/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date", "jobs.hours_bid", "jobs.fk_customer_id", "jobs.hours_bid", "jobs.bill_rate", "jobs.max_labor_cost", "jobs.job_id"], req.params.id, function(data) {
    var vueObject = {
      jobs_for_project_coordinator: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.get("/jobs/pm/:id", function(req, res) {
  job.someInstallerByID(["jobs.job_name", "jobs.start_date", "jobs.end_date", "jobs.job_status", "jobs.est_start_date", "jobs.est_end_date", "jobs.hours_bid", "jobs.fk_customer_id", "jobs.job_id"], req.params.id, function(data) {
    var vueObject = {
      jobs_for_project_manager: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

//JOBS-INSTALLER GET ROUTES
generalRouter.get("/jobs/installers", function(req, res) {
  job_installers.all(function(data) {
    var vueObject = {
      jobs_installers: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.get("/jobs/installers-joined", function(req, res) {
  job_installers.some(function(data) {
    var vueObject = {
      jobs_installers: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.post("/jobs/add/", function(req, res) {
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
// _________________________________________________________________________________________________________



//MOVE TO USERS ROUTE ONCE I FIGURE IT OUT
// __________________________________________________________________________________________
//USER AND ROLE GET ROUTE - REMOVE LATER
generalRouter.get("/user/:username", function(req, res) {
  user.some(req.params.username, function(data) {
    var hbsObject = {
      user: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//POST ROUTES
generalRouter.post("/user/add", function(req, res) {
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
// ________________________________________________________________________________________________________




//MOVE TO INSTALLERS ROUTE ONCE I FIGURE IT OUT
// ________________________________________________________________________________________________________

//INSTALLER GET ROUTES
generalRouter.get("/installers", function(req, res) {
  installer.all(function(data) {
    var hbsObject = {
      installers: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

generalRouter.get("/installers/roles", function(req, res) {
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
generalRouter.get("/installers/hours", function(req, res) {
  installer_hrs.all(function(data) {
    var hbsObject = {
      installer_hours: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//INSTALLER PAYMENTS GET ROUTES
generalRouter.get("/installers/payments", function(req, res) {
  installer_pmt.all(function(data) {
    var hbsObject = {
      installer_payments: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

//PAYMENT TYPES GET ROUTES
generalRouter.get("/payment-types", function(req, res) {
  job.all(function(data) {
    var hbsObject = {
      jobs: data
    };
    console.log(hbsObject);
    res.json(hbsObject);
  });
});

generalRouter.post("/installers/add", function(req, res) {
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


// ________________________________________________________________________________________________________


module.exports = generalRouter;