import { useEffect, useState } from 'react';
import Requestbar from './RequestBar';
import UserCardModal from '../../Components/unitComponents/UserCardModal';

const FriendRequest = () => {
  const [friendRequests, setFriendRequests] = useState(['']);
  const [showModal, setShowModal] = useState(false);
  const [selectedPeer, setSelectedPeer] = useState(null);

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
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          <div className="fixed inset-0" onClick={() => setShowModal(false)} />
          <div className="relative z-[101] h-fit w-fit overflow-auto rounded-lg">
            <button
              className="absolute right-4 top-4 z-[102] text-5xl text-gray-200 hover:text-white"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <UserCardModal
              userData={selectedPeer}
              onClose={() => setShowModal(false)}
              onConnect={() => {
                /* handle connect */
              }}
              onNextUser={() => {
                /* handle next */
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default FriendRequest;
