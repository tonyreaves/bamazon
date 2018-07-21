var mysql = require("mysql");
// var inquirer = require("inquirer");
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

});



const showProducts = new Promise((resolve, reject) => {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, result, fields) {
        if (err) {
            return reject(err);
        }

        resolve(result);
    });
});

showProducts
    .then((result) => { console.log(result); })

    .then(() => {
        prompt.get({
            properties: {
                item_id: {
                    description: ("Enter the Item ID of the product you want to buy.")
                },
                stock_quantity: {
                    description: ("How many would you like to buy?")
                }
            }
        }, function (err, result) {
            if (result.stock_quantity < connection.stock_quantity) {
                console.log("Sorry, we don't have that many in stock.")
            }
            else {
                console.log("You ordered " + result.stock_quantity + " of item number " + result.item_id + ".");
            }
        })
    });

    