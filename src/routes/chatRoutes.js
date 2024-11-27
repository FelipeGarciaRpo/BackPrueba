const express = require('express');
const { getMessages, sendMessage } = require('../controllers/chatController');
const authMiddleware = require('../middleware/authMiddleware');
const router = express.Router();

router.get('/', authMiddleware, getMessages);
router.post('/', authMiddleware, sendMessage);

module.exports = router;