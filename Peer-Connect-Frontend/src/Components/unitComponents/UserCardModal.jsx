// pages/chat/UserCardModal.jsx
import PropTypes from 'prop-types';
import Card from '../finderComponents/Card.jsx';
import ProjectsSection from '../../pages/peerFinder/ProjectsSection.jsx';
import CardButtons from '../../pages/peerFinder/CardButtons.jsx';

const UserCardModal = ({ userData, onClose, onConnect, onNextUser }) => {
  const { bio, projects } = userData;
  const handleCardConnect = () => {
    onConnect();
  };

  const handleCardReject = () => {
    onNextUser();
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex h-[80vh] w-[80vw] items-center justify-between rounded-xl border-2 border-white px-[7%] shadow-xl backdrop-blur-xl">
        <button
          className="absolute right-4 top-9 z-50 text-2xl text-gray-200 transition-colors hover:text-white"
          onClick={onClose}
        ></button>
        <Card
          firstName={userData.firstName}
          lastName={userData.lastName}
          city={userData.city}
          github={userData.github}
          linkedin={userData.linkedin}
          email={userData.email}
          gender={userData.gender}
          skills={userData.skills || []}
        />
        <div className="py-19 flex h-full w-[60%] flex-col items-center gap-0">
          <ProjectsSection bio={bio} projects={projects} />
          <CardButtons
            handleCardAccept={handleCardConnect}
            handleCardReject={handleCardReject}
          />
        </div>
      </div>
    </div>
  );
};

UserCardModal.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    lastName: PropTypes.string.isRequired,
    city: PropTypes.string,
    github: PropTypes.string,
    linkedin: PropTypes.string,
    email: PropTypes.string,
    gender: PropTypes.string,
    skills: PropTypes.array,
    bio: PropTypes.string,
    projects: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  onConnect: PropTypes.func.isRequired,
  onNextUser: PropTypes.func.isRequired,
};

export default UserCardModal;

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
