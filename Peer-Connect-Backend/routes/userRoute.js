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
router.get('/data', userController.getData);
// Fetch Users Route
router.post('/fetchUsers', checkSession, fetchUser);
// Update User Data Route
router.post('/update', userController.updateData);
// Get Users for Sidebar Route
router.get('/users', checkSession, userController.getUsersForSidebar);
// Check Friend Status Route
router.get(
  '/checkFriend/:targetUserId',
  checkSession,
  userController.checkFriendStatus
);
// Make Friend Route
router.post(
  '/makeFriend/:targetUserId',
  checkSession,
  userController.makeFriend
);

module.exports = router;
