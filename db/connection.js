const mysql = require('mysql2');


//connection to database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Sy>=zAdT',
    database: 'tracker'
    },
    console.log('Connected to the employee_tracker database')
    );

module.exports = db;