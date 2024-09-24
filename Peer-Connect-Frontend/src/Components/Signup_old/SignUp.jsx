import { useState } from 'react';
import './Signup.css' // Import your CSS file for styling

const Signup = () => {
  const [formData, setFormData] = useState({
    username: '',
    name: '',
    city: '',
    password: '',
    email: '',
    github: '',
    linkedin: '',
    bio: '',
    profilePicture: '',
    projects: [],
    skills: [],
    chats: [],
    friends: [],
    friendRequests: [],
    rating: '',
    isNewOrIncomplete: false
  });

  // Update state when input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('YOUR_SERVER_ENDPOINT', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Form Data Submitted:', result);
      } else {
        console.error('Server responded with an error:', response.statusText);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };
    
  return (
    <div className="signup-container">
   
      <h1 className="signup-heading">Peer Connect</h1>
      <h2 className="sub-heading">Signup</h2>
      <form className="signup-form" onSubmit={handleSubmit}>
        {/* Mandatory fields */}
        <div className="form-group">
  <label htmlFor="profilePicture">Profile Picture URL:</label>
  <input
    type="url"
    id="profilePicture"
    name="profilePicture"
    value={formData.profilePicture}
    onChange={handleChange}
    placeholder="Enter profile picture URL"
  />
</div>
        <div className="form-group">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
       
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            placeholder="Enter your rating"
            required
          />
        </div>

        {/* Optional fields */}
        <div className="form-group">
          <label htmlFor="city">City:</label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleChange}
            placeholder="Enter your city"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
        </div>
        <div className="form-group">
          <label htmlFor="github">GitHub:</label>
          <input
            type="url"
            id="github"
            name="github"
            value={formData.github}
            onChange={handleChange}
            placeholder="Enter your GitHub profile link"
          />
        </div>
        <div className="form-group">
          <label htmlFor="linkedin">LinkedIn:</label>
          <input
            type="url"
            id="linkedin"
            name="linkedin"
            value={formData.linkedin}
            onChange={handleChange}
            placeholder="Enter your LinkedIn profile link"
          />
        </div>
        <div className="form-group">
  <label htmlFor="projects">Projects (comma-separated):</label>
  <input
    type="text"
    id="projects"
    name="projects"
    value={formData.projects}
    onChange={(e) => setFormData({
      ...formData,
      projects: e.target.value.split(',').map(project => project.trim())
    })}
    placeholder="Enter your projects"
  />
</div>
<div className="form-group">
  <label htmlFor="skills">Skills (comma-separated):</label>
  <input
    type="text"
    id="skills"
    name="skills"
    value={formData.skills}
    onChange={(e) => setFormData({
      ...formData,
      skills: e.target.value.split(',').map(skill => skill.trim())
    })}
    placeholder="Enter your skills"
  />
</div>
        <div className="form-group">
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            placeholder="Tell us about yourself"
          />
        </div>

        {/* Submit button */}
        <button type="submit" className="signup-button">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
