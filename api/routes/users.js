const express = require('express');
const router = express.Router();
const multer = require('multer');
const checkAuth = require('../middleware/check-auth');

const UsersController = require('../controllers/users');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/users/');
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







router.post('/user/signin', UsersController.signin);
router.post('/user/signout', UsersController.signout);
router.post('/user/signup', UsersController.signup);

router.post('/user/me', checkAuth, UsersController.myUser);
router.get('/', checkAuth, UsersController.getUsers);
router.get('/user/:id', checkAuth,UsersController.userById);

router.patch('/user/:id', checkAuth, upload.single('userAvatar'), UsersController.updateUserById);

router.delete('/user', checkAuth, UsersController.deleteUser);


module.exports = router;

