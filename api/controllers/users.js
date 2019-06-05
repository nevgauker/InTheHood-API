const mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const User = require("../models/user");

const jwt_key = "secret";



exports.signin = (request, response, next) => {

    User.findOne({ email:request.body.email },function(err, user) {
        if (user) {
            bcrypt.compare(request.body.password,user.password,(err, result) => {
                if (err) {
                    response.status(401).send({error:'Auth failed'});
                }
                if (result) {
                    const token = jwt.sign( {
                        email: user.email,
                        userId: user._id
                    },jwt_key, { expiresIn: "24h" });
                    response.status(200).send({message: 'Auth successful',
                                               token: token,
                                               user: user });
                }else {
                    response.status(401).send({error:'Auth failed'});
                }
            });


        }else {
            response.status(401).send({error:'Auth failed'});
        }

    });



};


exports.signout =  (request, response, next) => {
    response.status(200).send({ message: 'Sign out successful' });

    //TBD invalidate token


};



exports.signup = (request, response, next) => {

    User.findOne({email: request.body.email},function(err, user) {
        if (err) {
            response.status(500).send({error: "Could not fetch user"});
        } else {
            if (user) {
                response.status(409).send({error:'Mail exists'});
            }else {
                bcrypt.hash(request.body.password, 10,(hashError, hash) => {
                    if (hashError) {
                        response.status(500).send({error:'Auth failed'});
                    }else {
                        var user = new User();
                        user.name = request.body.name;
                        user.email = request.body.email;
                        user.password = hash;
                        user.userAvatar = request.file.path;
                
                        user.save(function(saveError, savedUser) {
                            if (err) {
                                response.status(500).send({error:'Auth failed'});
                            } else {
                                const token = jwt.sign( {
                                    email: savedUser.email,
                                    userId: savedUser._id
                                },jwt_key, { expiresIn: "1h" });
                                response.status(200).send({message: 'Auth successful',
                                                           token: token,
                                                           user: savedUser });
                            }
                        });
                    }
                });
            }
        }
    });
};


//User

exports.myUser = (request, response, next) => {

    User.findOne({email :request.body.email}, function(err, user) {
        if (err) {
            response.status(500).send({error: "Could not fetch user"});
        } else {
            if (user) {
                response.status(200).send({user : user,
                                           message: 'Fetching user successful'
                                          });
            }else {
                response.status(500).send({error: "Could not fetch user"}); 
            }
        }
    });
};

exports.getUsers = (request, response, next) => {

    User.find({},function(err, users) {
        if (err) {
            response.status(500).send({error: "Could not fetch users"});
        } else {
            response.send({items : users,
                           message: 'Fetching users successful'
                          });
        }
    });
};

exports.userById = (request, response, next) => {

    User.findById(request.params.id, function(err, user) {
        if (err) {
            response.status(500).send({error: "Could not fetch user"});
        } else {
            response.send({user : user,
                           message: 'Fetching user successful'
                          });
        }
    });
};

exports.updateUserById = (request, response, next) => {

    const _id = request.params.id;

    User.findById(_id, function(err, user) {
        if (err) {
            response.status(500).send({error: "Could not fetch user"});
        } else {
            if (user!=null) {
                let name = request.body.name;
                let email = request.body.email;
                let phone = request.body.phone;
                let isWhatsapp = request.body.isWhatsapp;
                let facebook = request.body.facebook;
                let pushToken = request.body.pushToken;

                if (name!=null) {
                    user.name = name;
                }
                if (email!=null) {
                    user.email = email;
                }
                if (phone!=null) {
                    user.phone = phone;
                }
                if (isWhatsapp!=null) {
                    user.isWhatsapp = isWhatsapp;
                }
                if (facebook!=null) {
                    user.facebook = facebook;
                }
                if ( request.file != null) {
                    user.userAvatar = request.file.path;
                }
                if (pushToken!=null) {
                    user.pushToken = pushToken;
                }
                user.save(function(err, savedUser) {
                    if (err) {
                        response.status(500).send({error:err});
                    } else {
                        response.status(200).send({ message: "Updated user", user: savedUser });
                    }
                });  


            }else {
                response.status(500).send({error: "Could not fetch user"});
            }



        }
    });
};

exports.deleteUser = (request, response, next) => {

    User.findOne({_id :request.body.id},function(err, user) {
        if (err) {
            response.status(500).send({error: "User doesnt exist"});
        } else {
            if (user) {
                User.remove({_id :request.body.id},function(err) {
                    if (err) {
                        response.status(500).send({error: "Error deleting a user"});
                    }else {
                        response.status(200).send({error: "User was deleted"});
                    }   
                });
            }else {
                response.status(500).send({error: "Problem with user object"});
            }
        }
    });
};