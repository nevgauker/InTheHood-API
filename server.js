//var express = require('express');
//var app = express();
//var bodyParser = require('body-parser');
//var mongoose = require('mongoose');
//var bcrypt = require('bcrypt');
//var jwt = require('jsonwebtoken');
//var multer = require('multer');


const http = require('http');
const app = require('./app');


//var fs = require('fs');

//const CONNECTION_URL = process.env.MONGODB_URI || 'mongodb://localhost/inTheHood';

const PORT = process.env.PORT || 3004; 

const server = http.createServer(app);


app.listen(PORT, function() {
    console.log('In The Hood API running on port ',PORT);
});
