var mysql = require("mysql");
var inquirer = require("inquirer");
var {menu} =require("./js/menu")

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  // Your password
  password: "20Coding!20",
  database: "EmployeeTracker_db"
});

connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
    menu();
});
  

module.exports = connection;


