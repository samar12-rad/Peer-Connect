const mongoose = require('mongoose');

// Use the default session collection
const Session = mongoose.connection.collection('sessions');

const checkSession = async (req, res, next) => {
  try {
    console.log('🍪 Session check - All cookies:', req.cookies);
    console.log('🍪 Session check - Headers:', req.headers.cookie);
    console.log('🔑 Session check - Auth header:', req.headers.authorization);
    
    // Try both the new custom name and the default connect.sid
    var sessionId = req.cookies['peer.connect.session'] || req.cookies['connect.sid'];
    
    // If no cookie session, try authorization header as fallback
    if (!sessionId && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.startsWith('Bearer ')) {
        sessionId = authHeader.substring(7); // Remove 'Bearer ' prefix
        console.log('🔑 Using session ID from Authorization header:', sessionId);
      }
    }

    if (!sessionId) {
      console.log('❌ No session ID found in cookies or headers');
      console.log('❌ Looking for: peer.connect.session, connect.sid, or Authorization header');
      return res.status(401).json({ error: 'No session ID found' });
    }

    console.log('🔑 Found session ID:', sessionId);

    // Handle session ID format based on source
    if (sessionId.startsWith('s:')) {
      // Cookie format - remove the 's:' prefix and everything after the dot (the signing part)
      sessionId = sessionId.split('.')[0].substring(2);
      console.log('🔑 Processed cookie session ID:', sessionId);
    } else {
      // Authorization header format - use as is
      console.log('🔑 Using header session ID:', sessionId);
    }

    // Find the session in the MongoDB collection
    const session = await Session.findOne({ _id: sessionId });

    if (!session) {
      return res
        .status(401)
        .json({ error: 'Invalid session', req: req.cookies });
    }

    // Parse session data and attach to request
    const sessionData = JSON.parse(session.session);
    console.log('🔑 Session data found:', sessionData);
    
    // Attach session data to request object
    req.session = {
      userId: sessionData.userId,
      sessionID: sessionId,
      ...sessionData
    };
    
    console.log('🔑 Attached userId to request:', req.session.userId);

    // Session is valid
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    console.error('Session check error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = checkSession;
