INSERT INTO departments (name)
VALUES
('Enginnering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO roles (title, salary, department_id)
VALUES
('Lead Engineer', 150000, 1),
('Software Engineer', 120000, 1),
('Account Manager', 160000, 2),
('Accountant', 125000, 2),
('Legal Lead', 250000, 3),
('Lawyer', 190000, 3),
('Sales Lead', 100000, 4),
('Sales Person', 80000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Bruce', 'Banner', 1, null ),
('Shuri', 'Panther', 2, 1),
('Tony', 'Stark', 3, null),
('JARVIS', 'Robot', 4, 3),
('Pepper', 'Potts', 5, null),
('Jane', 'Foster', 6, 5),
('Rocket', 'Raccoon', 7, null),
('Korg', 'Waitiki', 8, 7);
