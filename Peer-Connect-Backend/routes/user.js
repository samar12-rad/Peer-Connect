const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../db");
const router = express.Router();
require('dotenv').config();
const checkSession = require("../middlewares/sessionAuth");
const userController = require("../controllers/user");

// Signup Route
router.post("/signup", userController.createUser);

// Get User Data Route
router.get("/", checkSession, userController.getData);

// Login Route
router.post("/login", userController.loginUser);

module.exports = router;
