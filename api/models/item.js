var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var item = new Schema({    
    ownerId:{ type: String, required: true },
    title:{ type: String, required: true },
    itemImage: { type: String, required: true },
    price: Number,
    lat:String,
    long:String,
    location:String,
    canBargin:Boolean,
    currency:String,
    locationName:String,
    location: { type: {
        type: String,
        enum: 'Point',
        default: 'Point'
      },
      coordinates: {
        type: [Number],
        default: [0, 0]
      },
      index: {
          type: String,
          default: '2dsphere'}},
    
    wantIds:[String],
    type:String,
    category:String,
    comments:String
});

module.exports = mongoose.model('Item',item);
