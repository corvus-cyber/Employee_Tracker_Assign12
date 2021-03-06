const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")


// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  // Your port; if not 3306
  port: 3306,
  // Your username
  user: "root",
  //Enter your password:
  password: "-----------",
  database: "EmployeeTracker_db",
});

connection.connect(function (err) {
  if (err) throw err;
  // run the start function after the connection is made to prompt the user
  menu();
});

//Start menu function, this will allow the user to choose which function they wish to be directed to
function menu() {
console.log("------------------------------");
console.log("----   EMPLOYEE TRACKER   ----");
console.log("------------------------------");
  inquirer.prompt({
      type: "list",
      name: "startMenu",
      message:
        "What would you like to do today?",
      choices: [
        "View Departments, Roles and Employees",
        "Add New Employee",
        "Add New Role",
        "Add New Department",
        "Update Employee's Role",
        "Update Employee's Manager",
        "Delete Employee",
        "Delete Role",
        "Delete Department",
        "Exit",
      ],
    })
    .then((response) => {
      switch (response.startMenu) {
        case "View Departments, Roles and Employees":
          viewMenu();
          break;
        case "Add New Department":
          addDepartment();
          break;
        case "Add New Role":
          addRole();
          break;
        case "Add New Employee":
          addEmployee();
          break;
        case "Update Employee's Role":
          updateEmployee();
          break;
        case "Update Employee's Manager":
          questionManager();
          break;
        case "Delete Employee":
          deleteEmployee();
          break;
        case "Delete Role":
          deleteRole();
          break;
        case "Delete Department":
          deleteDepartment();
          break;
        case "Exit":
          console.log("------------------------------");
          console.log("- Enjoy the rest of your day -");
          console.log("------------------------------");
          connection.end();
          return;
      }
    });
}

// Menu that will allow the view to choose what they want to view
function viewMenu() {
  inquirer
    .prompt({
      type: "list",
      name: "viewMenu",
      message: "Which category would you like to search by?",
      choices: [
        "View Departments",
        "View Roles",
        "View all Employees",
        "Return to Main Menu",
      ],
    })
    .then((response) => {
      switch (response.viewMenu) {
        case "View all Employees":
          AllView();
          break;
        case "View Departments":
          DeptView();
          break;
        case "View Roles":
          roleView();
          break;
        case "Return to Main Menu":
          console.log("Returning");
          console.log("------------------------------")
          menu();
          break;
      }
    });
}

//Allows user to view all employees
function AllView() {
  console.log("-----------------------------");
  console.log("----Viewing All Employees----");
  console.log("-----------------------------");
  console.log("Viewing All Employees in Database...\n");
  //Telling what data points should be presented and how they will be titled in the table
  var searchAll = "SELECT e.id , e.first_name, e.last_name, r.title,  d.name as department, r.salary, CONCAT(m.first_name,' ',m.last_name) as manager from employee e ";
  //Including these left joins will allow the user to see the names of the different roles, departments, and managers rather than just their id's 
  searchAll += "LEFT JOIN roles r ON e.role_id = r.id ";
  searchAll += "LEFT JOIN departments d ON r.department_id = d.id ";
  searchAll += "LEFT JOIN employee m ON m.id = e.manager_id"

  connection.query(searchAll, function (err, data) {
    console.table(data);
    console.log("------------------------------")
    menu();
  })
}

//Allows user to view employees by department
function DeptView() {
  console.log("-----------------------------");
  console.log("---Viewing All Departments---");
  console.log("-----------------------------");
  let searchDept = "SELECT id, name FROM departments";
  connection.query(searchDept, function (err, data) {
    if (err) throw err;;
    console.log("All departments")
    console.table(data);
    menu();
  });
}

//Allows user to view employees by manager
function roleView() {
  console.log("-----------------------------");
  console.log("------Viewing All Roles------");
  console.log("-----------------------------");
  //Using SELECT DISTINCT we can prevent the same roles from appearing multiple times
  let searchRoles = "SELECT roles.id, title, salary, departments.id, departments.name AS department  FROM roles";
  searchRoles += " LEFT JOIN departments ON roles.department_id = departments.id ";
  connection.query(searchRoles, function (err, data) {
    if (err) throw err;

    console.log(data.length + ' roles found.');
    console.log("All roles")
    console.table(data);
    menu();
  });
}

