const User = require('../models/userModel'); // Import database from here

const fetchUser = async (req, res) => {
  const skills = req.body.skills.map((skill) => [skill]); // Convert to nested array format
  const numSkills = skills.length;
  const userId = req.session.userId;
  const WatchedUsers = User.watchedUsers || [];

  // Updated query to match nested array format
  const users = await User.find({
    skills: {
      $in: skills,
    },
  });

  // Filter out current user
  var filteredUsers = users.filter((user) => user._id.toString() !== userId);

  // Filter out watched users
  filteredUsers = filteredUsers.filter(
    (user) => !WatchedUsers.includes(user._id.toString())
  );

  res.json({ numSkills, skills, filteredUsers });
};

module.exports = { fetchUser };
