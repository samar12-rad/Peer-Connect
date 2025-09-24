import Card from '../../Components/finderComponents/Card';
import PropTypes from 'prop-types';
import ProjectsSection from './ProjectsSection';
import CardButtons from './CardButtons';

const UserCard = ({ userData, onConnect, onNextUser, onPreviousUser, onNextSet, showNavigation = false, setInfo }) => {
  const {
    firstName,
    lastName,
    city,
    github,
    linkedin,
    email,
    projects,
    bio,
    profilePicture,
    skills = [],
  } = userData || {};

  const handleCardConnect = () => {
    onConnect();
  };

  const handleCardReject = () => {
    onNextUser();
  };

  return (
    <div className="flex h-full w-full items-center justify-between px-[7%] relative">
      {/* Set Info in top right corner */}
      {setInfo && (
        <div className="absolute top-4 right-4 z-10 px-3 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium shadow-lg">
          📦 Set {setInfo.currentSet} of {setInfo.totalSets}
        </div>
      )}
      
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
        profilePicture={profilePicture}
        onNextUser={onNextUser}
      />
      <div className="py-19 flex h-full w-[60%] flex-col items-center">
        {/* Top Content Area */}
        <div className="flex-1 flex flex-col items-center justify-start w-full">
          {/* Recommendation Reason */}
          {userData?.recommendationReason && (
            <div className="mb-4 p-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg text-center max-w-md">
              <div className="text-sm font-medium">
                {userData.recommendationReason}
              </div>
            </div>
          )}
          
          <ProjectsSection bio={bio} projects={projects} />
        </div>
        
        {/* Bottom Button Area - Always at bottom */}
        <div className="flex flex-col items-center gap-4 w-full">
          <CardButtons
            handleCardAccept={handleCardConnect}
            handleCardReject={handleCardReject}
          />
          
          {/* Navigation Controls */}
          {showNavigation && onPreviousUser && (
            <div className="flex items-center gap-4">
              <button
                onClick={onPreviousUser}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg transition-colors"
              >
                ← Previous
              </button>
              
              {/* Show Next button or Next Set button based on position */}
              {setInfo && setInfo.userPosition < setInfo.totalUsersInSet ? (
                <button
                  onClick={onNextUser}
                  className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg transition-colors"
                >
                  Next →
                </button>
              ) : setInfo?.hasMoreSets && onNextSet ? (
                <button
                  onClick={onNextSet}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                >
                  Next Set →
                </button>
              ) : (
                <div className="px-4 py-2 bg-gray-600 text-white rounded-lg text-center">
                  <div className="text-sm">
                    End of all sets
                  </div>
                </div>
              )}
            </div>
          )}
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
    recommendationReason: PropTypes.string,
  }).isRequired,
  onConnect: PropTypes.func.isRequired,
  onNextUser: PropTypes.func.isRequired,
  onPreviousUser: PropTypes.func,
  onNextSet: PropTypes.func,
  showNavigation: PropTypes.bool,
  setInfo: PropTypes.object,
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
