const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const ItemsController = require('../controllers/items');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/items/');
    },
    filename: function(req, file, cb) {
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


const upload = multer({ storage: storage,
                     limits: { fileSize: 1024 * 1024 * 5 },
                     fileFilter: fileFilter
                    });


//delete on item
router.delete('/item', checkAuth, ItemsController.deleteItem);

//add one item
router.post('/item/add', checkAuth, upload.single('itemImage'), ItemsController.addItem);

//update one item
router.patch('/item/:id', checkAuth,upload.single('itemImage'), ItemsController.updateItem);

//fetch all items
router.post('/', checkAuth, ItemsController.fetchItemsByDistance);


  

module.exports = router;









