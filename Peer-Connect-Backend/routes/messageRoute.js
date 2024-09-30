const express = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");
const checkSession = require("../middlewares/sessionAuth");
const router = express.Router();

router.post("/send", checkSession, sendMessage);
router.post("/getMessages", checkSession, getMessages);

module.exports = router;
