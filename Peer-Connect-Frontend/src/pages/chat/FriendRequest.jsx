import { useEffect, useState } from 'react';
import axios from 'axios';

import UserCardModal from '../../Components/unitComponents/UserCardModal';
import useGetUserInfo from '../../hooks/useGetUserInfo';
import { useNavigate } from 'react-router-dom';
import RequestBar from './RequestBar';

const FriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState(['']);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { getUserInfo } = useGetUserInfo(); // Use the hook
  const navigate = useNavigate();

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/data`,
          {
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data = response.data;
        setFriendRequests(data.friendRequests);
      } catch (error) {
        console.error('Error fetching friend requests:', error);
      }
    };
    getData();
  }, []);

  const handleMakeFriend = async (userId) => {
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/makeFriend/${userId}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200) {
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
        `${import.meta.env.VITE_BACKEND_URI}/api/v1/user/removeFriend/${userId}`,
        {},
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        }
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
      <div className="shadow-3d-effect relative h-[80vh] w-full flex-col overflow-y-scroll rounded-2xl border border-white/5 px-2 py-10 shadow-white backdrop-blur-[7.4px]">
        <h1 className="px-5 pb-7 text-7xl font-bold text-green-500">
          Friend Requests
        </h1>
        {Array.isArray(friendRequests) && friendRequests.length > 0 ? (
          friendRequests.map((request) => (
            <RequestBar
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
          <div className="m-0 ml-2 flex h-full items-center justify-center pl-5">
            <h1 className="-mt-30 text-5xl">
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
