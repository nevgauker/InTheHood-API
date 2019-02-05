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

//var storage = multer.diskStorage({
//    destination: function(req, file, cb) {
//        cb(null, './uploads/');
//    },
//    filename: function(req, file, cb) {
//        cb(null, new Date().toISOString() + file.originalname);
//    }
//});
//
//var fileFilter = (req, file, cb) => {
//    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//        cb(null, true);
//    }else {
//        cb(null, false);
//    }
//};
//
//var upload = multer({ storage: storage,
//                     limits: { fileSize: 1024 * 1024 * 5 },
//                     fileFilter: fileFilter
//                    });
//
//
//var checkAuth = require('./check-auth');
//
//
//const jwt_key = "secret";
//

//var db = mongoose.connect(CONNECTION_URL);


//var Item = require('./model/item');
//var User = require('./model/user');



//Allow all requests from all domains & localhost
//app.all('/*', function(req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type, Accept");
//    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH");
//    next();
//});


//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded({extended: false}));
//app.use('uploads', express.static('uploads'));


//Auth
//
//app.post('/user/signin', function(request, response) {
//
//    User.findOne({ email:request.body.email },function(err, user) {
//        if (user) {
//            bcrypt.compare(request.body.password,user.password,(err, result) => {
//                if (err) {
//                    response.status(401).send({error:'Auth failed'});
//                }
//                if (result) {
//                    const token = jwt.sign( {
//                        email: user.email,
//                        userId: user._id
//                    },jwt_key, { expiresIn: "24h" });
//                    response.status(200).send({message: 'Auth successful',
//                                               token: token,
//                                               user: user });
//                }else {
//                    response.status(401).send({error:'Auth failed'});
//                }
//            });
//
//
//        }else {
//            response.status(401).send({error:'Auth failed'});
//        }
//
//    });
//
//
//
//});
//
//app.post('/user/signout', function(request, response) {
//    response.status(200).send({ message: 'Sign out successful' });
//
//    //TBD invalidate token
//
//
//});
//
//
//
//app.post('/user/signup', function(request, response) {
//
//    User.findOne({email: request.body.email},function(err, user) {
//        if (err) {
//            response.status(500).send({error: "Could not fetch user"});
//        } else {
//            if (user) {
//                response.status(409).send({error:'Mail exists'});
//            }else {
//                bcrypt.hash(request.body.password, 10,(hashError, hash) => {
//                    if (hashError) {
//                        response.status(500).send({error:'Auth failed'});
//                    }else {
//                        var user = new User();
//                        user.name = request.body.name;
//                        user.email = request.body.email;
//                        user.password = hash;
//                        user.save(function(saveError, savedUser) {
//                            if (err) {
//                                response.status(500).send({error:'Auth failed'});
//                            } else {
//                                const token = jwt.sign( {
//                                    email: savedUser.email,
//                                    userId: savedUser._id
//                                },jwt_key, { expiresIn: "1h" });
//                                response.status(200).send({message: 'Auth successful',
//                                                           token: token,
//                                                           user: savedUser });
//                            }
//                        });
//                    }
//                });
//            }
//        }
//    });
//});
//
//
////User
//
//app.post('/user/me', checkAuth,  function(request, response) {
//
//    User.findOne({email :request.body.email}, function(err, user) {
//        if (err) {
//            response.status(500).send({error: "Could not fetch user"});
//        } else {
//            if (user) {
//                response.status(200).send({user : user,
//                                           message: 'Fetching user successful'
//                                          });
//            }else {
//                response.status(500).send({error: "Could not fetch user"}); 
//            }
//        }
//    });
//});
//
//app.get('/user', checkAuth, function(request, response) {
//
//    User.find({},function(err, users) {
//        if (err) {
//            response.status(500).send({error: "Could not fetch users"});
//        } else {
//            response.send({items : users,
//                           message: 'Fetching users successful'
//                          });
//        }
//    });
//});
//
//app.get('/user/:id', checkAuth, function(request, response) {
//
//    User.findById(request.params.id, function(err, user) {
//        if (err) {
//            response.status(500).send({error: "Could not fetch user"});
//        } else {
//            response.send({user : user,
//                           message: 'Fetching user successful'
//                          });
//        }
//    });
//});
//
//
//
//
//app.patch('/user/:id', checkAuth, upload.single('userAvatar'), function(request, response) {
//
//    const _id = request.params.id;
//
//    User.findById(_id, function(err, user) {
//        if (err) {
//            response.status(500).send({error: "Could not fetch user"});
//        } else {
//            if (user!=null) {
//                let name = request.body.name;
//                let email = request.body.email;
//                let phone = request.body.phone;
//                let isWhatsapp = request.body.isWhatsapp;
//                let facebook = request.body.facebook;
//                
//                if (name!=null) {
//                    user.name = name;
//                }
//                if (email!=null) {
//                    user.email = email;
//                }
//                if (phone!=null) {
//                    user.phone = phone;
//                }
//                if (isWhatsapp!=null) {
//                    user.isWhatsapp = isWhatsapp;
//                }
//                  if (facebook!=null) {
//                    user.facebook = facebook;
//                }
//                
//                if ( request.file != null) {
//                    user.userAvatar = request.file.path;
//                }
//
//
//                user.save(function(err, savedUser) {
//                    if (err) {
//                        response.status(500).send({error:err});
//                    } else {
//                        response.status(200).send({ message: "Updated user", user: savedUser });
//                    }
//                });  
//
//
//            }else {
//                response.status(500).send({error: "Could not fetch user"});
//            }
//
//
//
//        }
//    });
//});
//
//
//app.delete('/user', checkAuth, function(request, response) {
//
//    User.findOne({_id :request.body.id},function(err, user) {
//        if (err) {
//            response.status(500).send({error: "User doesnt exist"});
//        } else {
//            if (user) {
//                User.remove({_id :request.body.id},function(err) {
//                    if (err) {
//                        response.status(500).send({error: "Error deleting a user"});
//                    }else {
//                        response.status(200).send({error: "User was deleted"});
//                    }   
//                });
//            }else {
//                response.status(500).send({error: "Problem with user object"});
//            }
//        }
//    });
//});

