const mysql = require("mysql");
const inquirer = require("inquirer");
const prompt = require("prompt");

// create the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 8889,

    // Username
    user: "root",

    // Password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    // run start function after connection made to prompt user

});