const mongoose = require("mongoose");
const Item = require("../models/item");

exports.deleteItem = (request, response, next) => {

    Item.findOne({_id :request.body.id},function(err, item) {
        if (err) {
            response.status(500).send({error: "Item doesnt exist"});
        } else {
            if (item) {
                Item.remove({_id :request.body.id},function(err) {
                    if (err) {
                        response.status(500).send({error: "Error deleting an item"});
                    }else {
                        response.status(200).send({error: "Item was deleted"});
                    }   
                });
            }else {
                response.status(500).send({error: "Problem with item object"});
            }
        }
    });
};



exports.addItem = (request, response, next) => {

    var item = new Item({
        title: request.body.title,
        price: request.body.price,
        ownerId: request.body.ownerId,
        itemImage:  request.file.path,
        canBargin:  request.body.canBargin,
        currency: request.body.currency,
        locationName: request.body.locationName,
        location: {  type: "Point", coordinates: [request.body.longitude, request.body.latitude]},
        type: request.body.type, 
        category: request.body.category,    
        comments: request.body.comments,
        barterFor: request.body.barterFor
    });

    item.save(function(err, savedItem) {
        if (err) {
            response.status(500).send({ error:err });
        } else {
            response.send(savedItem);
        }
    });
};





exports.updateItem = (request, response, next) => {

    const _id = request.params.id;
    Item.findById(_id, function(err, item) {
        if (err) {
            response.status(500).send({error: "Could not fetch item"});
        } else {
            if (item!=null) {
                //uupdate item data
                let title = request.body.title;
                let price = request.body.price;
                let currency = request.body.currency;
                let canBargin = request.body.canBargin;
                let latitude = request.body.latitude;
                let longitude = request.body.longitude;
                let locationName = request.body.locationName;
                let type =  request.body.type; 
                let category = request.body.category;  
                let comments = request.body.comments;

                // add user id that want it
                let wantId = request.body.wantId;

                if (title!=null) {
                    item.title = title;
                }
                if (price!=null) {
                    item.price = price;
                }
                if (canBargin!=null) {
                    item.canBargin = canBargin;
                }
                if (currency!=null) {
                    item.currency = currency;
                }

                if ( request.file != null) {
                    item.itemImage = request.file.path;
                }
                if (locationName != null) {
                    item.locationName = locationName;
                }

                if (longitude != null && latitude != null) { 
                    item.location.coordinates = [longitude, latitude];
                }

                if (type != null) {
                    item.type = type;
                }
                if (category != null) {
                    item.category = category;
                }
                if (comments != null) {
                    item.comments = comments;
                }
                if (wantId != null) {
                    item.wantIds.push(wantId);
                }

                item.save(function(err, savedItem) {
                    if (err) {
                        response.status(500).send({error:err});
                    } else {
                        response.status(200).send({ message: "Updated item", item: savedItem });
                    }
                });  


            }else {
                response.status(500).send({error: "Could not fetch item"});
            }
        }
    });
};



exports.fetchItemsByDistance = (request, response, next) => {

    const location = request.body.location;
    var distance = request.body.distance;
    
    var params = {};

    if (request.body.type && request.body.type != "All"){
        params.type = request.body.type;
    }
    if (request.body.category && request.body.category != "All"){
        params.category = request.body.category;
    }
    
    if (distance > 0){
        distance = distance * 1000;

        params.location = {
            $near: {   $geometry: {  type: "Point",
                                   coordinates: [location.longitude, location.latitude] },
                    $maxDistance: distance

                   }
        };
        
    }
    
    Item.find(params, function(err, items) {
            if (err) {
                response.status(500).send({error: err});
            } else {
                response.send({items : items,
                               message: 'Fetching items successful'
                              });
            }
        });
};










