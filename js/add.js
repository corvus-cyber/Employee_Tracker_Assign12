var inquirer = require("inquirer");
var mysql = require("mysql");
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

// //Allows user to add new department
function addDepartment(){
    inquirer.prompt(
        {
        type: "input",
        name: "name",
        message: "What is the name of this new Department?"
        }
    )
    .then( response => {
        buildDepartment(response);
      });
}
function buildDepartment(response){
    console.log("Creating the profile for a new Role...\n");
    connection.query(
      "INSERT INTO role SET ?",
      {
        name: response.name,
      },
      function(error, res) {
        if (error){ 
          throw error
      };
        console.log(res.affectedRows + "A new Department has been added to the system!\n");
        startMenu();
      }
    );
}
// //Allows user to add new role 
function addRole(){
    inquirer.prompt([
        {
        type: "input",
        name: "title",
        message: "What is the title of this new Role?"
        },
    {
        type: "input",
        name: "salary",
        message: "What is the Role's salary?"
    },
    {
        type: "number",
        name: "department_id",
        message: "What is this Role's department id?"

    }
    ])
    .then( response => {
        buildRole(response);
      });
}
//Takes the user's input to build a new role in sql
function buildRole(response){
    console.log("Creating the profile for a new Role...\n");
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: response.title,
        salary: response.salary,
        department_id: response.department_id,
      },
      function(error, res) {
        if (error){ 
          throw error
      };
        console.log(res.affectedRows + "A new Role has been added to the system!\n");
        startMenu();
      }
    );
}
  
//Allows user to add new Employee
function addEmployee(){
    inquirer.prompt([
        {
        type: "input",
        name: "first_name",
        message: "What is the Employee's first name?"
        },
    {
        type: "input",
        name: "last_name",
        message: "What is the Employee's last name?"
    },
    {
        type: "number",
        name: "role_id",
        message: "What is the Employee's role id?"

    },
    {
        type: "number",
        name: "manager_id",
        message: "What is the Employee's manager id?"
    }
    ])
    .then( response => {
        buildEmployee(response);
      });
}

//Allows user to create new employee file, basis taken from activity 10
function buildEmployee(response){
  console.log("Creating the profile for a new employee...\n");
  connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: response.first_name,
      last_name: response.last_name,
      role_id: response.role_id,
      manager_id: response.manager_id
    },
    function(error, res) {
      if (error){ 
        throw error
    };
      console.log(res.affectedRows + "A new Employee has been added to the system!\n");
      startMenu();
    }
  );
}
module.exports = {addMenu, addEmployee, buildEmployee, addRole, buildRole, addDepartment, buildDepartment}