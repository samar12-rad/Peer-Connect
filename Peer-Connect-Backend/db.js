const mongoose = require('mongoose');
const Schema = mongoose.Schema;
require('dotenv').config();
mongoose.connect(process.env.DB_URI);

const userSchema = new Schema({
    username: String,
    name: String,
    city: String,
    password: String,
    email: String,
    github: String,
    linkedin: String,
    bio: String,
    profilePicture: String,
    projects: Array,
    skills: [Array],
    chats: Array,
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    rating: Number,  // New field for user rating
    isNewOrIncomplete: Boolean  // New field for determining if the profile is new/incomplete
});

const User = mongoose.model('User', userSchema);

module.exports = User;
