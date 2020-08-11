var inquirer = require("inquirer");
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

module.exports = menu;