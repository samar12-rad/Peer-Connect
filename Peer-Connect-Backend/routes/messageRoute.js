const express = require("express");
const { sendMessage } = require("../controllers/messageController");
const checkSession = require("../middlewares/sessionAuth");
const router = express.Router();

router.post("/send", checkSession, sendMessage);

module.exports = router;
