//Dependancies
const inquirer = require('inquirer');
const db = require('./db/connection');
require('console.table');

const mysql = require('mysql2');



//promptMenu allows user to choose which field they would like to view, add, or update
const promptMenu = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'tasks',
            message: 'What would you like to do?',
            choices: [
                "View all Employees",
                "Add Employee",
                "Update Employee Role",
                "View All Roles",
                "Add Role",
                "View all Departments",
                "Add Department",
                "Quit"]
            }
        ]) .then((answers) => {
            const { tasks } = answers;

            if (tasks === "View all Departments") {
                viewAllDepartments();
            }

            if (tasks === "View All Roles") {
                viewAllRoles();
            }

            if (tasks === "View all Employees") {
                viewAllEmployees();
            }

            if (tasks === "Add Department") {
                addDepartment();
            }

            if (tasks === "Add Role") {
                addRole();
            }

            if (tasks === "Add Employee") {
                addEmployee();
            }

            if (tasks === "Update Employee Role") {
                updateEmployeeRole();
            }

            if (tasks === "Quit") {
                connection.end()
            };
        });
    };

    //Pulls department id and department name 
    function viewAllDepartments() {
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, rows) => {
            if (err) console.log(err)
            console.table(rows);
            promptMenu();
        });
    };

    //Pulls role information and turns the department id in role table into the name from the department table
    function viewAllRoles() {
        const sql = `SELECT role.id, role.title, role.salary, department.name AS department 
        FROM role
        LEFT JOIN department ON role.department_id = department.id`
        db.query(sql, (err, rows) => {
            if (err) console.log(err)
            console.table(rows);
            promptMenu();
        });
    };

    //Pulls the employee first and last name from employee table, then ties the role table in to get title, salray, and depart name from the depart table, 
    //pull manager first name and last name together and put on the left side table
    function viewAllEmployees() {
     const sql = `SELECT employee.id,
      employee.first_name, 
      employee.last_name, 
      role.title, 
      role.salary, 
      department.name AS department,
      CONCAT (manager.first_name, manager.last_name) AS manager
     FROM employee
     LEFT JOIN role ON employee.role_id = role.id 
     LEFT JOIN department ON role.department_id = department.id 
     LEFT JOIN employee manager ON employee.manager_id = manager.id
     `
        db.query(sql, (err, rows) => {
            if (err) console.log(err)
            console.table(rows);
            promptMenu();
        });
    };

    //function to add a department into the database
    function addDepartment() {
        inquirer.prompt([
            {
            type: 'input',
            name: 'addDepart',
            message: 'What deparment do you want to add?',
            validate: addDepart => {
                if (addDepart) {
                    return true;
                }else {
                    console.log('Please enter a department');
                    return false;
                }
            }
        }]).then(answers => {
            let department_name = answers.addDepart
            const sql = `INSERT INTO department (name) VALUES (?)`;
            const params = [department_name]
            db.query(sql, params, (err, rows) => {
                if (err) console.log(err)
                console.table(rows);
                viewAllDepartments();
            });
        })
    }

    //function to add role- name, salary, and department it belongs to
    //currently dept is a number would like to make into seeing all of the departments to choose from
    function addRole() {
        inquirer.prompt([
            {
            type:'input',
            name:'title',
            message: 'What role would you like to add?',
            },
            {
                type: 'input',
                name: 'salary',
                message: 'What salary does this role make?',
            },
            {
                type:'input',
                name: 'department_id',
                message: 'What department does this role report to?',
            }]).then(answers => {
                let title = answers.title 
                let salary = answers.salary
                let department_id = answers.department_id
                const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`
                const params = [title, salary, department_id]
                db.query(sql, params, (err,rows) => {
                    if (err) console.log(err)
                    console.table(rows);
                    viewAllRoles()
                });
        })
    }


 

    //function to update an existing employee, pulls choices into an array and then calls the update role function below
    function updateEmployeeRole() {
       const sql = `SELECT employees.id, employees.first_name, employees.last_name FROM employees`
        db.query(sql, (err, rows) => {
            if (err) console.log(err);
            const employees = rows.map(({id, first_name, last_name}) => ({
                value: id, name: `${first_name} ${last_name}`
            }))
            inquirer.prompt ([{
                type:'list',
                name: 'employee_id',
                message: `Which employees role do you want to update?`,
                choices: employees,
            }]).then (answers => {
                let employee_id = answers.employee_id
                const sql = `SELECT roles.id, roles.title, roles.salary FROM roles`
                db.query(sql, (err, rows) => {
                    let roleChoices = rows.map (({id, title}) => ({
                        value: id, name: `${title}`
                    }))
                    updateRole(employee_id, roleChoices)
                })
            }) 
        });
    }

    //take the array made in updateEmployee and pushes t the database to update the role
    function updateRole(employee_id, roleChoices) {
        inquirer.prompt ([{
            type:'list',
            name: 'role',
            message: `What is the updated role?`,
            choices: roleChoices,
        }])
        .then(answers => {
            let sql = 'UPDATE employees SET role_id = ? WHERE id = ?'
            const params = [answers.role, employee_id]
            db.query(sql, params, (err, rows) => {
                if (err) console.log(err);
                viewAllEmployees();
            })
        })
    }
     










    promptMenu();