import { useState } from 'react';
import PropTypes from 'prop-types';
import Skill from './Skill';
import ProjectModal from './ProjectModal';
import { LinkPreview } from './LinkPreview';
import { motion } from 'framer-motion';
import axios from 'axios';

const EditSections = {
  BASIC_INFO: 'basicInfo',
  SOCIAL_LINKS: 'socialLinks',
  BIO: 'bio',
  SKILLS: 'skills',
  PROJECTS: 'projects',
};

const skillNames = [
  'Frontend',
  'Backend',
  'Fullstack',
  'DSA',
  'Flutter',
  'Python',
  'AIML',
  'HTML',
  'CSS',
  'JS',
  'React',
  'Java',
  'Angular',
  'Ruby',
  'Mongo',
  'SQL',
  'PostgreSQL',
  'Next',
  'SpringBoot',
  'Rust',
  'Golang',
  'GIT',
  'CPP',
  'Node',
];

const EditModal = ({ isOpen, onClose, userInfo, onUpdate, section }) => {
  const [formData, setFormData] = useState(() => {
    switch (section) {
      case EditSections.BASIC_INFO:
        return {
          firstName: userInfo?.data.firstName || '',
          lastName: userInfo?.data.lastName || '',
          city: userInfo?.data.city || '',
        };
      case EditSections.SOCIAL_LINKS:
        return {
          github: userInfo?.data.github || '',
          linkedin: userInfo?.data.linkedin || '',
        };
      case EditSections.BIO:
        return {
          bio: userInfo?.data.bio || '',
        };
      case EditSections.SKILLS:
        return {
          skills: userInfo?.data.skills || [],
        };
      default:
        return {};
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);

  const handleSkillClick = (e) => {
    e.preventDefault(); // Prevent form submission
    const skillName = e.currentTarget.name;
    const skills = formData.skills || [];

    // Only update local state, no API call
    if (skills.includes(skillName)) {
      setFormData({
        ...formData,
        skills: skills.filter((skill) => skill !== skillName),
      });
    } else {
      setFormData({
        ...formData,
        skills: [...skills, skillName],
      });
    }
  };

  const renderFormFields = () => {
    switch (section) {
      case EditSections.BASIC_INFO:
        return (
          <>
            <div className="mb-4">
              <label className="mb-2 block text-white">First Name</label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="w-full rounded border bg-black p-2 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-white">Last Name</label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="w-full rounded border bg-black p-2 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-white">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) =>
                  setFormData({ ...formData, city: e.target.value })
                }
                className="w-full rounded border bg-black p-2 text-white"
              />
            </div>
          </>
        );
      case EditSections.SOCIAL_LINKS:
        return (
          <>
            <div className="mb-4">
              <label className="mb-2 block text-white">GitHub</label>
              <input
                type="text"
                value={formData.github}
                onChange={(e) =>
                  setFormData({ ...formData, github: e.target.value })
                }
                className="w-full rounded border bg-black p-2 text-white"
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-white">LinkedIn</label>
              <input
                type="text"
                value={formData.linkedin}
                onChange={(e) =>
                  setFormData({ ...formData, linkedin: e.target.value })
                }
                className="w-full rounded border bg-black p-2 text-white"
              />
            </div>
          </>
        );
      case EditSections.BIO:
        return (
          <div className="mb-4">
            <label className="mb-2 block text-white">Bio</label>
            <textarea
              value={formData.bio}
              onChange={(e) =>
                setFormData({ ...formData, bio: e.target.value })
              }
              className="h-40 w-full rounded border bg-black p-2 text-white"
              placeholder="Tell us about yourself..."
            />
          </div>
        );
      case EditSections.SKILLS:
        return (
          <div className="grid grid-cols-3 gap-4">
            {skillNames.map((skillName) => (
              <Skill
                key={skillName}
                name={skillName}
                onClick={handleSkillClick}
                className={`${
                  formData.skills?.includes(skillName)
                    ? 'bg-green-500 text-white'
                    : 'bg-transparent'
                }`}
              />
            ))}
          </div>
        );
      case EditSections.PROJECTS:
        return (
          <div className="relative h-fit rounded-lg pt-4">
            <button
              type="button" // Add type="button" to prevent form submission
              onClick={(e) => {
                e.preventDefault(); // Prevent default behavior
                setIsProjectModalOpen(true);
              }}
              className="mb-3 mt-4 w-60 rounded border border-gray-300 bg-indigo-800 p-2 text-lg text-white hover:bg-indigo-900"
            >
              Add Projects
            </button>

            {formData.projects?.length > 0 ? (
              <h2 className="mt-4 text-sm text-white">Added Projects</h2>
            ) : null}

            <ul className="flex flex-wrap gap-4">
              {formData.projects?.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.1,
                    duration: 0.5,
                  }}
                  className="flex items-center justify-center text-white"
                >
                  <LinkPreview url={project.link} width={300} height={200}>
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative text-white hover:underline"
                    >
                      <div className="min-w-35 relative flex w-fit items-center justify-center overflow-hidden rounded-full text-lg font-medium tracking-widest">
                        <div className="animate-gradient absolute inset-0 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 opacity-75" />
                        <div className="relative z-10 rounded px-4 py-2 tracking-[0.25em] transition-transform duration-300 group-hover:scale-105">
                          {project.name}
                        </div>
                      </div>
                    </a>
                  </LinkPreview>
                </motion.div>
              ))}
            </ul>

            <div className="mt-2 text-sm text-gray-400">
              {formData.projects?.length || 0} / 5 projects added
            </div>

            <ProjectModal
              isOpen={isProjectModalOpen}
              onClose={(e) => {
                e.preventDefault();
                setIsProjectModalOpen(false);
              }}
              onAddProject={(project) => {
                setFormData({
                  ...formData,
                  projects: [...(formData.projects || []), project],
                });
              }}
            />
          </div>
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/update`,
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        onUpdate(formData); // This will trigger getUserInfo() in parent
        onClose();

        // Remove setTimeout and direct reload
        window.location.reload();
      } else {
        alert('Update failed. Please try again.');
        console.error('Update failed:', response.data);
      }
    } catch (error) {
      alert('Error updating profile. Please try again.');
      console.error('Error updating profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-[500px] rounded-lg bg-slate-800 p-8">
        <h2 className="mb-4 text-2xl text-white">
          Edit {section.charAt(0).toUpperCase() + section.slice(1)}
        </h2>
        <form onSubmit={handleSubmit}>
          {renderFormFields()}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600 disabled:bg-gray-400"
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

EditModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  section: PropTypes.oneOf(Object.values(EditSections)).isRequired,
  userInfo: PropTypes.shape({
    data: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string,
      city: PropTypes.string,
      github: PropTypes.string,
      linkedin: PropTypes.string,
      bio: PropTypes.string,
      skills: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
};

EditModal.defaultProps = {
  userInfo: {
    data: {
      firstName: '',
      lastName: '',
      city: '',
      github: '',
      linkedin: '',
      bio: '',
      skills: [],
    },
  },
};

export { EditSections };
export default EditModal;
