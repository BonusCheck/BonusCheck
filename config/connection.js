// Set up MySQL connection.
var mysql = require("mysql");

var connection = mysql.createConnection({
  port: 3306,
  host: "localhost",
<<<<<<< HEAD
=======
  //socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock",
>>>>>>> 3ef10fbf08b36b40d6040024b5f4aabbf7cf0932
  user: "root",
  password: "password",
  database: "installers_db"
});

// Make connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Export connection for our ORM to use.
module.exports = connection;
