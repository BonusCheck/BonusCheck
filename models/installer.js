// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var installer = {
  all: function(cb) {
    orm.all("installers", function(res) {
      cb(res);
    });
  },
   some: function(cols, cb) {
    orm.some("installers", cols, function(res) {
      cb(res);
    });
  },
  single: function(userID, cb) {
    var user = "users.user_id = '" + userID + "'";
    orm.someTwoTableJoinTwoConditions("users", "installers", "installers.installer_id", "installers.fk_user_id = users.user_id", user, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    console.log(cols);
    console.log(vals);
    orm.create("installers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("installers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("installers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = installer;
