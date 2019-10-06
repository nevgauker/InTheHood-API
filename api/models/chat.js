var mongoose = require('mongoose');
var Schema = mongoose.Schema;

const Message = require("./message");

  
var message = new Schema({
    itemId:{ type: String, required: true },
    itemOwnerId:{ type: String, required: true },
    otherUserId:{ type: String, required: true },
    messages:[]

});

module.exports = mongoose.model('Chat',message);
