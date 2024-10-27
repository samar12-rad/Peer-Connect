import { useState } from 'react';
import PropTypes from 'prop-types';

import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../../Components/Dialog';
import { Dialog } from '../../Components/Dialog';

// Define PropTypes for DialogContent, DialogHeader, DialogTitle, and DialogFooter components
DialogContent.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DialogHeader.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DialogTitle.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

DialogFooter.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

// Project Modal Component
const ProjectModal = ({ isOpen, onClose, onAddProject }) => {
  const [projectName, setProjectName] = useState('');
  const [projectLink, setProjectLink] = useState('');

  const handleSubmit = () => {
    if (projectName && projectLink) {
      onAddProject({ name: projectName, link: projectLink });
      setProjectName('');
      setProjectLink('');
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Add New Project</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="projectName" className="text-sm font-medium">
              Project Name
            </label>
            <input
              id="projectName"
              type="text"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              className="rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter project name"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="projectLink" className="text-sm font-medium">
              Project Link
            </label>
            <input
              id="projectLink"
              type="url"
              value={projectLink}
              onChange={(e) => setProjectLink(e.target.value)}
              className="rounded border border-gray-300 bg-transparent p-2 text-lg placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter project link"
            />
          </div>
        </div>
        <DialogFooter>
          <button type="button" onClick={onClose} className="mr-2">
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={!projectName || !projectLink}
          >
            Add Project
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

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
          <ul>
            {projects.map((project, index) => (
              <li key={index} className="mt-2">
                {project.name} -{' '}
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-indigo-500 hover:underline"
                >
                  {project.link}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddProject={handleAddProject}
      />
    </div>
  );
};

export default Signup;
