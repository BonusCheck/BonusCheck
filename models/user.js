const orm = require("../config/orm.js"),
      bcrypt = require('bcrypt'),
      salt = bcrypt.genSaltSync(10),
      hash = bcrypt.hashSync("sCr@mb13m3", salt);



var user = {
  all: function(cb) {
    orm.all("users", function(res) {
      cb(res);
    });
  },
  auth: function(user, cb) {
    orm.auth("users", user, "user_name, password", function(res) {
        cb(res);
    });
  },
  some: function(username, cb) {
    var user = "users.user_name = '" + username + "'";
    orm.someTwoTableJoinTwoConditions("users", "user_roles", "users.user_id, users.user_name, user_roles.user_role_name", "users.fk_user_role_id = user_roles.user_role_id", user, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    orm.create("users", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("users", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("users", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = user;