const bcrypt = require('bcrypt'),
      bonus = require("../models/bonuses.js"),
      change_ord = require("../models/change_orders.js"),
      customer = require("../models/customer.js"),
      express = require("express"),
      fs = require('fs'),
      layout = fs.readFileSync('./layout.html', 'utf8');
      generalRouter = express.Router(),
      installer = require("../models/installer.js"),
      installer_hrs = require("../models/installer_hours.js"),
      installer_pmt = require("../models/installer_payments.js"),
      installer_roles = require("../models/installer_roles.js"),
      job = require("../models/job.js"),
      job_installers = require("../models/job_installers.js"),
      payment_type = require("../models/payment_types.js"),
      saltRounds = 10,
      user = require("../models/user.js");


//***********************************************************************************************************
// HTML ROUTES
//***********************************************************************************************************

generalRouter.get("/", function(req, res) {
    res.send(layout);
  });


//***********************************************************************************************************
// API ROUTES
//***********************************************************************************************************

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
        var vueObject = {
          user: data
        };
        var sessData = req.session;
        //Not sure if below will work yet until we have a user logon.
        sessData.user_id = data[0].user_id;
        sessData.user_name = data[0].user_name;
        sessData.user_role_name = data[0].user_role_name;
        console.log(vueObject);
        res.json(vueObject);
        // res.redirect("/");
      });
    }
  });
});
//***********************************************************************************************************

//BONUS ROUTES

generalRouter.get("/bonuses", function(req, res) {
  bonus.some(["bonus_id", "production_min", "production_max", "bonus_weight"], function(data) {
    var vueObject = {
      bonuses: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.post("/bonuses/add/", function(req, res) {
  console.log(req);
  bonus.create([
    "created_by_id", "modified_by_id", "production_min", "production_max", "bonus_weight"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.production_min, req.body.production_max, req.body.bonus_weight
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

generalRouter.delete("/bonuses/delete", function(req, res) {
  var condition = "id = " + req.body.bonus_id;

  bonus.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

generalRouter.put("/bonusess/update", function(req, res) {
  var condition = "id = " + req.body.req.body.bonus_id;;

  bonus.update({
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

//CUSTOMERS ROUTES

generalRouter.get("/customers", function(req, res) {
  customer.all(function(data) {
    var vueObject = {
      customers: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.post("/customers/add", function(req, res) {
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

generalRouter.delete("/customers/delete", function(req, res) {
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

generalRouter.put("/customers/update", function(req, res) {
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
//***********************************************************************************************************

//INSTALLER ROUTES

generalRouter.get("/installers", function(req, res) {
  installer.all(function(data) {
    var vueObject = {
      installers: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.get("/installers/list", function(req, res) {
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

generalRouter.delete("/installers/delete", function(req, res) {
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

generalRouter.put("/installers/update", function(req, res) {
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

generalRouter.get("/installers/hours", function(req, res) {
  installer_hrs.all(function(data) {
    var vueObject = {
      installer_hours: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.post("/installers/hours/add", function(req, res) {
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

generalRouter.delete("/installers/hours/delete", function(req, res) {
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

generalRouter.put("/installers/hours/update", function(req, res) {
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

generalRouter.get("/installers/payments", function(req, res) {
  installer_pmt.all(function(data) {
    var vueObject = {
      installer_payments: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.post("/installers/payments/add", function(req, res) {
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

generalRouter.delete("/installers/payments/delete", function(req, res) {
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

generalRouter.put("/installers/payments/update", function(req, res) {
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

generalRouter.get("/installer/roles", function(req, res) {
  installer_roles.all(function(data) {
    var vueObject = {
      roles: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.get("/installers/roles/list", function(req, res) {
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

generalRouter.post("/installer/roles/add/", function(req, res) {
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

generalRouter.delete("/installer/roles/delete", function(req, res) {
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

generalRouter.put("/installer/roles/update", function(req, res) {
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
//***********************************************************************************************************

//JOBS ROUTES

generalRouter.get("/jobs", function(req, res) {
  job.all(function(data) {
    var vueObject = {
      jobs: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.post("/jobs/add", function(req, res) {
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

generalRouter.delete("/jobs/delete", function(req, res) {
  var condition = "id = " + req.body.job_id;

  job.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

generalRouter.put("/jobs/update", function(req, res) {
  var condition = "id = " + req.body.job_id;

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

//JOBS BY USER ROLE ROUTES

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
//***********************************************************************************************************

//JOBS CHANGE ORGER ROUTES

generalRouter.get("/jobs/change-orders", function(req, res) {
  change_ord.all(function(data) {
    var vueObject = {
      change_orders: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.post("/jobs/change-orders/add/", function(req, res) {
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

generalRouter.delete("/jobs/change-orders/delete", function(req, res) {
  var condition = "id = " + req.body.change_orders_id;

  change_ord.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

generalRouter.put("/jobs/change-orders/update", function(req, res) {
  var condition = "id = " + req.body.change_orders_id;

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
  job.create([
    "created_by_id", "modified_by_id", "job_name", "start_date", "end_date", "hours_bid", "est_start_date", "est_end_date", "fk_customer_id", "bill_rate", "job_status", "max_labor_cost"
  ], [
    req.body.created_by_id, req.body.modified_by_id, req.body.job_name, req.body.start_date, req.body.end_date, req.body.hours_bid. req.body.est_start_date, req.body.est_end_date, req.body.fk_customer_id, req.body.bill_rate, req.body.job_status, req.body.max_labor_cost
  ], function(result) {
    // Send back the ID of the new quote
    res.json({ id: result.insertId });
  });
});

generalRouter.delete("/jobs/delete", function(req, res) {
  var condition = "id = " + req.body.job_id;

  job.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

generalRouter.put("/jobs/update", function(req, res) {
  var condition = "id = " + req.body.job_id;

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

//PAYMENT TYPE ROUTS

generalRouter.get("/payment-types", function(req, res) {
  payment_type.all(function(data) {
    var vueObject = {
      payment_types: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
});

generalRouter.post("/payment-types/add/", function(req, res) {
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

generalRouter.delete("/payment-types/delete", function(req, res) {
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

generalRouter.put("/payment-types/update", function(req, res) {
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
//***********************************************************************************************************

//SESSION ROUTES

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

generalRouter.get("/session/data", function(req, res) {
      const user = {
            userID: req.session.user_id,
            username: req.session.user_name,
            roll: req.session.user_role_name
      };

      res.json(user);
});
//***********************************************************************************************************

//USER AND ROLE GET ROUTE - REMOVE LATER

generalRouter.get("/user/list", function(req, res) {
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

//REMOVE ROUTE BEFORE PRODUCTION???
generalRouter.get("/user/:username", function(req, res) {
  user.some(req.params.username, function(data) {
    var vueObject = {
      user: data
    };
    console.log(vueObject);
    res.json(vueObject);
  });
}); 

generalRouter.post("/user/add", function(req, res) {
 bcrypt.genSalt(saltRounds, function(err, salt) {
  bcrypt.hash(req.body.password, salt, function(err, hash) {
    console.log(hash);
    user.create([
        "user_name", "password"
      ], [
        req.body.user_name, hash
      ],function(data) {
        var vueObject = {
          user: data
        };
        console.log(vueObject);
        res.json(vueObject);
      });
    });
  });
});

generalRouter.delete("/payment-types/delete", function(req, res) {
  var condition = "id = " + req.body.user_id;

  user.delete(condition, function(result) {
    if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});

generalRouter.put("/payment-types/update", function(req, res) {
  var condition = "id = " + req.body.user_id;

  user.update({
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

module.exports = generalRouter;