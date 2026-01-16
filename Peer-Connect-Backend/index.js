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
// Configure CORS with robust origin checking
const envOrigins = process.env.CORS_ORIGINS
  ? process.env.CORS_ORIGINS.split(',')
  : [];

const baseAllowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  'https://peer-connect-eight.vercel.app',
  'https://peer-connect-frontend.vercel.app',
];

const allAllowedOrigins = [...new Set([...envOrigins, ...baseAllowedOrigins])];

app.use(
  cors({
    origin: function (origin, callback) {
      if (
        !origin ||
        allAllowedOrigins.includes(origin) ||
        (origin.includes('peer-connect') && origin.includes('vercel.app')) ||
        origin.includes('localhost')
      ) {
        callback(null, true);
      } else {
        console.log('❌ CORS - Blocked origin:', origin);
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'Cookie',
      'X-Page-Source',
      'X-Current-Path',
      'X-Endpoint',
      'X-Component',
    ],
  })
);

// Parse cookies
app.use(cookieParser());

// Trust proxy for secure cookies on Vercel/Railway
app.set('trust proxy', 1);

// Source tracking middleware - log request origins
app.use((req, res, next) => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`📍 ${req.method} ${req.path}`);
  }
  next();
});

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
    name: 'peer.connect.session',
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: 'sessions',
      ttl: 60 * 60 * 6,
    }),
    cookie: {
      secure: process.env.NODE_ENV === 'production',
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 6,
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
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
  console.log(
    '   📊 GET    /api/v1/user/data             - Get user data (auth required)'
  );
  console.log(
    '   ✅ GET    /api/v1/user/verify           - Verify authentication (auth required)'
  );
  console.log(
    '   🔍 POST   /api/v1/user/fetchUsers       - Fetch users (auth required)'
  );
  console.log(
    '   🔍 POST   /api/v1/user/fetchUsersEnhanced - Enhanced fetch users (auth required)'
  );
  console.log('   ✏️  POST   /api/v1/user/update           - Update user data');
  console.log(
    '   👥 GET    /api/v1/user/users            - Get users for sidebar (auth required)'
  );
  console.log('   🔗 GET    /api/v1/user/peerData/:userId - Get peer data');
  console.log(
    '   👋 GET    /api/v1/user/checkFriend/:targetUserId - Check friend status (auth required)'
  );
  console.log(
    '   ➕ POST   /api/v1/user/makeFriend/:targetUserId  - Make friend (auth required)'
  );
  console.log(
    '   ➖ POST   /api/v1/user/removeFriend/:targetUserId - Remove friend (auth required)'
  );
  console.log(
    '   📁 POST   /api/v1/user/upload           - Upload file (multipart/form-data)'
  );
  console.log('   🗑️  POST   /api/v1/user/remove-file      - Remove file');
  console.log('');

  // Message endpoints
  console.log('💬 MESSAGE ENDPOINTS:');
  console.log(
    '   📤 POST   /api/v1/message/send          - Send message (auth required)'
  );
  console.log(
    '   📥 POST   /api/v1/message/getMessages   - Get messages (auth required)'
  );
  console.log('');

  console.log(
    '🔐 Auth Required: These endpoints need session cookie or Authorization header'
  );
  console.log('📝 Environment: ' + (process.env.NODE_ENV || 'development'));
  console.log(
    '🌐 CORS Origins: ' + (process.env.CORS_ORIGINS || 'localhost development')
  );
  console.log('========================================================\n');
};

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  logEndpoints();
});