//Allows user to add new department
function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "What is the name of this new Department?",
      validate: catchEmpty,
    })
    .then(async (response) => {
      connection.query(
        "INSERT INTO departments SET ?",
        {
          name: response.name,
        },
        function (error, res) {
          if (error) {
            throw error;
          }
          console.log("A new Department has been added to the system!\n");
          menu();
      });
    });
}

// //Allows user to add new role
function addRole() {
  let departments = {};
  connection.query("SELECT * FROM departments", (err, departments_data) => {
    for (var i = 0; i < departments_data.length; i++) {
      let dept = departments_data[i];
      departments[dept.name] = dept.id;
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the title of this new Role?",
          validate: catchEmpty,
        },
        {
          type: "input",
          name: "salary",
          message: "What is the Role's salary?",
          validate: catchEmpty,
        },
        {
          type: "list",
          name: "department",
          message: "What is this Role's department id?",
          choices: Object.keys(departments),
        },
      ])
      .then(async (response) => {
        console.log("Creating the profile for a new Role...\n");
        connection.query(
          "INSERT INTO roles SET ?",
          {
            title: response.title,
            salary: response.salary,
            department_id: departments[response.department],
          },
          function (error, res) {
            if (error) {
              throw error;
            }
            console.log("A new Role has been added to the system!\n");
            menu();
          }
        );
      });
  });
}


//Asks user if employee has manager
function addEmployee() {
  inquirer
    .prompt({
      type: "confirm",
      name: "checking",
      message: "Does this Employee have a manager?",
    })
    .then((response) => {
      if (response.checking) {
        //If they want a manager, it sends them to the yesManager function
        yesManager();
      } else {
        //If they don't want a manager, it sends them to the noManager function
        noManager();
      }
    });
}

//Allows the user to add an Employee if they have no manager
function noManager() {
  let roles = {};
  //This will pull from the roles table, grab the title of the role, make it the key of an object, and attach it's affilitated id to it
  connection.query("SELECT * FROM roles", (err, roles_data) => {
    for (var i = 0; i < roles_data.length; i++) {
      let role = roles_data[i];
      roles[role.title] = role.id;
    }
    inquirer
      .prompt([
        {
          type: "input",
          name: "first_name",
          message: "What is the Employee's first name?",
          validate: catchEmpty,
        },
        {
          type: "input",
          name: "last_name",
          message: "What is the Employee's last name?",
          validate: catchEmpty,
        },
        {
          type: "list",
          name: "role",
          message: "What is the Employee's role?",
          choices: Object.keys(roles),
        },
      ])
      .then(async (response) => {
        //Take the responses, including the id of role, and send it to the buildEmployee function
        buildEmployee(response, roles[response.role]);
      });
  });
}

//Allows user to add new Employee if they have a manager
function yesManager() {
  //Empty objects to play the data from the connection.querys
  let roles = {};
  let managers = {};
  //This will pull from the roles table, grab the title of the role, make it the key of an object, and attach it's affilitated id to it
  connection.query("SELECT * FROM roles", (err, roles_data) => {
    for (var i = 0; i < roles_data.length; i++) {
      let role = roles_data[i];
      roles[role.title] = role.id;
    }
    //This will pull from the roles table, grab the name of the employees, make it the key of an object, and attach it's affilitated id to it
    connection.query("SELECT * FROM employee", (err, employees_data) => {
      for (var i = 0; i < employees_data.length; i++) {
        let worker = employees_data[i];
        managers[`${worker.last_name}, ${worker.first_name}`] = worker.id;
      }
      inquirer
        .prompt([
          {
            type: "input",
            name: "first_name",
            message: "What is the Employee's first name?",
            validate: catchEmpty,
          },
          {
            type: "input",
            name: "last_name",
            message: "What is the Employee's last name?",
            validate: catchEmpty,
          },
          {
            type: "list",
            name: "role",
            message: "What is the Employee's role?",
            choices: Object.keys(roles),
          },
          {
            type: "list",
            name: "manager_id",
            message: "Who is the Employee's manager?",
            choices: Object.keys(managers),
          },
        ])
        .then(async (response) => {
          //Take the responses, including the ids of both manager and employee, and send them to the buildEmployee function
          buildEmployee(
            response,
            roles[response.role],
            managers[response.manager_id]
          );
        });
    });
  });
}

