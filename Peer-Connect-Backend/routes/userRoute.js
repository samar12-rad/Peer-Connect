const express = require('express');
const router = express.Router();
require('dotenv').config();
const checkSession = require('../middlewares/sessionAuth');
const userController = require('../controllers/userController');
const { fetchUser } = require('../v1(small scale)/Fetch-User');

// Signup Route
router.post('/signup', userController.createUser);
// Login Route
router.post('/login', userController.loginUser);
// Get User Data Route
router.get('/', checkSession, userController.getData);
// Fetch Users Route
router.post('/fetchUsers', checkSession, fetchUser);

module.exports = router;
