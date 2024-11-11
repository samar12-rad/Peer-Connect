// ProjectsSection.jsx
import PropTypes from 'prop-types';
import { FaCheck, FaTimes } from 'react-icons/fa';

const ProjectsSection = ({ bio, projects }) => {
  return (
    <div className="py-19 flex h-full w-[60%] flex-col items-center gap-0">
      <p className="text-center text-2xl font-bold italic text-white">
        “{bio}”
      </p>
      <div className="mt-6 w-full">
        <h3 className="text-3xl font-semibold tracking-wider text-white">
          My Projects include:
        </h3>
        <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mt-2 flex w-full overflow-x-auto pb-4">
          <div className="flex gap-5">
            {projects.map((project, index) => (
              <div key={index} className="flex w-[300px] flex-col items-center">
                <a
                  href={project.link}
                  className="rounded-full bg-black px-2 font-bold text-green-500 hover:underline"
                >
                  {project.name}
                </a>
                {project.description && (
                  <p
                    className="line-clamp-2 text-sm text-gray-600 hover:line-clamp-none"
                    title={project.description}
                  >
                    {project.description}
                  </p>
                )}

                <div className="mt-2 rounded-xl border-2 border-transparent bg-white p-1 shadow hover:border-neutral-200 dark:hover:border-neutral-800">
                  <img
                    src={`https://api.microlink.io/?url=${encodeURIComponent(project.link)}&screenshot=true&meta=false&embed=screenshot.url&colorScheme=dark&viewport.isMobile=true&viewport.deviceScaleFactor=1&viewport.width=900&viewport.height=600`}
                    width={300}
                    height={200}
                    className="rounded-lg"
                    alt={`Preview of ${project.name}`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex h-fit w-full justify-between gap-8 p-4">
        <button
          className="group relative flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
          onClick={() => {
            /* handle accept */
          }}
        >
          <FaCheck className="transition-transform duration-300 group-hover:rotate-12" />
          Lets Connect
        </button>

        <button
          className="group relative flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-400 to-red-600 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
          onClick={() => {
            /* handle reject */
          }}
        >
          <FaTimes className="transition-transform duration-300 group-hover:rotate-12" />
          Find Me Another Peer
        </button>
      </div>
    </div>
  );
};

ProjectsSection.propTypes = {
  bio: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
};

export default ProjectsSection;
