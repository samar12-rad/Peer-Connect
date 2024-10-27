import PropTypes from 'prop-types';
import { useState } from 'react';

// ProjectModal Component
const ProjectModal = ({ isOpen, onClose, onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (projectName && projectLink) {
      onAddProject({ name: projectName, link: projectLink });
      setProjectName('');
      setProjectLink('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Add New Project</h2>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-xl hover:bg-gray-100"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700"
            >
              Project Name
            </label>
            <input
              type="text"
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter project name"
              required
            />
          </div>
          <div>
            <label
              htmlFor="projectLink"
              className="block text-sm font-medium text-gray-700"
            >
              Project Link
            </label>
            <input
              type="url"
              id="projectLink"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="mt-1 w-full rounded border border-gray-300 p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://..."
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
            >
              Add Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Add PropTypes validation
ProjectModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onAddProject: PropTypes.func.isRequired,
};

// Main Signup Component
const Signup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  const handleAddProject = (project) => {
    setProjects([...projects, project]);
  };

  return (
    <div className="flex h-fit w-full flex-col items-center px-5 pb-10 pt-2">
      <h1 className="bg-gradient-to-b from-neutral-200 to-neutral-100 bg-clip-text pb-5 text-center text-7xl font-bold text-transparent">
        Sign up
      </h1>
      <div className="flex h-full w-full flex-col gap-4 rounded-lg bg-opacity-50 pl-10 pr-10 pt-10 shadow-white backdrop-blur-[7.4px]">
        <div className="mb-1 text-3xl">
          <h1>Nice to meet you! Lets get acquainted.</h1>
        </div>

        {/* Email Section */}
        <div className="pt-5 text-2xl">
          <h1>What is your email?</h1>
          <div className="mt-4 text-sm">
            <h2>Email:</h2>
          </div>
          <input
            type="text"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Password Section */}
        <div className="pt-4 text-2xl">
          <h1>What is your password?</h1>
          <div className="mt-4 text-sm">
            <h2>Password:</h2>
          </div>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Name Section */}
        <div className="username pt-4 text-2xl">
          <h1>What is your name?</h1>
          <div className="mt-4 text-sm">
            <h2>First Name:</h2>
          </div>
          <input
            type="text"
            id="firstname"
            name="firstname"
            placeholder="Enter your first name"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg"
          />
          <div className="mt-4 text-sm">
            <h2>Last Name:</h2>
          </div>
          <input
            type="text"
            id="lastname"
            name="lastname"
            placeholder="Enter your last name"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg"
          />
        </div>

        {/* City Section */}
        <div className="pt-7 text-2xl">
          <h1>What is your city?</h1>
          <div className="mt-4 text-sm">
            <h2>City:</h2>
          </div>
          <input
            type="text"
            id="city"
            name="city"
            placeholder="Enter your city"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Github Section */}
        <div className="pt-4 text-2xl">
          <h1>What is your GitHub?</h1>
          <div className="mt-4 text-sm">
            <h2>GitHub:</h2>
          </div>
          <input
            type="text"
            id="github"
            name="github"
            placeholder="Enter your GitHub"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* LinkedIn Section */}
        <div className="pt-4 text-2xl">
          <h1>What is your LinkedIn?</h1>
          <div className="mt-4 text-sm">
            <h2>LinkedIn:</h2>
          </div>
          <input
            type="text"
            id="linkedIn"
            name="linkedIn"
            placeholder="Enter your LinkedIn"
            required
            className="w-[25%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Bio Section */}
        <div className="pt-4 text-2xl">
          <h1>Write your Bio</h1>
          <div className="mt-4 text-sm">
            <h2>Bio:</h2>
          </div>
          <input
            type="text"
            id="bio"
            name="bio"
            placeholder="Enter your bio"
            required
            className="h-25 w-[40%] rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        {/* Projects Section */}
        <div className="pt-4 text-2xl">
          <h1>Add your Projects</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-60 rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Add Projects
          </button>
          <h2 className="mt-4">Added Projects:</h2>
          <ul className="space-y-2">
            {projects.map((project, index) => (
              <li key={index} className="flex items-center space-x-2">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:underline"
                >
                  <span className="font-medium">{project.name}</span>
                </a>
              </li>
            ))}
          </ul>
          <ProjectModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onAddProject={handleAddProject}
          />
        </div>

        <div className="pt-4 text-2xl">
          <h1 className="">What are your skills?</h1>
          <div className="mt-4 text-sm">
            <h2>Skills:</h2>
          </div>
          <div className="">
            <div className="flex flex-wrap gap-4">
              <button
                id="frontend"
                name="frontend"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Frontend
              </button>
              <button
                id="backend"
                name="backend"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Backend
              </button>
              <button
                id="fullstack"
                name="fullstack"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Fullstack
              </button>
              <button
                id="dsa"
                name="dsa"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                DSA
              </button>
              <button
                id="flutter"
                name="flutter"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Flutter
              </button>
              <button
                id="python"
                name="python"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Python
              </button>
              <button
                id="aiml"
                name="aiml"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                AI/ML
              </button>
              <button
                id="html"
                name="html"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                HTML
              </button>
              <button
                id="css"
                name="css"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                CSS
              </button>
              <button
                id="javascript"
                name="javascript"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                JAVASCRIPT
              </button>
              <button
                id="react"
                name="react"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                REACT
              </button>
              <button
                id="c/c++"
                name="c/c++"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                C/C++
              </button>
              <button
                id="java"
                name="java"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                JAVA
              </button>
              <button
                id="angular"
                name="angular"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                ANGULAR
              </button>
              <button
                id="node"
                name="node"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                NODE.JS
              </button>
              <button
                id="ruby on rails"
                name="ruby on rails"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Ruby on Rails
              </button>
              <button
                id="mongodb"
                name="mongodb"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                MONGODB
              </button>
              <button
                id="sql"
                name="sql"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                SQL
              </button>
              <button
                id="postgresql"
                name="posgresql"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                POSTGRESQL
              </button>
              <button
                id="springboot"
                name="springboot"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                SPRINGBOOT
              </button>
              <button
                id="nextjs"
                name="nextjs"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                NEXT.JS
              </button>
              <button
                id="rust"
                name="rust"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                RUST
              </button>
              <button
                id="golang"
                name="golang"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                GOLANG
              </button>
              <button
                id="git"
                name="git"
                className="w-35 flex-wrap-reverse rounded border border-gray-300 bg-transparent p-2 text-lg text-gray-700 placeholder-gray-500 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                GIT
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
