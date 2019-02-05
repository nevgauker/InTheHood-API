const mongoose = require("mongoose");


exports.getCategories = (request, response, next) => {
                response.status(200).send({categories: ["clothing & accessories", "books, movies & games", "cosmetics & body care", "food & drinks", "household","garden & pets", "other"]});


};