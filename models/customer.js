// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var customer = {
  all: function(cb) {
    orm.all("customers", function(res) {
      cb(res);
    });
  },
   some: function(cols, cb) {
    orm.some("customers", cols, function(res) {
      cb(res);
    });
  },
  // The variables cols and vals are arrays.
  create: function(cols, vals, cb) {
    console.log(cols);
    console.log(vals);
    orm.create("customers", cols, vals, function(res) {
      cb(res);
    });
  },
  update: function(objColVals, condition, cb) {
    orm.update("customers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("customers", condition, function(res) {
      cb(res);
    });
  }
};

// Export the database functions for the controller (catsController.js).
module.exports = customer;
