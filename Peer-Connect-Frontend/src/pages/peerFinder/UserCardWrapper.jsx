import UserCard from './UserCard';
import PropTypes from 'prop-types';
import { useState } from 'react';

const dummyData = {
  filteredUsers: [
    {
      userId: 'loading',
      firstName: 'Loading',
      lastName: '...',
      city: 'Somewhere',
      github: '#',
      linkedin: '#',
      email: 'loading@example.com',
      projects: [],
      bio: 'Loading user data...',
      skills: [],
    },
  ],
};

const UserCardWrapper = ({ peerData = dummyData }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);

  const handleNextUser = () => {
    const maxIndex = (peerData?.filteredUsers?.length || 1) - 1;
    setCurrentUserIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const handleConnect = async () => {
    const currentUser = peerData?.filteredUsers[currentUserIndex];
    const userId = currentUser?._id; // Access _id from MongoDB document
    const response = await fetch('http://localhost:3000/api/v1/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ userId, friendRequests: userId }),
    });
    console.log(response);
    handleNextUser();
  };

  const handleReject = () => {
    // Add your reject logic here
    handleNextUser(); // Move to next user after rejecting
  };

  return (
    <div className="px-15 py-22 h-screen w-full">
      <div className="h-full w-full rounded-3xl bg-gradient-to-r from-slate-950 via-green-900 to-slate-950">
        <UserCard
          userData={
            peerData?.filteredUsers[currentUserIndex] ||
            dummyData.filteredUsers[0]
          }
          onreject={handleReject}
          onConnect={handleConnect}
          onNextUser={handleNextUser}
        />
      </div>
    </div>
  );
};

UserCardWrapper.propTypes = {
  peerData: PropTypes.shape({
    filteredUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  }),
};

export default UserCardWrapper;
