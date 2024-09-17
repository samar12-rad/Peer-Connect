const express = require('express');
const bcrypt = require('bcrypt');
const User = require("../db");
const router = express.Router();
require('dotenv').config();
const checkSession = require("../middlewares/sessionAuth");

// Signup Route
router.post("/signup", async (req, res) => {
    const { username, firstName, lastName, password, email, github, linkedin, bio, profilePicture, projects, skills } = req.body;

    // Basic validation
    if (!username || !password || !email) {
        return res.status(400).json({ error: "Username, password, and email are required" });
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
            skills
        });

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        console.error(error); // Log error details for debugging
        res.status(500).json({ error: "Error creating user" });
    }
});

router.get("/", checkSession, async (req, res) => {
    try {
        const user_id = req.session.userId; // Access userId from sessionData
        const userData = await User.findOne({ _id: user_id }); // Use await for async DB query

        if (!userData) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.status(200).json({ data: userData });
    } catch (error) {
        res.status(500).json({ error: 'Error fetching user data' });
    }
});


// Login Route
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
        return res.status(400).json({ error: "Email and password are required" });
    }

    try {
        // Find the user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Compare the provided password with the hashed password in the database
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(401).json({ error: "Invalid email or password" });
        }

        // Create a session for the user
        req.session.userId = user._id; // Store user ID in the session
        req.session.sessionID = req.sessionID; // Optionally store the session ID

        res.status(200).json({ message: "Login successful", user: { username: user.username, email: user.email } });
    } catch (error) {
        console.error(error); // Log error details for debugging
        res.status(500).json({ error: "Error logging in" });
    }
});

module.exports = router;
