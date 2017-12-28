// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var job = {
  all: function(cb) {
    orm.all("jobs", function(res) {
      cb(res);
    });
  },
  someInstallerByID: function(cols, id, cb) {
    orm.someThreeTableJoinByID("jobs", "jobs_installers", "installers", cols, "jobs.job_id = jobs_installers.fk_job_id", "jobs_installers.fk_installer_id = installers.installer_id", "installers.installer_id = " + id, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("jobs", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("jobs", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("jobs", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = job;
