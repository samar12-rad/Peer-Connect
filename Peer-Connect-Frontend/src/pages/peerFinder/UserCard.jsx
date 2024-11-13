import Card from '../../Components/finderComponents/Card';
import PropTypes from 'prop-types';
import ProjectsSection from './ProjectsSection';
import { FaCheck, FaTimes } from 'react-icons/fa';

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
        <div className="mt-4 flex h-fit w-full justify-between gap-8 p-4">
          <button
            className="group relative flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)]"
            onClick={() => {
              /* handle accept */
              handleCardConnect();
            }}
          >
            <FaCheck className="transition-transform duration-300 group-hover:rotate-12" />
            Lets Connect
          </button>

          <button
            className="group relative flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-red-400 to-red-600 px-6 py-2 text-white transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(239,68,68,0.5)]"
            onClick={() => {
              /* handle reject */
              handleCardReject();
            }}
          >
            <FaTimes className="transition-transform duration-300 group-hover:rotate-12" />
            Find Me Another Peer
          </button>
        </div>
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
