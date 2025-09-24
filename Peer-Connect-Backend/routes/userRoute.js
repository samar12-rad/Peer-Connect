const express = require('express');
const router = express.Router();
require('dotenv').config();
const checkSession = require('../middlewares/sessionAuth');
const userController = require('../controllers/userController');
const { fetchUser } = require('../v1(small scale)/Fetch-User');
const { enhancedFetchUsers } = require('../v1(small scale)/Enhanced-Fetch-User');
const multer = require('multer');
const { Upload, removeFile } = require('../controllers/CloudinaryController');
const upload = multer({ storage: multer.memoryStorage() });

// Get Peer Data Route
router.get('/peerData/:userId', userController.getPeerData);
// Signup Route
router.post('/signup', userController.createUser);
// Login Route
router.post('/login', userController.loginUser);
// Logout Route
router.post('/logout', userController.logoutUser);
// Get User Data Route
router.get('/data', checkSession, userController.getData);
// Auth verification route
router.get('/verify', checkSession, (req, res) => {
  res.json({ authenticated: true, userId: req.session.userId });
});
// Fetch Users Route
router.post('/fetchUsers', checkSession, fetchUser);
// Enhanced Fetch Users Route (with pagination and diverse algorithms)
router.post('/fetchUsersEnhanced', checkSession, enhancedFetchUsers);
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

router.post(
  '/removeFriend/:targetUserId',
  checkSession,
  userController.removeFriend
);

router.post('/upload', upload.single('file'), Upload);
router.post('/remove-file', removeFile);

module.exports = router;
