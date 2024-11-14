// ProjectsSection.jsx
import PropTypes from 'prop-types';

const ProjectsSection = ({ bio, projects }) => {
  return (
    <div className="flex flex-col">
      <p className="text-center text-2xl font-bold italic text-white">
        “{bio}”
      </p>
      <div className="mt-6 w-full">
        <h3 className="text-3xl font-semibold tracking-wider text-white">
          My Projects include:
        </h3>
        <div className="scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 mt-2 flex w-full overflow-x-auto pb-4">
          <div className="flex items-start gap-5">
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
