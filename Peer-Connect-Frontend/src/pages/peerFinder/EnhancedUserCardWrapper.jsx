import UserCard from './UserCard';
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { buildApiUrl } from '../../utils/environment';

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

const EnhancedUserCardWrapper = ({ 
  peerData = dummyData, 
  selectedSkills = [],
  onLoadNewSet 
}) => {
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [setData, setSetData] = useState(peerData);

  // Reset user index when new set data arrives
  useEffect(() => {
    setCurrentUserIndex(0);
    setSetData(peerData);
  }, [peerData]);

  const checkFriendStatus = async (userId) => {
    try {
      const response = await fetch(
        buildApiUrl(`/user/checkFriend/${userId}`),
        {
          credentials: 'include',
        }
      );
      const data = await response.json();
      return data;
    } catch (err) {
      console.error('Error checking friend status:', err);
      return { isFriend: false, hasPendingRequest: false };
    }
  };

  const loadNewSet = async (setNumber) => {
    if (loading) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(
        buildApiUrl('/user/fetchUsersEnhanced'),
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            skills: selectedSkills,
            setNumber: setNumber,
          }),
          credentials: 'include',
        }
      );

      const data = await response.json();
      
      if (response.ok) {
        if (data.filteredUsers && data.filteredUsers.length > 0) {
          setSetData(data);
          setCurrentSet(setNumber);
          setCurrentUserIndex(0);
          if (onLoadNewSet) {
            onLoadNewSet(data);
          }
        } else {
          setError(data.message || 'No more users in this set');
        }
      } else {
        throw new Error(data.error || 'Failed to load new set');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error loading new set:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleNextUser = () => {
    const maxIndex = (setData?.filteredUsers?.length || 1) - 1;
    if (currentUserIndex >= maxIndex) {
      // If at the end of current set, try to load next set
      const nextSet = currentSet + 1;
      if (setData?.metadata?.hasMoreSets) {
        loadNewSet(nextSet);
      } else {
        // If no more sets, loop back to first user of current set
        setCurrentUserIndex(0);
      }
    } else {
      setCurrentUserIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePreviousUser = () => {
    if (currentUserIndex <= 0) {
      // If at the beginning of current set, go to previous set
      const prevSet = currentSet - 1;
      if (prevSet >= 1) {
        loadNewSet(prevSet);
      } else {
        // If at first set, go to last user of current set
        const maxIndex = (setData?.filteredUsers?.length || 1) - 1;
        setCurrentUserIndex(maxIndex);
      }
    } else {
      setCurrentUserIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleNextSet = () => {
    if (setData?.metadata?.hasMoreSets) {
      loadNewSet(currentSet + 1);
    }
  };

  const handlePreviousSet = () => {
    if (currentSet > 1) {
      loadNewSet(currentSet - 1);
    }
  };

  const handleConnect = async () => {
    setError(null);
    try {
      const currentUser = setData?.filteredUsers[currentUserIndex];
      const userId = currentUser?._id;

      const { isFriend, hasPendingRequest } = await checkFriendStatus(userId);
      
      if (isFriend) {
        setError('This user is already your friend!');
        alert('This user is already your friend!');
        return;
      }

      if (hasPendingRequest) {
        setError('Friend request already sent!');
        alert('Friend request already sent!');
        return;
      }

      const response = await fetch(
        buildApiUrl('/user/update'),
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ userId, friendRequests: 'self' }),
        }
      );

      if (response.ok) {
        alert('Friend request sent!');
        handleNextUser();
      } else {
        throw new Error('Failed to send friend request');
      }
    } catch (err) {
      setError(err.message);
      console.error('Error sending friend request:', err);
    }
  };

  const handleReject = () => {
    handleNextUser();
  };

  const currentUser = setData?.filteredUsers?.[currentUserIndex] || dummyData.filteredUsers[0];
  const totalSets = setData?.totalSets || 1;
  const userPosition = currentUserIndex + 1;
  const totalUsersInSet = setData?.filteredUsers?.length || 1;

  return (
    <div className="px-15 py-22 h-screen w-full relative">
      {/* Loading Indicator */}
      {loading && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 bg-black bg-opacity-75 text-white px-4 py-2 rounded-lg">
          Loading new set...
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-20 left-1/2 transform -translate-x-1/2 z-10 bg-red-600 text-white px-4 py-2 rounded-lg max-w-xs text-center">
          {error}
        </div>
      )}

      {/* Main Content */}
      <div className="h-full w-full rounded-3xl bg-gradient-to-r from-slate-950 via-green-900 to-slate-950">
        <UserCard
          userData={currentUser}
          onreject={handleReject}
          onConnect={handleConnect}
          onNextUser={handleNextUser}
          onPreviousUser={handlePreviousUser}
          onNextSet={() => loadNewSet(currentSet + 1)}
          showNavigation={true}
          setInfo={{
            currentSet,
            totalSets,
            userPosition,
            totalUsersInSet,
            hasMoreSets: setData?.metadata?.hasMoreSets
          }}
        />
      </div>

    </div>
  );
};

EnhancedUserCardWrapper.propTypes = {
  peerData: PropTypes.shape({
    filteredUsers: PropTypes.arrayOf(PropTypes.object),
    setNumber: PropTypes.number,
    totalSets: PropTypes.number,
    metadata: PropTypes.object,
  }),
  selectedSkills: PropTypes.arrayOf(PropTypes.string),
  onLoadNewSet: PropTypes.func,
};

export default EnhancedUserCardWrapper;