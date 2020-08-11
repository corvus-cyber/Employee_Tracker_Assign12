const path = require("path");

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
// function addDepartment(){

// }

// //Allows user to add new role 
// function addRole(){

// }

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
        name: "department_id",
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
  var query = connection.query(
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
    }
  );
}

module.exports = {addMenu, addEmployee, buildEmployee}