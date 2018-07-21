var mysql = require("mysql");
var inquirer = require("inquirer");
var prompt = require("prompt");

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
    start();
    connection.query("SELECT item_id, product_name, price FROM bamazon", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
    });
});



function showProducts() {


}