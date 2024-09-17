const mongoose = require("mongoose");
require('dotenv').config();
mongoose.connect(process.env.DB_URI);



const userSchema = mongoose.Schema({
    username: String,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    github: String,
    linkedin: String,
    bio: String,
    profilePicture: String,
    projects: Array,
    skills: Array
})

const User = mongoose.model("User", userSchema);

module.exports = User;

