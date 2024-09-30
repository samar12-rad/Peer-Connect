const User = require("../models/userModel"); // Import database from here

const fetchUser = async (req, res) => {
  const skills = req.body.skills; // Get the full array of skills from the request body
  const numSkills = skills.length; // Calculate the number of skills
  const userId = req.session.userId; // Access userId from sessionData

  const WatchedUsers = User.watchedUsers || []; // Get the watched users from the user model

  // Fetch users whose skills match any of the skills in the input array
  const users = await User.find({ skills: { $in: skills } });

  // Filter out the current user from the list of users
  var filteredUsers = users.filter((user) => user._id.toString() !== userId);

  // Filter out the watched users from the list of users
  filteredUsers = filteredUsers.filter(
    (user) => !WatchedUsers.includes(user._id.toString())
  );

  res.json({ numSkills, skills, filteredUsers }); // Return the array of users and the number of skills
};

module.exports = { fetchUser };
