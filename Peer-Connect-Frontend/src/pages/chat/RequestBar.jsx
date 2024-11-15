import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Requestbar = ({ peerkey }) => {
  useEffect(() => {
    const getPeerData = async () => {
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
      console.log(data);
    };
    getPeerData();
  });
  return (
    <div className="px-15 flex h-fit w-full flex-col items-center justify-center">
      <div className="h-1 w-[80%] rounded-lg bg-slate-600"></div>
      <div className="mb-5 flex w-full justify-between px-5 py-10">
        <div className="flex w-fit justify-center gap-5">
          <div className="h-10 w-10 rounded-full bg-slate-100"></div>
          <div>
            <h1 className="text-3xl">Ishika Verma</h1>
          </div>
        </div>

        <div className="items-center">
          <button className="h-12 rounded-lg bg-green-500 p-2 text-lg hover:bg-green-600">
            Click to view the peer
          </button>
        </div>
      </div>
    </div>
  );
};
Requestbar.propTypes = {
  peerkey: PropTypes.string.isRequired,
};
export default Requestbar;
