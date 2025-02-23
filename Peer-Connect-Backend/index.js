const express = require('express');
const cors = require('cors');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser'); // Add this line
require('dotenv').config();

const app = express();

const port = process.env.PORT || 5000;

const origin = process.env.FRONTEND_URL;

app.use(
  cors({
    origin: [origin, 'https://peer-connect-eight.vercel.app'],
    credentials: true, // Allow cookies
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
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
    secret: process.env.SESSION_SECRET || 'secret',
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: 'sessions',
      ttl: 60 * 60 * 6,
    }), // 6 hours
    cookie: {
      sameSite: 'none',
      secure: process.env.NODE_ENV === 'production',
      partitioned: true,
      httpOnly: false,
      maxAge: 1000 * 60 * 60 * 6, // 6 hours
    },
  })
);

// Use root router for API routes
app.use('/api/v1', require('./routes/index'));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
