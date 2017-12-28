// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var installer_pmt = {
  all: function(cb) {
    orm.all("installer_payments", function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("installer_payments", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("installer_payments", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("installer_payments", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = installer_pmt;