//Allows user to create new employee file, basis taken from activity 10
function buildEmployee(response, roleId, managerId) {
  console.log("Creating the profile for a new employee...\n");
  connection.query(
    "INSERT INTO employee SET ?",
    {
      first_name: response.first_name,
      last_name: response.last_name,
      role_id: roleId,
      manager_id: managerId,
    },
    function (error, res) {
      if (error) {
        throw error;
      }
      console.log("A new Employee has been added to the system!\n");
      menu();
    }
  );
}

//Allows user to update the Employee 
function updateEmployee() {
  //Empty objects to play the data from the connection.querys
  let roles = {};
  let employees = {};
  //This will pull from the roles table, grab the title of the roles, make it the key of an object, and attach it's affilitated id to it
  connection.query("SELECT * FROM roles", (err, roles_data) => {
    for (var i = 0; i < roles_data.length; i++) {
      let role = roles_data[i];
      roles[role.title] = role.id;
    }
    //This will pull from the employees table, grab the name of the employees, make it the key of an object, and attach it's affilitated id to it
    connection.query("SELECT * FROM employee", (err, employees_data) => {
      for (var i = 0; i < employees_data.length; i++) {
        let worker = employees_data[i];
        employees[`${worker.first_name} ${worker.last_name}`] = worker.id;
      }
      inquirer
        .prompt([
          {
            type: "list",
            name: "employee_id",
            message: "Which Employee do you wish to update?",
            choices: Object.keys(employees),
          },
          {
            type: "list",
            name: "role",
            message: "What is the Employee's new role?",
            choices: Object.keys(roles),
          },
        ])
        .then(async (response) => {
          //Take the responses, including the ids of both employee and role, and send them to the pushUpdate function
          pushUpdate(
            employees[response.employee_id],
            roles[response.role]
          );
        });
    });
  });
}

//Pushes up the changes of the Employee's role
function pushUpdate(employeeId, roleId) {
  console.log("Updating this Employee's role...\n");
  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [{
      role_id: roleId
    },
    {
      id: employeeId
    }],
    function (error, res) {
      if (error) {
        throw error;
      }
      console.log("This Employee's role has been updated!\n");
      menu();
    }
  );
};

function deleteEmployee(){
  employees= {};
  //This will pull from the employee table, grab the name of the employees, make it the key of an object, and attach it's affilitated id to it
  connection.query("SELECT * FROM employee", (err, employees_data) => {
    for (var i = 0; i < employees_data.length; i++) {
      let worker = employees_data[i];
      employees[`${worker.first_name} ${worker.last_name}`] = worker.id;
    }
    inquirer
      .prompt([
        {
          type: "list",
          name: "employee_id",
          message: "Which Employee do you wish to delete?",
          choices: Object.keys(employees),
        },
      ])
      .then(async (response) => {
        //Take the responses, including the id of employee, and send them to the pushDeleteEmp
        pushDeleteEmp(
          employees[response.employee_id],
        );
      });
  });
}
//Takes the user's input and deletes the specifed employee from the database
function pushDeleteEmp(employeeId){
  console.log("Deleting Employee from Database...\n");
  connection.query(
    "DELETE FROM employee WHERE  ?",
    {
      id: employeeId
    },
    function (error, res) {
      if (error) {
        throw error;
      }
      console.log("This Employee has been deleted! If they were a manager their connection to their subordinates in the database has been severed\n");
      menu();
    }
  );
}

function deleteRole(){
  //Empty object to display the data from the connection.querys
  let roles = {};
  //This will pull from the roles table, grab the title of the role, make it the key of an object, and attach it's affilitated id to it
  connection.query("SELECT * FROM roles", (err, roles_data) => {
    for (var i = 0; i < roles_data.length; i++) {
      let role = roles_data[i];
      roles[role.title] = role.id;
    }
      inquirer
        .prompt([
          {
            type: "list",
            name: "role",
            message: "Which Role do you wish to delete?",
            choices: Object.keys(roles),
          },
        ])
        .then(async (response) => {
          //Take the responses, including the role id, and send them to the removeRole function
          removeRole(
            roles[response.role]
          );
        });
    });
}

