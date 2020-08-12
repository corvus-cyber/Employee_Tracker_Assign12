DROP DATABASE IF EXISTS EmployeeTracker_db;
CREATE DATABASE EmployeeTracker_db;

USE EmployeeTracker_db;

CREATE TABLE departments (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    name VARCHAR(30) NOT NULL,
    PRIMARY KEY(id)
);

CREATE TABLE roles (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL(10, 2) NOT NULL,
    PRIMARY KEY(id),
    department_id INTEGER(10) NOT NULL,
    FOREIGN KEY(department_id) REFERENCES departments(id) ON DELETE CASCADE
);

CREATE TABLE employee (
    id INTEGER(10) AUTO_INCREMENT NOT NULL,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER(10) NOT NULL,
    manager_id INTEGER(10),
    PRIMARY KEY(id),
    FOREIGN KEY(role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employee;

-- Shows all roles, even if we don't know the department
-- LEFT JOIN returns all of the values from the left table, and the matching ones from the right table
SELECT title, salary
FROM roles
LEFT JOIN departments ON roles.department_id = departments.id;

-- Shows all employees, even if we don't know the role
SELECT first_name, last_name
FROM employee
LEFT JOIN roles ON employee.role_id = role.id;

