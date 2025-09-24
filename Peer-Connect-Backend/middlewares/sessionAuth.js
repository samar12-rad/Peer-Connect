const mongoose = require('mongoose');

// Use the default session collection
const Session = mongoose.connection.collection('sessions');

const checkSession = async (req, res, next) => {
  try {
    console.log('🍪 Session check - All cookies:', req.cookies);
    console.log('🍪 Session check - Headers:', req.headers.cookie);
    
    var sessionId = req.cookies['connect.sid']; // Extract session ID from cookie

    if (!sessionId) {
      console.log('❌ No session ID found in cookies');
      return res.status(401).json({ error: 'No session ID found' });
    }

    console.log('🔑 Found session ID:', sessionId);

    // Remove the 's:' prefix and everything after the dot (the signing part)
    sessionId = sessionId.split('.')[0].substring(2);

    // Find the session in the MongoDB collection
    const session = await Session.findOne({ _id: sessionId });

    // Attach userId to req.sessionData for access in routes

    if (!session) {
      return res
        .status(401)
        .json({ error: 'Invalid session', req: req.cookies });
    }

    // Session is valid
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error('Session check error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = checkSession;
