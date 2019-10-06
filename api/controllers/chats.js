const mongoose = require("mongoose");

const Chat = require("../models/chat");

const Message = require("../models/message");


exports.fecthChat = (request, response, next) => {
  
    const itemId = request.body.itemId;
    const itemOwnerId = request.body.itemOwnerId;
    const otherUserId = request.body.otherUserId;

    Chat.findOne({ itemId : itemId, itemOwnerId : itemOwnerId, otherUserId : otherUserId }, function(err, chat) {
        if (err) {
            response.status(500).send({error: err});
        } else {
            response.send({chat : chat,
                           message: 'Fetching chat successful'
                          });
        }
    });
    
};

exports.fecthAllChatsForItem = (request, response, next) => {
  
    const itemId = request.body.itemId;
    const itemOwnerId = request.body.itemOwnerId;

    Chat.find({ itemId : itemId, itemOwnerId : itemOwnerId }, function(err, chats) {
        if (err) {
            response.status(500).send({error: err});
        } else {
            response.send({chats : chats,
                           message: 'Fetching chats for item successful'
                          });
        }
    });
    
};



exports.createChat = (request, response, next) => {

      var chat = new Chat({
        itemId: request.body.itemId,
        itemOwnerId: request.body.itemOwnerId,
        otherUserId: request.body.otherUserId,
         messages:[]
    });

    chat.save(function(err, savedChat) {
        if (err) {
            response.status(500).send({ error:err });
        } else {
            response.send({chat: savedChat,
                           message: 'Created chat successful'});
        }
    });
    
};

exports.addMessageToChat = (request, response, next) => {
    
        //chat id
        const _id = request.params.id;
    
     Chat.findById(_id, function(err, chat){
        if (err) {
            response.status(500).send({error: err});
        } else {
            const userId = request.body.userId;
            const text = request.body.text;

            var message = {"text" : request.body.text, "userId" : userId };
           // chat.messages.push(message);
            chat.messages.unshift(message);

            chat.save(function(err, savedChat) {
                if (err) {
                    response.status(500).send({ error:err });
                } else {
                    response.send({ chat : savedChat, 
                                 message: 'Updating chat successful' });
                }
            });  
        }
    });

 
    
};


