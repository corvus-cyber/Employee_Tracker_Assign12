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
          choices: ["View Departments, roles and employees", "Add departments, roles, and employees", "Update Employee Role", "Exit"]  
        },
        )
        .then( response => {
            switch(response.startMenu) {
            case "View Departments, roles and employees":
                viewMenu();
                break;
            case "Add departments, roles, and employees":
                addMenu();
                break;
            case "Update Employee Roles":
                updateMenu();
                break;
            case "Exit":
                console.log("Enjoy the rest of your day");
                console.log("----------")
                connection.end();
                return;
            }
        });
        
};

//Menu that will allow the view to choose what they want to view
function viewMenu(){
    inquirer.prompt(
        {
          type: "list",
          name: "viewMenu",
          message: "Which category would you like to search by?",
          choices: ["View all employees", "View employees by department", "View employees by manager", "Return to Main Menu"]  
        },
        )
        .then( response => {
            switch(response.startMenu) {
            case "View all employees":
                AllView();
                break;
            case "View employees by department":
                DeptView();
                break;
            case "View employees by manager":
                ManView();
                break;
            case "Return to Main Menu":
                console.log("Returning");
                console.log("----------")
                menu();
                break;
            }
        });
        
};

//Menu that will allow the user to choose what they want to add
function addMenu(){
    inquirer.prompt(
        {
          type: "list",
          name: "addMenu",
          message: "What would you like to add to the tracker?",
          choices: ["Department", "Role", "Employee", "Return to Main Menu"]  
        },
        )
        .then( response => {
            switch(response.startMenu) {
            case "Department":
                addDepartment();
                break;
            case "Role":
                addRole();
                break;
            case "Employee":
                addEmployee();
                break;
            case "Return to Main Menu":
                console.log("Returning");
                console.log("----------")
                menu();
                break;
            }
        });
}

//Allows user to view all employees
function AllView(){

}

//Allows user to view employees by department
function DeptView(){

}

//Allows user to view employees by manager
function ManView(){

}

//Allows user to add new department
function addDepartment(){

}

//Allows user to add new role 
function addRole(){

}

//Allows user to add new Employee
function addEmployee(){

}
