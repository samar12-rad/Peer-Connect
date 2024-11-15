const bcrypt = require('bcrypt');
const User = require('../models/userModel');

async function getData(req, res) {
  try {
    const user_id = req.session.userId; // Access userId from sessionData
    const userData = await User.findOne({ _id: user_id }); // Use await for async DB query

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }
    req.userId = userData._id; // Store user ID in the request object for
    res.status(200).json({ data: userData });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching user data' });
  }
}

async function createUser(req, res) {
  const {
    username,
    firstName,
    lastName,
    password,
    email,
    github,
    linkedin,
    bio,
    profilePicture,
    rating,
    projects = [], // Default to empty array if not provided
    skills = [], // Default to empty array if not provided
  } = req.body;

  // Basic validation
  if (!username || !password || !email) {
    return res
      .status(400)
      .json({ error: 'Username, password, and email are required' });
  }

  try {
    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user with hashed password
    await User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
      email,
      github,
      linkedin,
      bio,
      profilePicture,
      projects,
      rating,
      skills,
    });

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ error: 'Error creating user' });
  }
}

async function loginUser(req, res) {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Create a session for the user
    req.session.userId = user._id; // Store user ID in the session
    req.session.sessionID = req.sessionID; // Optionally store the session ID

    res.status(200).json({
      message: 'Login successful',
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.error(error); // Log error details for debugging
    res.status(500).json({ error: 'Error logging in' });
  }
}

async function updateData(req, res) {
  const user = req.session.userId;
  var {
    userId,
    firstName,
    lastName,
    city,
    github,
    linkedin,
    bio,
    skills,
    projects,
    friendRequests,
    watchedUsers,
  } = req.body;

  if (friendRequests === 'self') {
    friendRequests = user;
    console.log('friendRequests:', friendRequests);
  }

  try {
    // Construct basic update fields
    const basicFields = {
      firstName,
      lastName,
      city,
      github,
      linkedin,
      bio,
      skills,
    };

    // Construct array operations
    const arrayOperations = {};

    if (projects) {
      arrayOperations.$push = { ...arrayOperations.$push, projects };
    }
    if (friendRequests) {
      arrayOperations.$push = { ...arrayOperations.$push, friendRequests };
    }
    if (watchedUsers) {
      arrayOperations.$push = { ...arrayOperations.$push, watchedUsers };
    }

    // Combine updates
    const updateQuery = {
      ...basicFields,
      ...arrayOperations,
    };

    const userData = await User.findOneAndUpdate({ _id: userId }, updateQuery, {
      new: true,
    });

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User data updated successfully' });
    console.log('userData:', userData);
  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({ error: 'Error updating user data' });
  }
}

async function getUsersForSidebar(req, res) {
  const userId = req.session.userId;
  try {
    const user = await User.findOne({ _id: userId }, 'friends');
    const friends = user.friends;
    if (!friends || friends.length === 0) {
      return res.status(200).json({
        message: 'No friends found',
        friends: [],
      });
    }

    res.status(200).json({ data: friends });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching users' });
  }
}

async function checkFriendStatus(req, res) {
  try {
    const currentUserId = req.session.userId;
    const { targetUserId } = req.params;

    const user = await User.findById(currentUserId);

    if (!user) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    const isFriend = user.friends.includes(targetUserId);
    const hasPendingRequest = user.friendRequests.includes(targetUserId);

    res.status(200).json({
      isFriend,
      hasPendingRequest,
    });
  } catch (error) {
    res.status(500).json({ error: 'Error checking friend status' });
  }
}

async function makeFriend(req, res) {
  try {
    const currentUserId = req.session.userId;
    const { targetUserId } = req.params;

    // Update both users' friend lists
    const [currentUser, targetUser] = await Promise.all([
      User.findByIdAndUpdate(
        currentUserId,
        {
          $addToSet: { friends: targetUserId },
          $pull: { friendRequests: targetUserId },
        },
        { new: true }
      ),
      User.findByIdAndUpdate(
        targetUserId,
        {
          $addToSet: { friends: currentUserId },
          $pull: { friendRequests: currentUserId },
        },
        { new: true }
      ),
    ]);

    if (!currentUser || !targetUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Friend added successfully',
      friend: targetUser,
    });
  } catch (error) {
    console.error('Make friend error:', error);
    res.status(500).json({ error: 'Error making friend connection' });
  }
}

async function getPeerData(req, res) {
  try {
    const { userId } = req.params;

    const userData = await User.findById(userId)
      .select(
        'firstName lastName city github linkedin bio skills projects profilePicture'
      )
      .lean();

    if (!userData) {
      return res.status(404).json({
        error: 'User not found',
      });
    }

    res.status(200).json({
      message: 'User data fetched successfully',
      data: userData,
    });
  } catch (error) {
    console.error('Get peer data error:', error);
    res.status(500).json({
      error: 'Error fetching user data',
    });
  }
}

module.exports = {
  getData,
  createUser,
  loginUser,
  updateData,
  getUsersForSidebar,
  checkFriendStatus,
  makeFriend,
  getPeerData,
};
