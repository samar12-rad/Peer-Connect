const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser'); // Add this line
const { app, server } = require('./socket/socket');
require('dotenv').config();

const port = process.env.PORT || 5000;
const clientPath =
  process.env.CLIENT_PATH || 'https://peer-connect-production.up.railway.app';

// Enable CORS with credentials
// app.use(
//   cors({
//     origin: '*', // Frontend URL
//     credentials: true, // Enable credentials
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
//     allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Allowed headers
//   })
// );
// Configure CORS based on environment
const allowedOrigins = process.env.CORS_ORIGINS 
  ? process.env.CORS_ORIGINS.split(',') 
  : ['http://localhost:5173', 'http://localhost:3000'];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed origins
      if (allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } 
      // Allow any Vercel deployment for peer-connect
      else if (origin && origin.includes('peer-connect') && origin.includes('vercel.app')) {
        console.log('Allowing Vercel deployment:', origin);
        callback(null, true);
      }
      // Allow localhost for development
      else if (origin && (origin.includes('localhost') || origin.includes('127.0.0.1'))) {
        callback(null, true);
      }
      else {
        console.log('Blocked by CORS:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  })
);

// Parse cookies
app.use(cookieParser()); // Add this line to use cookie-parser

// Middleware to parse JSON requests
app.use(express.json());

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Database connection failed:', error);
  });

// Configure session store
app.use(
  session({
    name: 'peer.connect.session', // Custom session cookie name
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: 'sessions',
      ttl: 60 * 60 * 6,
    }), // 6 hours
    cookie: {
      secure: process.env.NODE_ENV === 'production', // true in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 6, // 6 hours
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax', // 'none' for cross-origin in production
      // Don't set domain for cross-origin cookies - let browser handle it
      // expires: new Date(Date.now() + 1000 * 60 * 60).toUTCString()
    },
  })
);

// Use root router for API routes
app.use('/api/v1', require('./routes/index'));

// Function to log all available endpoints
const logEndpoints = () => {
  console.log('\n🚀 ================== SERVER ENDPOINTS ==================');
  console.log('📍 Base URL: /api/v1');
  console.log('');
  
  // User endpoints
  console.log('👤 USER ENDPOINTS:');
  console.log('   📝 POST   /api/v1/user/signup           - Create new user');
  console.log('   🔐 POST   /api/v1/user/login            - User login');
  console.log('   🚪 POST   /api/v1/user/logout           - User logout');
  console.log('   📊 GET    /api/v1/user/data             - Get user data (auth required)');
  console.log('   ✅ GET    /api/v1/user/verify           - Verify authentication (auth required)');
  console.log('   🔍 POST   /api/v1/user/fetchUsers       - Fetch users (auth required)');
  console.log('   🔍 POST   /api/v1/user/fetchUsersEnhanced - Enhanced fetch users (auth required)');
  console.log('   ✏️  POST   /api/v1/user/update           - Update user data');
  console.log('   👥 GET    /api/v1/user/users            - Get users for sidebar (auth required)');
  console.log('   🔗 GET    /api/v1/user/peerData/:userId - Get peer data');
  console.log('   👋 GET    /api/v1/user/checkFriend/:targetUserId - Check friend status (auth required)');
  console.log('   ➕ POST   /api/v1/user/makeFriend/:targetUserId  - Make friend (auth required)');
  console.log('   ➖ POST   /api/v1/user/removeFriend/:targetUserId - Remove friend (auth required)');
  console.log('   📁 POST   /api/v1/user/upload           - Upload file (multipart/form-data)');
  console.log('   🗑️  POST   /api/v1/user/remove-file      - Remove file');
  console.log('');
  
  // Message endpoints
  console.log('💬 MESSAGE ENDPOINTS:');
  console.log('   📤 POST   /api/v1/message/send          - Send message (auth required)');
  console.log('   📥 POST   /api/v1/message/getMessages   - Get messages (auth required)');
  console.log('');
  
  console.log('🔐 Auth Required: These endpoints need session cookie or Authorization header');
  console.log('📝 Environment: ' + (process.env.NODE_ENV || 'development'));
  console.log('🌐 CORS Origins: ' + (process.env.CORS_ORIGINS || 'localhost development'));
  console.log('========================================================\n');
};

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  logEndpoints();
});
