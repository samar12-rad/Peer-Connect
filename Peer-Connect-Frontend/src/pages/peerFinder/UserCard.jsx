import Card from '../../Components/finderComponents/Card';
import PropTypes from 'prop-types';
import ProjectsSection from './ProjectsSection';
import CardButtons from './CardButtons';

const UserCard = ({ userData, onConnect, onNextUser }) => {
  const {
    firstName,
    lastName,
    city,
    github,
    linkedin,
    email,
    projects,
    bio,
    skills = [],
  } = userData || {};

  const handleCardConnect = () => {
    onConnect();
  };

  const handleCardReject = () => {
    onNextUser();
  };

  return (
    <div className="flex h-full w-full items-center justify-between px-[7%]">
      <Card
        firstName={firstName}
        lastName={lastName}
        city={city}
        github={github}
        linkedin={linkedin}
        email={email}
        gender="female"
        skills={skills}
        onConnect={onConnect}
        onNextUser={onNextUser}
      />
      <div className="py-19 flex h-full w-[60%] flex-col items-center gap-0">
        <ProjectsSection bio={bio} projects={projects} />
        <CardButtons
          handleCardAccept={handleCardConnect}
          handleCardReject={handleCardReject}
        />
      </div>
    </div>
  );
};

UserCard.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    city: PropTypes.string,
    github: PropTypes.string,
    linkedin: PropTypes.string,
    email: PropTypes.string,
    projects: PropTypes.array,
    bio: PropTypes.string,
    skills: PropTypes.array,
  }).isRequired,
  onConnect: PropTypes.func.isRequired,
  onNextUser: PropTypes.func.isRequired,
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
