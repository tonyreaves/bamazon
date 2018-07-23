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


//displays inventory from database
const showProducts = new Promise((resolve, reject) => {
    connection.query("SELECT item_id, product_name, price FROM products", function (err, result, fields) {
        if (err) {
            return reject(err);
        }

        resolve(result);
    });
});

//.then makes sure prompt comes after inventory is shown
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
                filter: Number
            },
            {
                type: 'input',
                name: 'quantity',
                message: 'Enter how many you want to buy.',
                filter: Number
            }
        ]).then(function (input) {
            var item = input.item_id;
            var quantity = input.quantity;


            // Check the database
            var theQuery = 'SELECT * FROM products WHERE ?';

            connection.query(theQuery, { item_id: item }, function (err, data) {
                if (err) throw err;

                // Makes sure user didn't select invalid ID
                if (data.length === 0) {
                    console.log("Invalid Item ID. Choose an ID between 1 and 10");
                    showProducts();

                } else {
                    var productData = data[0];

                    // checks if there's enough in stock to fulfill customer's order
                    if (quantity <= productData.stock_quantity) {
                        console.log("Your order has been placed.");

                        // Update the database query
                        var updateTheQuery = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;
                        // console.log('updateQueryStr = ' + updateQueryStr);

                        // Update the inventory
                        connection.query(updateTheQuery, function (err, data) {
                            if (err) throw err;

                            console.log("Your total is $" + productData.price * quantity);
                            console.log("Thank you for shopping with Bamazon!");

                            // End the database connection
                            connection.end();
                        })
                    } else {
                        console.log("Sorry, we only have " + productData.stock_quantity + " in stock.");
                        connection.end();
                    }
                }
            })
        })
    }
    )
