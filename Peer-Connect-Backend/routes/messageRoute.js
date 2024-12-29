const express = require('express');
const {
  sendMessage,
  getMessages,
} = require('../controllers/messageController');
const checkSession = require('../middlewares/sessionAuth');
const router = express.Router();

//Send Message Route
router.post('/send', checkSession, sendMessage);
//Get Messages Route
router.post('/getMessages', checkSession, getMessages);

module.exports = router;
