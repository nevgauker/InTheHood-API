const express = require('express');
const router = express.Router();

const chatController = require('../controllers/chats');
const checkAuth = require('../middleware/check-auth');


router.post('/', checkAuth, chatController.fecthAllChatsForItem);


router.post('/chat', checkAuth, chatController.fecthChat);

//create chat
router.post('/chat/add', checkAuth, chatController.createChat);


// add message to chat
router.post('/chat/:id', checkAuth, chatController.addMessageToChat);






module.exports = router;

