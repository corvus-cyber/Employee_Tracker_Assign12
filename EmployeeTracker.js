var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "EmployeeTracker_db"
});

// connect to the mysql server and sql database
connection.connect(function(err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  menu();
});

//Start menu function, this will allow the user to choose which function they wish to be directed to
function menu(){
    inquirer.prompt(
        {
          type: "list",
          name: "startMenu",
          message: "Welcome to the Employee Tracker. What would you like to do today?",
          choices: ["View Departments, roles and employees", "Add departments, roles, and employees", "Update Employee Roles", "Exit"]  
        },
        )
        .then( response => {
            switch(response.startMenu) {
            case "View Departments, roles and employees":
                view();
                break;
            case "Add departments, roles, and employees":
                add();
                break;
            case "Update Employee Roles":
                update();
                break;
            case "Exit":
                console.log("Enjoy the rest of your day");
                connection.end();
                return;
            }
        });
        
};