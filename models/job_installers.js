// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var job_installers = {
  all: function(cb) {
    orm.all("jobs_installers", function(res) {
      cb(res);
    });
  },
  some: function(cb) {
    orm.someThreeTableJoin("jobs", "jobs_installers", "installers", "jobs.job_name, jobs.start_date, jobs.end_date, installers.first_name, installers.last_name, jobs_installers.job_installer_id, jobs_installers.hours_bid", "jobs.job_id = jobs_installers.fk_job_id", "jobs_installers.fk_installer_id = installers.installer_id", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("jobs_installers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("jobs_installers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("jobs_installers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = job_installers;
