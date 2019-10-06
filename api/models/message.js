var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var message = new Schema({
    ownerId:{ type: String, required: true },
    itemId:{ type: String, required: true },
    text: { type: String, required: true }
});

module.exports = mongoose.model('Message',message);
