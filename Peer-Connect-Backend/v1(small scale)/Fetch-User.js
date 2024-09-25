const User = require("../db");

const fetchUser = async (req, res) => {
    const skills = req.body.skills;  // Get the full array of skills from the request body
    const numSkills = skills.length;  // Calculate the number of skills

    // Fetch users whose skills match any of the skills in the input array
    const users = await User.find({ skills: { $in: skills } });

    // Return the array of users and the number of skills
    res.json({ users, numSkills, skills });
};


module.exports = { fetchUser };