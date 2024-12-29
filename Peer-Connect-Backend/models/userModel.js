const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  firstName: String,
  lastName: String,
  city: String,
  password: String,
  email: String,
  github: String,
  linkedin: String,
  gender: String,
  bio: String,
  profilePicture: String,
  projects: Array,
  skills: [Array],
  chats: Array,
  watchedUsers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  friendRequests: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  rating: Number, // New field for user rating
  isNewOrIncomplete: Boolean, // New field for determining if the profile is new/incomplete
});

const User = mongoose.model('User', userSchema);

module.exports = User;
