import PropTypes from 'prop-types';
import { useState } from 'react';
import { LinkPreview } from './LinkPreview';

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
    <div className="relative inset-0 z-[9999] items-center justify-center overflow-y-auto bg-black bg-opacity-50">
      <div
        className="fixed w-full max-w-md -translate-y-[50%] translate-x-[60%] transform rounded-lg border border-white bg-[#000000] p-6 shadow-xl"
        style={{ maxHeight: '90vh' }}
      >
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
              className="mt-1 w-full rounded border border-gray-300 bg-black p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
              className="mt-1 w-full rounded border border-gray-300 bg-black p-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="https://..."
              required
            />
            {projectLink && (
              <LinkPreview url={projectLink}>
                <button type="button" className="mt-2 text-sm text-blue-500">
                  Preview Link
                </button>
              </LinkPreview>
            )}
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

export default ProjectModal;
