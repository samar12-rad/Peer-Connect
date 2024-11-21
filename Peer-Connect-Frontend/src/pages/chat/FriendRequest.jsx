import { useEffect, useState } from 'react';

import UserCardModal from '../../Components/unitComponents/UserCardModal';
import Requestbar from './Requestbar';
import useGetUserInfo from '../../hooks/useGetUserInfo';

const FriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState(['']);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserInfo } = useGetUserInfo(); // Use the hook
  useEffect(() => {
    getUserInfo(); // Call the function
  }, []);

  useEffect(() => {
    const getData = async () => {
      const response = await fetch('http://localhost:3000/api/v1/user/data', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setFriendRequests(data.data.friendRequests);
    };
    getData();
  }, []);

  const handleMakeFriend = async (userId) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/v1/user/makeFriend/${userId}`,
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

  return (
    <>
      <div className="shadow-3d-effect relative h-[80vh] w-full flex-col overflow-y-scroll rounded-2xl border border-white/5 px-2 py-10 shadow-white backdrop-blur-[7.4px]">
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
          <p>No friend requests available</p>
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
                /* handle next */
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
