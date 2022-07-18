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

            if (tasks === "View all Employees") {
                viewAllEmployees();
            }

            if (tasks === "Add Employee") {
                addEmployee();
            }

            if (tasks === "Update Employee Role") {
                updateEmployeeRole();
            }

            if (tasks === "View All Roles") {
                viewAllRoles();
            }

            if (tasks === "Add Role") {
                addRole();
            }

            if (tasks === "View all Departments") {
                viewAllDepartments();
            }

            if (tasks === "Add Department") {
                addDepartment();
            }

            if (tasks === "Quit") {
                connection.end()
            };
        });
    };


    function viewAllEmployees() {
     const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary, departments.name AS department FROM employees 
     LEFT JOIN roles ON employees.role_id = roles.id 
     LEFT JOIN departments ON roles.department_id = departments.id `
        db.query(sql, (err, rows) => {
            if (err) console.log(err)
            console.table(rows);
            promptMenu();
        });
    }


    function viewAllDepartments() {
        const sql = `SELECT * FROM departments`;
        db.query(sql, (err, rows) => {
            if (err) console.log(err)
            console.table(rows);
            promptMenu();
        });
    };


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