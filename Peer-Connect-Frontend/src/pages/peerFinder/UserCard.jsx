import Card from '../../Components/finderComponents/Card';
import PropTypes from 'prop-types';
import ProjectsSection from './ProjectsSection';

const UserCard = ({ bio, projects = [] }) => {
  return (
    <div className="flex h-full w-full items-center justify-evenly">
      <Card
        firstName="John"
        lastName="Doe"
        city="New York"
        github="https://github.com/johndoe"
        linkedin="https://linkedin.com/in/johndoe"
        email="john@example.com"
        gender="male"
        skills={[['React'], ['JavaScript']]}
      />
      <ProjectsSection bio={bio} projects={projects} />
    </div>
  );
};

UserCard.propTypes = {
  bio: PropTypes.string.isRequired,
  projects: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ),
};

export default UserCard;

<style>{`
  .scrollbar-thin::-webkit-scrollbar {
    height: 8px;
  }
  .scrollbar-thin::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 4px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  .scrollbar-thin::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  .scrollbar-thin {
    scrollbar-width: thin;
    scroll-behavior: smooth;
  }
`}</style>;
