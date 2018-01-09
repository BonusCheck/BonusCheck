// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var installerRoles = {
  all: function(cb) {
    orm.all("installer_roles", function(res) {
      // console.log(res);
      // var roles = res.body.installer_roll_name;
      // console.log(roles);
      cb(res);
    });
  },

  some: function(cols, cb) {
    orm.some("installer_roles", cols, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    console.log(cols);
    console.log(vals);
    orm.create("installer_roles", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("installer_roles", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("installer_roles", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = installerRoles;
