const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const cookieParser = require("cookie-parser"); // Add this line
require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;
const clientPath = process.env.CLIENT_PATH || "http://localhost:3000";

// Enable CORS with credentials
app.use(
  cors({
    credentials: true,
    origin: clientPath,
  })
);

// Parse cookies
app.use(cookieParser()); // Add this line to use cookie-parser

// Middleware to parse JSON requests
app.use(express.json());

// Configure session store
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret",
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      mongoUrl: process.env.DB_URI,
      collectionName: "sessions",
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
app.use("/api/v1", require("./routes/index"));

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
