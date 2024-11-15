import { useEffect } from 'react';
import Requestbar from './Requestbar';

const FriendRequest = () => {
  useEffect(() => {
    console.log('Friend Request Page');
    const getData = async () => {
      const response = await fetch('http://localhost:3000/api/v1/user/data', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      console.log(data);
    };
    getData();
  }, []);

  return (
    <div className="shadow-3d-effect h-[80vh] w-full flex-col overflow-y-scroll rounded-2xl border border-white/5 px-2 py-10 shadow-white backdrop-blur-[7.4px]">
      <h1 className="px-5 pb-7 text-7xl font-bold text-green-500">
        Peer Requests
      </h1>
      <Requestbar />
      <Requestbar />
      <Requestbar />
      <Requestbar />
      <Requestbar />
    </div>
  );
};

export default FriendRequest;
