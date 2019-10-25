const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const checkAuth = require('../middleware/check-auth');
const UsersController = require('../controllers/users');

const isDev = true;

cloudinary.config({ 
  cloud_name: 'hfsa3zfdr', 
  api_key: '683453437659749', 
  api_secret: 'JQr62WaaM8KEAPeTp6bk1upK7zI' 
});

var dev_storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'development/uploads/users',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
var prod_storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'production/uploads/users',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
 
 
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }else {
        cb(null, false);
    }
};

const upload_dev = multer({ storage: dev_storage,
                     limits: { fileSize: 1024 * 1024 * 5 },
                     fileFilter: fileFilter
                    });

const upload_prod = multer({ storage: prod_storage,
                     limits: { fileSize: 1024 * 1024 * 5 },
                     fileFilter: fileFilter
                    });


//sign in and out
router.post('/user/signin', UsersController.signin);
router.post('/user/signinAdmin', UsersController.signinAdmin);

router.post('/user/signout', UsersController.signout);

//create user
 if (isDev) {
     router.post('/user/signup', upload_dev.single('userAvatar'), UsersController.signup);
     //update user
     router.patch('/user/:id', checkAuth, upload_dev.single('userAvatar'), UsersController.updateUserById);
 }else {
     router.post('/user/signup', upload_prod.single('userAvatar'), UsersController.signup);
     //update user
     router.patch('/user/:id', checkAuth, upload_prod.single('userAvatar'), UsersController.updateUserById);
 }


//fetch users
router.post('/user/me', checkAuth, UsersController.myUser);
//update push token for my user
router.post('/user/me/push', checkAuth, UsersController.setMyUserPushToken);

router.get('/', checkAuth, UsersController.getUsers);
router.get('/user/:id', checkAuth,UsersController.userById);

//delete user
router.delete('/user', checkAuth, UsersController.deleteUser);


module.exports = router;