//Item
//
//app.delete('/item', checkAuth, function(request, response) {
//
//    Item.findOne({_id :request.body.id},function(err, item) {
//        if (err) {
//            response.status(500).send({error: "Item doesnt exist"});
//        } else {
//            if (item) {
//                Item.remove({_id :request.body.id},function(err) {
//                    if (err) {
//                        response.status(500).send({error: "Error deleting an item"});
//                    }else {
//                        response.status(200).send({error: "Item was deleted"});
//                    }   
//                });
//            }else {
//                response.status(500).send({error: "Problem with item object"});
//            }
//        }
//    });
//});
//
//app.post('/item/add', checkAuth, upload.single('itemImage'), function(request, response) {
//
//    var item = new Item({
//        title: request.body.title,
//        price: request.body.price,
//        ownerId: request.body.ownerId,
//        itemImage:  request.file.path,
//        canBargin:  request.body.canBargin,
//        currency: request.body.currency,
//        locationName: request.body.locationName,
//        location: {  type: "Point", coordinates: [request.body.longitude, request.body.latitude]},
//        type: request.body.type, 
//        category: request.body.category,    
//        comments: request.body.comments          
//        
//                  
//    });
//
//    item.save(function(err, savedItem) {
//        if (err) {
//            response.status(500).send({ error:err });
//        } else {
//            response.send(savedItem);
//        }
//    });
//});
//
//
//
//app.patch('/item/:id', checkAuth,upload.single('itemImage'), function(request, response) {
//
//    const _id = request.params.id;
//
//    Item.findById(_id, function(err, item) {
//        if (err) {
//            response.status(500).send({error: "Could not fetch item"});
//        } else {
//            if (item!=null) {
//                //uupdate item data
//                let title = request.body.title;
//                let price = request.body.price;
//                let currency = request.body.currency;
//                let canBargin = request.body.canBargin;
//                let latitude = request.body.latitude;
//                let longitude = request.body.longitude;
//                let locationName = request.body.locationName;
//                let type =  request.body.type; 
//                let category = request.body.category;  
//                let comments = request.body.comments;
//                
//                // add user id that want it
//                let wantId = request.body.wantId;
//                
//                if (title!=null) {
//                    item.title = title;
//                }
//                if (price!=null) {
//                    item.email = price;
//                }
//                if (canBargin!=null) {
//                    item.phone = canBargin;
//                }
//                if (currency!=null) {
//                    item.currency = currency;
//                }
//                
//                 if ( request.file != null) {
//                    item.itemImage = request.file.path;
//                }
//                if (locationName != null) {
//                    item.locationName = locationName;
//                }
//                
//                if (longitude != null && latitude != null) { 
//                    item.location.coordinates = [longitude, latitude];
//                }
//                
//                if (type != null) {
//                    item.type = type;
//                }
//                if (category != null) {
//                    item.category = category;
//                }
//                if (comments != null) {
//                    item.comments = comments;
//                }
//                if (wantId != null) {
//                   item.wantIds.push(wantId);
//                }
//                
//                item.save(function(err, savedItem) {
//                    if (err) {
//                        response.status(500).send({error:err});
//                    } else {
//                        response.status(200).send({ message: "Updated item", item: savedItem });
//                    }
//                });  
//
//
//            }else {
//                response.status(500).send({error: "Could not fetch item"});
//            }
//
//
//
//        }
//    });
//});
//
//
//app.post('/item', checkAuth, function(request, response) {
//
//    var location = request.body.location;
//    var distance = request.body.distance;
//
//
//    if (distance > 0) {
//        Item.find( { "location": {
//            $near: {   $geometry: {  type: "Point",
//                                   coordinates: [location.longitude, location.latitude] },
//                    $maxDistance: distance
//
//                   }
//        } }, function(err, items) {
//            if (err) {
//                response.status(500).send({error: err});
//            } else {
//                response.send({items : items,
//                               message: 'Fetching items successful'
//                              });
//            }
//        });
//
//    }else {
//          Item.find({}, function(err, items) {
//        if (err) {
//            response.status(500).send({error: err});
//        } else {
//            response.send({items : items,
//                           message: 'Fetching items successful'
//                          });
//        }
//    });
//
//    }
//});

//app.get('/uploads/:file', function (req, res){
//    file = req.params.file;
//    var img = fs.readFileSync(__dirname + "/uploads/" + file);
//    res.writeHead(200, {'Content-Type': 'image/jpeg' });
//    res.end(img, 'binary');
//
//});



//categories

//app.get('/categories', function(request, response) {
//                response.status(200).send({categories: ["clothing & accessories", "books, movies & games", "cosmetics & body care", "food & drinks", "household","garden & pets", "other"]});
//
//
//});


const server = http.createServer(app);


app.listen(PORT, function() {
    console.log('In The Hood API running on port $(PORT)...');
});
