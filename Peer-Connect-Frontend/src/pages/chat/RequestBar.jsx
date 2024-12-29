import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

const RequestBar = ({ peerkey, onViewPeer }) => {
  const [peerData, setPeerData] = useState({});

  useEffect(() => {
    const getPeerData = async () => {
      if (!peerkey) return;

      console.log(peerkey);
      const url = `http://localhost:3000/api/v1/user/peerData/${peerkey}`;
      console.log(url);
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setPeerData(data.data);
    };
    getPeerData();
  }, [peerkey]);

  return (
    <div className="relative">
      <div className="px-15 flex h-fit w-full flex-col items-center justify-center">
        <div className="h-1 w-[80%] rounded-lg bg-slate-600"></div>
        <div className="mb-5 flex w-full justify-between px-5 py-10">
          <div className="flex w-fit justify-center gap-5">
            <div className="h-10 w-10 rounded-full bg-slate-100"></div>
            <div>
              <h1 className="text-3xl">
                {peerData.firstName} {peerData.lastName}
              </h1>
            </div>
          </div>

          <div className="items-center">
            <button
              className="h-12 rounded-lg bg-green-500 p-2 text-lg hover:bg-green-600"
              onClick={() => onViewPeer(peerData)}
            >
              Click to view the peer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

RequestBar.propTypes = {
  peerkey: PropTypes.string.isRequired,
  onViewPeer: PropTypes.func.isRequired,
};

export default RequestBar;
