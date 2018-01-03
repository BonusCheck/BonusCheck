// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var installer_hrs = {
  all: function(cb) {
    orm.all("installer_hours", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("installer_hours", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("installer_hours", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("installer_hours", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = installer_hrs;
