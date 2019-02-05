const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const itemsRoutes = require("./api/routes/items");
const usersRoutes = require('./api/routes/users');
const categoriesRoutes = require('./api/routes/categories');

const fs = require('fs');


const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb://localhost/inTheHood';

var db = mongoose.connect(CONNECTION_URL);


const uploadsDir = './uploads';

const usersImagesDir = './uploads/users';
const itemsImagesDir = './uploads/items';

if (!fs.existsSync(uploadsDir)){
    fs.mkdirSync(uploadsDir);
}

if (!fs.existsSync(usersImagesDir)){
    fs.mkdirSync(usersImagesDir);
}
if (!fs.existsSync(itemsImagesDir)){
    fs.mkdirSync(itemsImagesDir);
}



app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
//app.use('uploads/users', express.static('uploads/users'));

app.use('bla', express.static('bla'));

app.use('uploads', express.static('uploads'));



app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH");
    next();
});


app.get('/uploads/items/:file', function (req, res){
    file = req.params.file;
    var img = fs.readFileSync(__dirname + "/uploads/items/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');

});

app.get('/uploads/users/:file', function (req, res){
    file = req.params.file;
    var img = fs.readFileSync(__dirname + "/bla/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');

});




//app.use((req, res, next) => {
//  res.header("Access-Control-Allow-Origin", "*");
//  res.header(
//    "Access-Control-Allow-Headers",
//    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
//  );
//  if (req.method === "OPTIONS") {
//    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
//    return res.status(200).json({});
//  }
//  next();
//});


// Routes which should handle requests
app.use("/users", usersRoutes);
app.use("/items", itemsRoutes);
app.use("/categories", categoriesRoutes);


//app.use((req, res, next) => {
//    
// 
//    
//  const error = new Error("Not found");
//  error.status = 404;
//  next(error);
//});
//
//app.use((error, req, res, next) => {
//  res.status(error.status || 500);
//  res.json({
//    error: {
//      message: error.message
//    }
//  });
//});

module.exports = app;


