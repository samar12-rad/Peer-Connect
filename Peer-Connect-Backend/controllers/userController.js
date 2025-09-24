const bcrypt = require('bcrypt');
const User = require('../models/userModel');

async function getData(req, res) {
  try {
    console.log('📊 getData controller - req.session:', req.session);
    console.log('📊 getData controller - req.session.userId:', req.session?.userId);
    
    const user_id = req.session.userId; // Access userId from sessionData
    
    if (!user_id) {
      console.log('❌ getData controller - No userId found in session');
      return res.status(401).json({ error: 'No user ID in session' });
    }
    
    console.log('🔍 getData controller - Looking for user:', user_id);
    const userData = await User.findOne({ _id: user_id }); // Use await for async DB query

    if (!userData) {
      console.log('❌ getData controller - User not found in database:', user_id);
      return res.status(404).json({ error: 'User not found' });
    }
    
    console.log('✅ getData controller - User found:', userData._id);
    req.userId = userData._id; // Store user ID in the request object for
    res.status(200).json({ data: userData });
  } catch (error) {
    console.error('❌ getData controller error:', error);
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

    console.log('🔑 Login successful - Session created:');
    console.log('🔑 Session ID:', req.sessionID);
    console.log('🔑 User ID stored in session:', req.session.userId);
    console.log('🔑 Session cookie settings:', req.session.cookie);

    // Set a custom header with session ID as fallback for cross-origin issues
    res.setHeader('X-Session-ID', req.sessionID);

    res.status(200).json({
      message: 'Login successful',
      user: { username: user.username, email: user.email },
      sessionId: req.sessionID, // Include session ID in response for debugging
      authToken: req.sessionID, // Include as auth token for frontend storage
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

    const userData = await User.findOneAndUpdate(
      { _id: userId || user },
      updateQuery,
      {
        new: true,
      }
    );

    if (!userData) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User data updated successfully' });
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

    const user = await User.findById(targetUserId);

    if (!user) {
      return res.status(404).json({ error: 'Current user not found' });
    }

    const isFriend = user.friends.includes(currentUserId);
    const hasPendingRequest = user.friendRequests.includes(currentUserId);
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

async function removeFriendRequest(req, res) {
  try {
    const currentUserId = req.session.userId;
    const { targetUserId } = req.params;

    User.findByIdAndUpdate(currentUserId);

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

async function removeFriend(req, res) {
  try {
    const currentUserId = req.session.userId;
    const { targetUserId } = req.params;
    console.log('Current user:', targetUserId);
    const currentUser = await User.findByIdAndUpdate(
      currentUserId,
      { $pull: { friendRequests: targetUserId } },
      { new: true }
    );

    if (!currentUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({
      message: 'Friend request removed successfully',
      friend: targetUserId,
    });
  } catch (error) {
    console.error('Remove friend error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

async function getPeerData(req, res) {
  try {
    const { userId } = req.params;

    if (!userId || userId === 'null') {
      return res.status(400).json({ error: 'Invalid user ID' });
    }

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

async function logoutUser(req, res) {
  try {
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: 'Could not log out, please try again' });
      }
      
      // Clear the session cookie
      res.clearCookie('connect.sid');
      res.status(200).json({ message: 'Logged out successfully' });
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Error logging out' });
  }
}

module.exports = {
  getData,
  createUser,
  loginUser,
  logoutUser,
  updateData,
  getUsersForSidebar,
  checkFriendStatus,
  makeFriend,
  getPeerData,
  removeFriend,
};
