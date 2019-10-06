//const mongoose = require("mongoose");
//
//const Message = require("../models/message");
//
//
//exports.fecthMessagesForItem = (request, response, next) => {
//    //item id
//    const _id = request.params.id;
//    Message.find({ itemId : _id }, function(err, messages) {
//        if (err) {
//            response.status(500).send({error: err});
//        } else {
//            response.send({messages : messages,
//                           message: 'Fetching messages successful'
//                          });
//        }
//    });
//    
//};
//
//exports.fecthMessagesForOwner = (request, response, next) => {
//    //ownetr id
//    const _id = request.params.id;
//    Message.find({ ownerId : _id }, function(err, messages) {
//        if (err) {
//            response.status(500).send({error: err});
//        } else {
//            response.send({messages : messages,
//                           message: 'Fetching messages successful'
//                          });
//        }
//    });
//    
//};
//
//exports.addMessage = (request, response, next) => {
//    
//      var message = new Message({
//        ownerId: request.body.ownerId,
//        itemId: request.body.itemId,
//        text: request.body.text,
//    });
//
//    message.save(function(err, savedMessage) {
//        if (err) {
//            response.status(500).send({ error:err });
//        } else {
//            response.send(savedMessage);
//        }
//    });
//
//    
//   
//    
//};
//
exports.createMessage = (ownerId, itemId, text) => {
    
       var message = new Message({
        ownerId: request.body.ownerId,
        itemId: request.body.itemId,
        text: request.body.text,
    });
    
    return message;
               
};
//
//
