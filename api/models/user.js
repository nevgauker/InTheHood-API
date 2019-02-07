var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = new Schema({
      email: { 
        type: String, 
        required: true, 
        unique: true, 
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    },
    password: { type: String, required: true },
    name: { type: String, required: true },
    userAvatar:String,
    phone:String,
    isWhatsapp:Number,
    facebook:String,
    pushToken:String
});

module.exports = mongoose.model('User',user);
