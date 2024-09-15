const express = require('express');
const User = require("../db");
const router = express.Router();
const jwt = require("jsonwebtoken");
require('dotenv').config();

router.get("/", (req, res) => {
    console.log(req.session);
    console.log(req.sessionID);
    res.json("hello from user.js");
});

router.post("/signup", async (req, res) => {
    const { username, firstName, lastName, password, email, github, linkedin, bio, profilePicture, projects, skills } = req.body;
    await User.create({
        username,
        firstName,
        lastName,
        password,
        email,
        github,
        linkedin,
        bio,
        profilePicture,
        projects,
        skills
    });
    
    const token = jwt.sign({
        username,
    }, process.env.JWT_SECRET);


    res.json({
        message: "User created successfully",
        token: token,
        username,
    })
});

module.exports = router;