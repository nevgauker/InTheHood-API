const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('cloudinary');
const cloudinaryStorage = require('multer-storage-cloudinary');

const checkAuth = require('../middleware/check-auth');
const ItemsController = require('../controllers/items');

const isDev = true;

//const storage = multer.diskStorage({
//    destination: function(req, file, cb) {
//        cb(null, './uploads/items/');
//    },
//    filename: function(req, file, cb) {
//        cb(null, new Date().toISOString() + file.originalname);
//    }
//});


var dev_storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'development/uploads/items',
  allowedFormats: ['jpg', 'png'],
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});
var prod_storage = cloudinaryStorage({
  cloudinary: cloudinary,
  folder: 'production/uploads/items',
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


//delete on item
router.delete('/item/:id', checkAuth, ItemsController.deleteItem);


if (isDev){
    //add one item
    router.post('/item/add', checkAuth, upload_dev.single('itemImage'), ItemsController.addItem);
    //update one item
    router.patch('/item/:id', checkAuth,upload_dev.single('itemImage'), ItemsController.updateItem);
}else{
    //add one item
    router.post('/item/add', checkAuth, upload_prod.single('itemImage'), ItemsController.addItem);
    //update one item
    router.patch('/item/:id', checkAuth,upload_prod.single('itemImage'), ItemsController.updateItem);
}

//fetch all items
router.post('/', checkAuth, ItemsController.fetchItemsByDistance);


module.exports = router;









