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



const showProducts = new Promise((resolve, reject) => {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, result, fields) {
        if (err) {
            return reject(err);
        }

        resolve(result);
    });
});

showProducts
    .then((result) => {
        for (var i = 0; i < result.length; i++) {
            console.log(result[i]);
        }
    })
    .then(() => {
        inquirer.prompt([
            {
                type: 'input',
                name: 'item_id',
                message: 'Enter the item ID of the product you want to buy.',
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'Enter the quantity you want to buy.',
            }
        ]).then(function (input) {
            var item = input.item_id;
            var quantity = input.quantity;
            if (result.stock_quantity < connection.stock_quantity) {
                console.log("Sorry, we don't have that many in stock.")
            }
            else {
                console.log("You ordered " + parseFloat(result.stock_quantity) + " of item number " + parseFloat(result.item_id) + ".");
            }
        })
    });

