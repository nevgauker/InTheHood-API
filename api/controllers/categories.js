const mongoose = require("mongoose");


exports.getCategories = (request, response, next) => {
                response.status(200).send({categories: ["All","Clothing","Accessories","Books","Movies", "Games", "Cosmetics", "Food", "Drinks", "Household","Garden","Pets", "Other"]});


};