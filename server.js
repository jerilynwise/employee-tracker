//Dependancies
const inquirer = require('inquirer');
const mysql = require('mysql2');
const { allowedNodeEnvironmentFlags } = require('process');

//connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sy>=zAdT',
    database: 'tracker'
    });

//Once Connection is established move to the promptMenu
connection.connect(err => {
    if (err) throw err;
    console.log('connected as id' + connection.threadId);
    console.log(`
    ===============
    Employee Manager
    ===============
    `)
    promptMenu();
});

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









