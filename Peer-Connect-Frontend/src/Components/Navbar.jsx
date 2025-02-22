import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import peer from '../assets/Peerlist.png';
import useGetUserInfo from '../hooks/useGetUserInfo';
// Adjust the import path as needed

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { userInfo } = useGetUserInfo();

  const logout = () => {
    document.cookie =
      'connect.sid=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/landing';
  };

  useEffect(() => {
    if (userInfo) {
      setIsLoggedIn(true);
    }
  }, [userInfo]);

  return (
    <nav className="px-25 z-999999 bg-black-2 fixed flex h-fit min-h-[50px] w-full items-center justify-between gap-5 py-5 text-lg font-bold text-[#17A746]">
      <button
        onClick={() => (window.location.href = '/landing')}
        className="flex items-center"
      >
        <img src={peer} className="h-10" alt="Peer Connect Logo" />
        <p className="text-3xl">Peer Connect</p>
      </button>
      <div className="flex items-center gap-10">
        <Link to="/landing" className="text-2xl">
          Home
        </Link>
        <Link to="/" className="text-2xl">
          Dashboard
        </Link>
        <Link to="/find" className="text-2xl">
          Find Peers
        </Link>
        <Link to="/chat" className="text-2xl">
          Chat
        </Link>
        {!isLoggedIn ? (
          <Link
            to="/login"
            className="hover:text-black-2 rounded-3xl bg-green-600 from-white to-green-300 px-5 py-1 text-2xl font-bold text-white duration-300 hover:bg-gradient-to-r"
          >
            Log In
          </Link>
        ) : (
          <button
            onClick={logout}
            className="hover:text-black-2 rounded-3xl bg-green-600 from-white to-green-300 px-5 py-1 text-2xl font-bold text-white duration-300 hover:bg-gradient-to-r"
          >
            Log Out
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