//Takes user's input and deletes the specified role from the database
function removeRole(rolesID){
  console.log("Deleting Role from Database...\n");
  connection.query(
    "DELETE FROM roles WHERE  ?",
    {
      id: rolesID
    },
    function (error, res) {
      if (error) {
        throw error;
      }
      console.log("This Role has been deleted! Any employee working within that role is now not assigned\n");
      menu();
    }
  );
}

//Lets the user choose which department they wish to delete
function deleteDepartment(){
  //Empty objects to play the data from the connection.querys
  let departments = {};
  //This will pull from the departments table, grab the title of the department, make it the key of an object, and attach it's affilitated id to it
  connection.query("SELECT * FROM departments", (err, dept_data) => {
    for (var i = 0; i < dept_data.length; i++) {
      let department = dept_data[i];
      departments[department.name] = department.id;
    }
      inquirer
        .prompt([
          {
            type: "list",
            name: "dept_id",
            message: "Which Department do you wish to delete?",
            choices: Object.keys(departments),
          },
        ])
        .then(async (response) => {
          //Take the responses, including the ids of department, and send them to the removeDept function
          removeDept(
            departments[response.dept_id]
          );
        });
    });
}

//Takes the user's input and deletes selected department
function removeDept(deptsID){
  console.log("Deleting Role from Database...\n");
  connection.query(
    "DELETE FROM departments WHERE  ?",
    {
      id: deptsID
    },
    function (error, res) {
      if (error) {
        throw error;
      }
      console.log("This Department has been deleted! Any role within that department has now been deleted\n");
      menu();
    }
  );
};

//This function will ask which employee you are trying to edit, and whether you still want them to have a manager
function questionManager(){
 //Empty objects to play the data from the connection.querys
 let employees = {};
   //This will pull from the employee table, grab the name of the employees, make it the key of an object, and attach it's affilitated id to it
   connection.query("SELECT * FROM employee", (err, employees_data) => {
     for (var i = 0; i < employees_data.length; i++) {
       let worker = employees_data[i];
       employees[`${worker.first_name} ${worker.last_name}`] = worker.id;
     }
     inquirer
       .prompt([
         {
           type: "list",
           name: "employee_id",
           message: "Which Employee do you wish to update?",
           choices: Object.keys(employees),
         },
         {
           type: "confirm",
           name: "managerConfirm",
           message: "does this Employee still have a manager?"
         }
       ])
       .then(async (response) => {
         //If they want the employee to have a manager, direct them to the changeManager function
         if(response.managerConfirm){
            changeManager(employees[response.employee_id]);
         }
         else{
          //If they don't want the employee to have a manager, set managerID to null and direct them to the updateManager function
           let managerID = null;
           updateManager(employees[response.employee_id], managerID)
         } 
       });
   });
}

function changeManager(employeeID){
   //Empty objects to play the data from the connection.querys
   let managers = {};
     //This will pull from the employees table, grab the name of the employees, make it the key of an object, and attach it's affilitated id to it
     connection.query("SELECT * FROM employee", (err, employees_data) => {
       for (var i = 0; i < employees_data.length; i++) {
         let worker = employees_data[i];
         managers[`${worker.last_name}, ${worker.first_name}`] = worker.id;
       }
       inquirer
         .prompt([
           {
             type: "list",
             name: "manager_id",
             message: "Who is the Employee's new manager?",
             choices: Object.keys(managers),
           },
         ])
         .then(async (response) => {
           //Take the responses, including the ids of manager and the previously decided upon employee, and send them to updateManager
           updateManager(employeeID, managers[response.manager_id]);
         });
     });
}

function updateManager(employeeID, managerID){
  //If the user chose that the employee and the manager are the same, it will automatically set the managerID to null
  if(employeeID===managerID){
    managerID = null
  };
  console.log("Updating this Employee's manager...\n");
  connection.query(
    "UPDATE employee SET ? WHERE ?",
    [{
      manager_id: managerID
    },
    {
      id: employeeID
    }],
    function (error, res) {
      if (error) {
        throw error;
      }
      console.log("This Employee's manager has been updated!\n");
      menu();
    }
  ); 
}

//This validation function will prevent the user from entering empty data
function catchEmpty(value) {
  if (value === "") {
    return "Please enter required information.";
  } else return true;
}

