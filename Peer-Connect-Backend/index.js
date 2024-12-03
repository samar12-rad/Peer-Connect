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
app.use(
  cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true, // Enable credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'], // Allowed headers
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
      secure: false, // Set to true in production with HTTPS
      httpOnly: true,
      maxAge: 1000 * 60 * 60 * 6, // 6 hours
      // expires: new Date(Date.now() + 1000 * 60 * 60).toUTCString()
    },
  })
);

// Use root router for API routes
app.use('/api/v1', require('./routes/index'));

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
