# Employee_Tracker_Assign12

# Description 
This assignment takes mySQL, javascript and node.js and taught me how to build a terminal-based application that can connect to a database, allowing the application to reference, edit, add or delete information from SQL. 

Upon following the proper usage steps (see below) the application will allow the user to add departments, roles and employees to the database, view those different categories and update a chosen Employee's role. For bonus work I was also able to make it so that the user could update the chosen employee's manager and delete data from any of the three chosen categories (employee, role or department).

I built this project in order to test my newfound knowledge of SQL and apply it into creating an inquirer based application within the terminal.

# Table of Contents
1. [Process](#Process)
2. [Issues](#Issues)
3. [Usage](#Usage)
4. [Issues](#Issues)
5. [Mastered](#Mastered)
6. [Improvements](#Improvements)
7. [Video](#Video)

# Process
* To begin, I built the Schema for mySQL and a seed that would go along with it. Within the schema i built three tables: Departments, Roles, and Employee. I tied Roles to Department via a foreign key using department_id, and I did the same thing for Employee and Roles. In order to identify who was managing which employee, I used a foreign key and attached it to the employee_id, so that it would reference who was managing whom. 
* From there I called upon the schema using the EmployeeTracker.js file I built, using a boilerplate provided in class.
* Then using inquirer I built a menu that would allow the user to decide which pre-designed function they wanted to accomplish. 
* I then built three different functions that would present the user with a view of the employee, roles and departments table. Several of them I used a left join so that it would bring in the necessecary info that was located in seperate tables. Credit must be given to fellow student Yakini with the table that showed the employee's, she presented it during august 10th's office hours and it gave me the basis upon which to build my own. 
* From there I created a series of function that would allow the user to add a new role, department or function. In order to accomplish this I used connection.query to create objects that would store the necessecary information that ties the data to different tables (ex: what role does the employee have). From there I used connection.query to INSERT the info into the appropriate table. 
* For updating the employee roles and manager I used a very similiar method, just that in the connection.query I used UPDATE instead of INSERT. 
* Finally, I once again used similar methods to delete chosen data from department, role, and employee (using empty objects that would be filled by connection.query) except this time in the connection.query I used DELETE to remove the chosen information. In this instance I had to edit the schema's language to allow certain parent elements to be deleted, should the user choose to do so. 

# Usage 
* The user nust first download the repo from github 
* From there take the EmployeeTracker.sql within the db folder and place it within their MySQLWorkbench, if they want any predesigned data they can take the seeds.sql and upload it to the Workbench.
* Then from there they need to go into the EmployeeTracker.js and place their personal password for workbench on line 14. 
* From there they need to go into the terminal within the Employee_Tracker_Assign12 and use npm install to install the specified npms within package.json
* The only thing left to do is go onto the terminal within the Employee_Tracker_Assign12, enter node EmployeeTracker.js, and then the application will begin.

# Issues
* Perhaps the biggest issue I had was finding a way to make data within mySQL appear in Inquirer. With the help of a learning assistant I found that the easiest was for me was to create an empty object, use connection.query to call upon the desired information, use a for loop to draw out the data, and then insert said data within the previously empty object. From there all that was needed was to use object.keys within inquirer to make the object appear as a list the user could sort through. 
* An issue with this overall project was the size of the EmployeeTracker.js. At it's current length it is pushing about 700 lines of code, which can be quite difficult to sort through. In order to improve this I independently tried to research how to build a connection.js file, which would have helped clean up the code significantly. However, while the concept was similar to things we have done in the past, using inquirer and mySQL made this process far more difficult. After talking with the instructor and discovering that we would learn how to build a connection.js at the end of this week I decided to focus my time elsewhere. 
* A final issue I had was figuring out how to display tables using left join within my javascript. This was solved by attending office hours, where fellow student Yakini was sharing her code in order to solve some of her own issues. During that time I was able to see how she connected her different tables together in order to create a really refined display for employees, so proper credit must be given to her as my employees table was based upon her design. 

# Mastered
* How to use inquirer, mySQL 
* How to use connection.query to call upon the selected tables
* How to use empty objects to place the selected data from connection.query within.
* How to use object.keys to show the selected objects within inquirer.
* How to use left join to create tables using data from different mySQL tables

# Improvements 
There are two bonus items I would like to work on that would improve the capabilities of this applications:
* View employees by manager
* View the total utilized budget of a department -- ie the combined salaries of all employees in that department

# Video
![Gif of the Video Demo](./demo/EmployeeTrackerDemo.gif)
* [Link to full video demo](https://drive.google.com/file/d/1wKlwPzO13AdJw4T0VzBf0dj9AAnIvPnK/view?usp=sharing)
