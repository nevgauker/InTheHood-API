const express = require("express");
const app = express();
const morgan = require("morgan");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const itemsRoutes = require("./api/routes/items");
const usersRoutes = require('./api/routes/users');
const categoriesRoutes = require('./api/routes/categories');

const fs = require('fs');

const pushNotifications = require('node-pushnotifications');


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



const settings = {
    apn: {
        token: {
            key: './certs/AuthKey_NP9P5CB9SH.p8', // optionally: fs.readFileSync('./certs/key.p8')
            keyId: 'ABCD',
            teamId: 'EFGH',
        },
        production: false 
    }

};
const push = new pushNotifications(settings);


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
    var img = fs.readFileSync(__dirname + "/uploads/users/" + file);
    res.writeHead(200, {'Content-Type': 'image/jpeg' });
    res.end(img, 'binary');

});


// Routes which should handle requests
app.use("/users", usersRoutes);
app.use("/items", itemsRoutes);
app.use("/categories", categoriesRoutes);


//create default admin if needed
const User = require("./api/models/user");
var bcrypt = require('bcrypt');
User.findOne({ email:"nevgauker@gmail.com"},function(err, user) {
    if (user) {
        console.log("admin user already exist")
    }else {
        bcrypt.hash("123456", 10,(hashError, hash) => {
            if (hashError) {
                console.log("error creating admin");
            }else {
                var user = new User();
                user.name = "Admin";
                user.email = "nevgauker@gmail.com"
                user.password = hash;
                user.isAdmin = true;
                user.save(function(saveError, savedUser) {
                    if (err) {
                        console.log("error creating admin");
                    } else {
                        console.log("Admin user was created");
                    }
                });
            }
        });
    }

});



module.exports = app;


