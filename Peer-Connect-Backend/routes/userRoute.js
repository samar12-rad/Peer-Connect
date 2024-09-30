const express = require("express");
const router = express.Router();
require("dotenv").config();
const checkSession = require("../middlewares/sessionAuth");
const userController = require("../controllers/userController");

// Signup Route
router.post("/signup", userController.createUser);

// Get User Data Route
router.get("/", checkSession, userController.getData);

// Login Route
router.post("/login", userController.loginUser);

module.exports = router;
