import UserCard from './UserCard';
import PropTypes from 'prop-types';
import { useState } from 'react';
import axios from 'axios';

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
      skills: ['Loading', 'skills'],
    },
  ],
};

const UserCardWrapper = ({ peerData = dummyData }) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [error, setError] = useState(null);

  const checkFriendStatus = async (userId) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/checkFriend/${userId}`,
        {
          withCredentials: true,
        }
      );
      const data = response.data;
      console.log('Friend status:', data);
      return data;
    } catch (err) {
      console.error('Error checking friend status:', err);
      return { isFriend: false, hasPendingRequest: false };
    }
  };

  const handleNextUser = () => {
    const maxIndex = (peerData?.filteredUsers?.length || 1) - 1;
    setCurrentUserIndex((prevIndex) =>
      prevIndex >= maxIndex ? 0 : prevIndex + 1
    );
  };

  const handleConnect = async () => {
    setError(null);
    try {
      const currentUser = peerData?.filteredUsers[currentUserIndex];
      const userId = currentUser?._id;

      const { isFriend, hasPendingRequest } = await checkFriendStatus(userId);
      console.log('Friend status:', isFriend, hasPendingRequest);
      if (isFriend) {
        setError('This user is already your friend!');
        alert(error);
        return;
      }

      if (hasPendingRequest) {
        setError('Friend request already sent!');
        alert('Friend request already sent!');
        return;
      }

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/update`,
        { userId, friendRequests: 'self' },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
        alert('Friend request sent!');
      } else {
        throw new Error('Failed to send friend request');
      }
    } catch (err) {
      setError(err.message);
    }
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
