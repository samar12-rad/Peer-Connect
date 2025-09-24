import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import UserCardModal from '../../Components/unitComponents/UserCardModal';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { useNavigate } from 'react-router-dom';
import Requestbar from './RequestBar';
import { buildApiUrl } from '../../utils/environment';

const FriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState(['']);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserInfo } = useGetUserInfo(); // Use the hook
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);

  // Handle nested scroll behavior
  const handleWheel = (e) => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    const isAtTop = scrollTop === 0;
    const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;

    // If scrolling up and at top, or scrolling down and at bottom,
    // let the parent page handle the scroll
    if ((e.deltaY < 0 && isAtTop) || (e.deltaY > 0 && isAtBottom)) {
      // Don't prevent default - let parent scroll
      return;
    }

    // Otherwise, handle scroll within this container
    e.stopPropagation();
  };
  useEffect(() => {
    getUserInfo();

    // Call the function
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch(buildApiUrl('/user/data'), {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        }
      );
      const data = await response.json();
      setFriendRequests(data.data.friendRequests);
    };
    getData();
  }, []);

  const handleMakeFriend = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        buildApiUrl(`/user/makeFriend/${userId}`),
        {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        getUserInfo();
        setShowModal(false);
        alert('You made a friend!');
        // Add delay before reload
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error('Error making friend:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveFriend = async (userId) => {
    try {
      const response = await axios.post(
        buildApiUrl(`/user/removeFriend/${userId}`)
      );
      if (response.status === 200) {
        getUserInfo();
        setShowModal(false);
        alert('Friend request removed!');
        // Add delay before reload
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error('Error removing friend:', error);
    }
  };

  return (
    <>
      <div 
        ref={scrollContainerRef}
        onWheel={handleWheel}
        className="shadow-3d-effect relative w-full flex-col rounded-2xl border border-white/5 px-2 py-10 shadow-white backdrop-blur-[7.4px] max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-green-500"
      >
        <h1 className="px-5 pb-7 text-7xl font-bold text-green-500">
          Friend Requests
        </h1>
        {Array.isArray(friendRequests) && friendRequests.length > 0 ? (
          friendRequests.map((request) => (
            <Requestbar
              key={request}
              peerkey={request}
              request={request}
              onViewPeer={(peerData) => {
                setSelectedPeer(peerData);
                setShowModal(true);
              }}
            />
          ))
        ) : (
          <div className="m-0 ml-2 flex items-center justify-center pl-5 py-8">
            <h1 className="text-3xl text-center">
              No <span className="text-green-400">friend requests</span>{' '}
              available
            </h1>
          </div>
        )}
      </div>

      {showModal && selectedPeer && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-opacity-50">
          <div className="relative h-fit w-fit rounded-lg p-8">
            <button
              className="absolute right-12 top-10 z-[102] text-5xl text-gray-200 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <UserCardModal
              userData={selectedPeer}
              onClose={() => setShowModal(false)}
              onConnect={() => handleMakeFriend(selectedPeer._id)}
              onNextUser={() => {
                handleRemoveFriend(selectedPeer._id);
                // handle next user logic here
              }}
              isLoading={isLoading}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequest;
