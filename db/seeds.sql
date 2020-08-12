USE EmployeeTracker_db;

-- Insert into Departments Table -- 
INSERT INTO departments (name)
VALUES ("Sales"), ("Product"), ("Marketing"), ("Accounting");

INSERT INTO roles (title, salary, department_id)
VALUES ("BDR", 40000, 1), ("Account Executive", 60000, 1), 
("Full-Stack Developer", 80000, 2), ("UX Designer", 60000, 2), 
("Advertising Coordinator", 60000, 3), ("Copywriter", 70000, 3), ("Media Researcher", 70000, 3), ("Content Writer", 50000, 3),
("Senior Accountant", 80000, 4), ("Junior Accountant", 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
values("Jason", "Stathum", 2, null), ("Chris", "Pratt", 1, 1), 
("Samuel L", "Jackson", 3, null), ("Dwayne", "Johnson", 4, null), 
("Robert", "Downey", 4, 4)

